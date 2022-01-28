<template>
  <div class="upload-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="30%"
      :before-close="handleClose"
    >
      <div class="upload-wrapper">
        <UploadStart
          v-if="curentStep === steps.startUpload.value"
          @close="handleClose"
        ></UploadStart>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadStart from './upload-start.vue';

const steps = {
  startUpload: {
    title: $t('message.upload_data'),
    value: 'startUpload',
  },
  selectFiels: {
    value: 'selectFiels',
  },
};
export default {
  components: {
    UploadStart,
  },
  setup() {
    return {
      steps,
    };
  },
  data() {
    return {
      dialogTitle: null,
      curentStep: steps.startUpload.value,
      dialogVisible: false,
    };
  },
  watch: {
    curentStep: {
      immediate: true,
      handler(val) {
        this.dialogTitle = this.steps[val].title;
      },
    },
  },
  created() {
    this.$bus.off('open-upload-dialog');
    this.$bus.on('open-upload-dialog', () => {
      this.dialogVisible = true;
    });
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
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
