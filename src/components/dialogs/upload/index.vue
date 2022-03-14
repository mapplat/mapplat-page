<template>
  <div class="upload-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="$t('message.upload_data')"
      width="30%"
      :before-close="handleClose"
    >
      <div class="upload-wrapper">
        <UploadStart
          @close="handleClose"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { bus } from '@/utils/bus';
import { onMounted, ref } from 'vue';
import UploadStart from './upload-start.vue';

const dialogVisible = ref(false);

const handleClose = () => {
  dialogVisible.value = false;
};

onMounted(() => {
  bus.off('open-upload-dialog');
  bus.on('open-upload-dialog', () => {
    dialogVisible.value = true;
  });
});
</script>
<style lang="scss">
.upload-wrapper {
  position: relative;
  .upload-dialog-options {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}

</style>
