<template>
  <div class="upload-progress shadow">
    <el-popover
      placement="top"
      :width="540"
      title="上传数据"
      :show-arrow="true"
      popper-class="upload-progress-wrapper"
      trigger="click">
      <div class="upload-progress-content">
        <FileProgress :key="index" v-for="(file, index) in formatFiles"
          :index="index"
          :file="file"
          ></FileProgress>
      </div>
      <template #reference>
        <k-icon id="uploadProgressTriger" icon="icon-shangchuan" :size="24"></k-icon>
      </template>
    </el-popover>
  </div>
</template>
<script>

import Scheduler from '@c_kai/scheduler';
import FileProgress from '@/components/custom/upload-progress/file-progress';
import { getFileHash, fixedNum, getRandomStr } from '@/utils/utils';
import filesAPI from '@/apis/files';
import jobAPI from '@/apis/job';
import FILES from '@/constant/FILES';

const scheduler = new Scheduler(FILES.concurrentCount);
let timeInterval;
export default {
  components: {
    FileProgress,
  },
  mounted() {
    this.$bus.off('push-upload-files');
    this.$bus.on('push-upload-files', (files) => {
      // 处理files
      files.forEach((file) => {
        file.key = getRandomStr(16);
      });
      this.files.push(...files);
      this.formatFiles.push(...files.map((file) => ({
        key: file.key,
        name: file.name,
        size: file.size,
        percentage: 0,
        status: 'progress',
        msg: '开始上传',
      })));
      this.handlerFiles(files);
      this.uploadProgressTriger();
    });
  },
  data() {
    return {
      visible: true,
      files: [],
      formatFiles: [],
      importJobUuids: new Set(),
    };
  },
  methods: {
    uploadProgressTriger() {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      document.querySelector('#uploadProgressTriger').dispatchEvent(e);
    },
    handlerFiles(files) {
      files.forEach((file) => {
        scheduler.add(this.uploadFiles, [file]);
      });
    },
    async uploadFiles(file) {
      const { hash, blocks } = await getFileHash(file);

      const preCreate = await filesAPI.precreate(hash, {
        name: file.name,
        type: file._type,
        size: file.size,
        blocks,
      });
      if (!preCreate || !preCreate.data || preCreate.data.code !== 0) {
        this.updateByKey(file.key, {
          key: file.key,
          name: file.name,
          size: file.size,
          status: 'exception',
          msg: '上传失败',
        });
        return;
      }

      const { id: fileId, existHashs } = preCreate.data.data;
      let filterBlocks = blocks;
      if (Array.isArray(existHashs) && existHashs.length) {
        filterBlocks = blocks.filter((block) => existHashs.indexOf(block.hash) === -1);
      }

      const filterBlocksLength = filterBlocks.length;
      // 上传分片
      for (let index = 0; index < filterBlocksLength; index += 1) {
        const { hash: blockHash, start, end } = filterBlocks[index];
        const blockRes = await filesAPI.block(blockHash, file.slice(start, end));
        if (!blockRes || !blockRes.data || blockRes.data.code !== 0) {
          this.updateByKey(file.key, {
            key: file.key,
            name: file.name,
            size: file.size,
            status: 'exception',
            msg: '上传失败',
          });
          return;
        }
        this.updateByKey(file.key, {
          key: file.key,
          name: file.name,
          size: file.size,
          percentage: fixedNum(index / filterBlocksLength, 3) * 100,
          status: 'progress',
        });
      }

      const mergeRes = await filesAPI.merge(fileId);
      if (!mergeRes || !mergeRes.data || mergeRes.data.code !== 0) {
        this.updateByKey(file.key, {
          key: file.key,
          name: file.name,
          size: file.size,
          status: 'exception',
          msg: '上传失败',
        });
        return;
      }

      this.updateByKey(file.key, {
        key: file.key,
        name: file.name,
        size: file.size,
        status: 'success',
        msg: '开始入库',
      });

      const jobRes = await jobAPI.create({
        type: 'file-import',
        params: {
          fileId: mergeRes.data.data.id,
          key: file.key,
          name: file.name,
          size: file.size,
        },
      });

      if (!jobRes || !jobRes.data || jobRes.data.code !== 0) {
        this.updateByKey(file.key, {
          key: file.key,
          name: file.name,
          size: file.size,
          status: 'exception',
          msg: '入库失败',
        });
      }

      this.importJobUuids.add(jobRes.data.data.jobUuid);

      clearInterval(timeInterval);
      timeInterval = setInterval(() => {
        // 定时更新入库任务进度
        this.updateImportStatus();
      }, 3000);
      this.updateImportStatus();
    },
    updateByKey(key, info) {
      const index = this.formatFiles.findIndex((val) => val.key === key);
      if (index !== -1) {
        this.formatFiles.splice(index, 1, info);
      } else {
        this.formatFiles.push(info);
      }
    },
    async updateImportStatus() {
      if (this.importJobUuids.size === 0) {
        clearInterval(timeInterval);
        return;
      }
      const jobListRes = await jobAPI.list({
        jobUuids: Array.from(this.importJobUuids),
      });
      if (jobListRes && jobListRes.data && jobListRes.data.code === 0) {
        jobListRes.data.data.forEach((jobInfo) => {
          const {
            jobUuid, status, percentage, params,
          } = jobInfo;
          switch (status) {
            case 'create':
            case 'progress':
              this.updateByKey(params.key, {
                key: params.key,
                name: params.name,
                size: params.size,
                status: 'progress',
                percentage,
                msg: '正在入库',
              });
              break;
            case 'success':
              this.updateByKey(params.key, {
                key: params.key,
                name: params.name,
                size: params.size,
                status: 'success',
                msg: '上传成功',
              });
              this.importJobUuids.delete(jobUuid);
              break;
            case 'exception':
            default:
              this.updateByKey(params.key, {
                key: params.key,
                name: params.name,
                size: params.size,
                status: 'exception',
                msg: '上传失败',
              });
              this.importJobUuids.delete(jobUuid);
              break;
          }
        });

        if (this.importJobUuids.size === 0) {
          clearInterval(timeInterval);
        }
      }
    },
  },
};
</script>
<style lang="scss">
.upload-progress {
  background-color: $white;
  position: fixed;
  display: flex;
  bottom: 36px;
  right: 36px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  opacity: .2;
  &:hover {
    opacity: 1;
  }
}
.upload-progress-wrapper {
  .upload-progress-content {
    .file-progress {
      padding: 8px 0;
      border-bottom: 1px solid $light-gray;
    }
  }
}
</style>
