<template>
  <div class="upload-progress shadow">
    <el-popover
      placement="top"
      title="上传数据"
      :width="200"
      trigger="click">
      <div class="upload-progress-content">
        {{files}}
      </div>
      <template #reference>
        <k-icon id="uploadProgressTriger" icon="icon-shangchuan" :size="24"></k-icon>
      </template>
    </el-popover>
  </div>
</template>
<script>

export default {

  mounted() {
    this.$bus.off('push-upload-files');
    this.$bus.on('push-upload-files', (files) => {
      this.files.push(...files);
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      console.log(this.uploadProgressTriger);
      document.querySelector('#uploadProgressTriger').dispatchEvent(e);
    });
  },
  data() {
    return {
      visible: true,
      files: [],
    };
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
</style>
