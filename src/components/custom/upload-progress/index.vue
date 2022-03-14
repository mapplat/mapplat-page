<template>
  <div class="upload-progress shadow">
    <el-popover
      placement="top"
      :width="540"
      :title="$t('message.upload_data')"
      :show-arrow="true"
      popper-class="upload-progress-wrapper"
      trigger="click"
    >
      <div class="upload-progress-content">
        <FileProgress
          v-for="(file, index) in formatFiles"
          :key="index"
          :index="index"
          :file="file"
        />
      </div>
      <template #reference>
        <k-icon
          id="uploadProgressTriger"
          icon="icon-shangchuan"
          :size="24"
        />
      </template>
    </el-popover>
  </div>
</template>
<script setup>
import Scheduler from '@ckpack/scheduler';
import FileProgress from '@/components/custom/upload-progress/file-progress.vue';
import { getFileHash, fixedNum, getRandomStr } from '@/utils/utils';
import { getFilesTypeByName } from '@/utils/helpers';
import { checkRes, filesAPI, jobAPI } from '@/apis';
import FILES from '@/constant/FILES';
import { bus } from '@/utils/bus';
import { onMounted, ref } from 'vue';

const scheduler = new Scheduler(FILES.concurrentCount);
let timeInterval;

const files = ref([]);
const formatFiles = ref([]);
const importJobUuids = ref(new Set());

const uploadProgressTriger = () => {
  const e = document.createEvent('MouseEvents');
  e.initEvent('click', true, true);
  document.querySelector('#uploadProgressTriger').dispatchEvent(e);
};

const updateByKey = (key, info) => {
  const index = formatFiles.value.findIndex((val) => val.key === key);
  if (index !== -1) {
    formatFiles.value.splice(index, 1, info);
  } else {
    formatFiles.value.push(info);
  }
};

const updateImportStatus = async () => {
  if (importJobUuids.value.size === 0) {
    clearInterval(timeInterval);
    return;
  }
  const jobListRes = await jobAPI.list({
    jobUuids: Array.from(importJobUuids.value),
  });
  if (checkRes(jobListRes)) {
    jobListRes.data.data.forEach((jobInfo) => {
      const {
        jobUuid, status, percentage, params,
      } = jobInfo;
      switch (status) {
        case 'create':
        case 'progress':
          updateByKey(params.key, {
            key: params.key,
            name: params.name,
            size: params.size,
            status: 'progress',
            percentage,
            msg: $t('message.start_import'),
          });
          break;
        case 'success':
          updateByKey(params.key, {
            key: params.key,
            name: params.name,
            size: params.size,
            status: 'success',
            msg: $t('message.import_success'),
          });
          importJobUuids.value.delete(jobUuid);
          bus.emit('update-user-data-list');
          break;
        case 'exception':
        default:
          updateByKey(params.key, {
            key: params.key,
            name: params.name,
            size: params.size,
            status: 'exception',
            msg: $t('message.import_failed'),
          });
          importJobUuids.value.delete(jobUuid);
          break;
      }
    });

    if (importJobUuids.value.size === 0) {
      clearInterval(timeInterval);
    }
  }
};

const uploadFiles = async (file) => {
  const { hash, blocks } = await getFileHash(file);

  const preCreate = await filesAPI.precreate(hash, {
    name: file.name,
    type: getFilesTypeByName(file.name),
    size: file.size,
    blocks,
  });
  if (!checkRes(preCreate)) {
    updateByKey(file.key, {
      key: file.key,
      name: file.name,
      size: file.size,
      status: 'exception',
      msg: $t('message.upload_failed'),
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
    if (!checkRes(blockRes)) {
      updateByKey(file.key, {
        key: file.key,
        name: file.name,
        size: file.size,
        status: 'exception',
        msg: $t('message.upload_failed'),
      });
      return;
    }
    updateByKey(file.key, {
      key: file.key,
      name: file.name,
      size: file.size,
      percentage: fixedNum(index / filterBlocksLength, 3) * 100,
      status: 'progress',
    });
  }

  const mergeRes = await filesAPI.merge(fileId);
  if (!checkRes(mergeRes)) {
    updateByKey(file.key, {
      key: file.key,
      name: file.name,
      size: file.size,
      status: 'exception',
      msg: $t('message.upload_failed'),
    });
    return;
  }

  updateByKey(file.key, {
    key: file.key,
    name: file.name,
    size: file.size,
    status: 'success',
    msg: $t('message.start_import'),
  });

  const jobRes = await jobAPI.create({
    type: 'FILE_IMPORT',
    params: {
      fileId: mergeRes.data.data.id,
      key: file.key,
      name: file.name,
      size: file.size,
    },
  });

  if (!checkRes(jobRes)) {
    updateByKey(file.key, {
      key: file.key,
      name: file.name,
      size: file.size,
      status: 'exception',
      msg: $t('message.import_failed'),
    });
  }

  importJobUuids.value.add(jobRes.data.data.jobUuid);

  clearInterval(timeInterval);
  timeInterval = setInterval(() => {
    // 定时更新入库任务进度
    updateImportStatus();
  }, 3000);
  updateImportStatus();
};

const handlerFiles = (filesArr) => {
  filesArr.forEach((file) => {
    scheduler.add(uploadFiles, [file]);
  });
};

onMounted(() => {
  bus.off('push-upload-files');
  bus.on('push-upload-files', (addedFiles) => {
    // 处理files
    addedFiles.forEach((file) => {
      file.key = getRandomStr(16);
    });
    files.value.push(...addedFiles);
    formatFiles.value.push(...addedFiles.map((file) => ({
      key: file.key,
      name: file.name,
      size: file.size,
      percentage: 0,
      status: 'progress',
      msg: $t('message.start_upload'),
    })));
    handlerFiles(addedFiles);
    uploadProgressTriger();
  });
});
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
