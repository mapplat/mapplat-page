<template>
  <div class="upload-progress shadow">
    <el-popover
      placement="top-start"
      title="上传数据"
      :width="200"
      v-model:visible="visible"
      trigger="manual">
      <div class="upload-progress-content">
        {{files}}
      </div>
      <template #reference>
        <k-icon icon="icon-shangchuan" :size="24"></k-icon>
      </template>
    </el-popover>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$bus.off('push-upload-files');
    this.$bus.on('push-upload-files', (files) => {
      console.log(files);
      this.files.push(...files);
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
