<template>
  <div class="my-data">
    <div class="component-options-wrapper">
      <div class="component-options-left">
        <el-button :size="$size" type="primary" @click="openUploadDialog">上传</el-button>
      </div>
      <div class="component-options-right">
        <KInput placeholder="搜索" :size="$size" @keyupEnter="searchData" v-model="search">
          <template #suffix>
            <k-icon class="icon-primary" icon="icon--search" :size="20"></k-icon>
          </template>
        </KInput>
      </div>
    </div>
    <div class="component-options-content">

    </div>
    <!-- dialog -->
    <UploadDialog></UploadDialog>
  </div>
</template>
<script>
import KInput from '@/components/common/k-input';

import UploadDialog from '@/components/dialogs/upload';

export default {
  components: {
    KInput,
    UploadDialog,
  },
  data() {
    return {
      search: null,
    };
  },
  methods: {
    openUploadDialog() {
      this.$bus.emit('open-upload-dialog');
    },
    searchData() {},
  },
};
</script>

<style lang="scss">
.component-options-wrapper {
  display: flex;
  padding: 12px 24px;
  align-items: center;
  justify-content: space-between;
  .component-options-left {

  }
  .component-options-right {

  }
}
</style>
