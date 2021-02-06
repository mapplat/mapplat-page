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
        <FileProgress :key="index" v-for="(file, index) in files" :file="file" :index="index"></FileProgress>
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
import { getFileHash } from '@/utils/utils';

const scheduler = new Scheduler(3);
export default {
  components: {
    FileProgress,
  },
  mounted() {
    this.$bus.off('push-upload-files');
    this.$bus.on('push-upload-files', (files) => {
      // 处理files
      this.files.push(...files);
      this.handlerFiles(files);
      this.uploadProgressTriger();
    });
  },
  data() {
    return {
      visible: true,
      files: [],
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

      file.hash = hash;
      file.blocks = blocks;
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
