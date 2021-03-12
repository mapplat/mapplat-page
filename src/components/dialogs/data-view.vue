<template>
  <el-dialog
    custom-class="data-view-dialog"
    class="data-view"
    :title="dataInfo.name"
    destroy-on-close
    :append-to-body="true"
    v-model="visible"
    width="60%"
    :before-close="handleClose">
    <div class="data-view-content">
      <keep-alive>
        <component class="data-view-wrapper" :dataInfo="dataInfo" :is="component" />
      </keep-alive>
    </div>
    <template #footer>
      <div class="data-view-operate shadow">
        <div @click="component = 'data-metadata'" :class="{'icon-active' : component === 'data-metadata'}" class="icon-wrapper"><k-icon icon="icon-metadata" :size="20"></k-icon></div>
        <div @click="component = 'data-table'" :class="{'icon-active' : component === 'data-table'}" class="icon-wrapper"><k-icon icon="icon-datasets" :size="20"></k-icon></div>
        <div @click="component = 'data-map'" :class="{'icon-active' : component === 'data-map'}" class="icon-wrapper"><k-icon icon="icon-map" :size="20"></k-icon></div>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import DataMap from '@/components/custom/user-data/data-map';
import DataTable from '@/components/custom/user-data/data-table';
import DataMetadata from '@/components/custom/user-data/data-metadata';

const components = {
  'data-map': 'data-map',
  'data-table': 'data-table',
  'data-metadata': 'data-metadata',
};

export default {
  components: {
    DataMap,
    DataTable,
    DataMetadata,
  },
  data() {
    return {
      component: components['data-map'],
      visible: false,
      dataInfo: {},
    };
  },
  created() {
    this.$bus.off('dialog-user-data-view');
    this.$bus.on('dialog-user-data-view', (params = {}) => {
      this.visible = params.visible;
      this.dataInfo = params.dataInfo;
    });
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    preview() {

    },
  },
};
</script>

<style lang="scss">
.data-view-dialog {
  height: 80%;
  .el-dialog__body {
    padding: 0 20px !important;
    height: calc(100% - 118px);
  }
  .data-view-content {
    height: 100%;
    .data-view-wrapper {
      height: 100%;
    }
  }
  .data-view-operate {
    display: inline-block;
    border-radius: 18px;
    border: 1px solid $light-gray;
    .icon-active{
      background-color: $primary;
      color: $white;
    }
    .icon-wrapper {
      padding: 6px 18px;
      border-radius: 18px;
      display: inline-block;
      cursor: pointer;
    }
  }
}

</style>
