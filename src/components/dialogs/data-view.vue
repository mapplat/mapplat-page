<template>
  <el-dialog
    v-model="visible"
    custom-class="data-view data-view-dialog"
    :title="dataInfo.name"
    destroy-on-close
    :append-to-body="true"
    :close-on-click-modal="false"
    width="60%"
    :before-close="handleClose"
  >
    <div class="data-view-content">
      <keep-alive>
        <component
          :is="component"
          class="data-view-wrapper"
          :data-info="dataInfo"
          :is-private="isPrivate"
        />
      </keep-alive>
    </div>
    <template #footer>
      <div class="data-view-operate shadow">
        <div
          :class="{'icon-active' : component === 'data-metadata'}"
          class="icon-wrapper"
          @click="switchComponent('data-metadata')"
        >
          <k-icon
            icon="icon-metadata"
            :size="20"
          ></k-icon>
        </div>
        <div
          :class="{'icon-active' : component === 'data-table'}"
          class="icon-wrapper"
          @click="switchComponent('data-table')"
        >
          <k-icon
            icon="icon-datasets"
            :size="20"
          ></k-icon>
        </div>
        <div
          v-if="dataInfo.spatialization"
          :class="{'icon-active' : component === 'data-map'}"
          class="icon-wrapper"
          @click="switchComponent('data-map')"
        >
          <k-icon
            icon="icon-map"
            :size="20"
          ></k-icon>
        </div>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import DataMap from '@/components/custom/user-data/data-map.vue';
import DataTable from '@/components/custom/user-data/data-table.vue';
import DataMetadata from '@/components/custom/user-data/data-metadata.vue';

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
      isPrivate: false,
      component: components['data-map'],
      visible: false,
      dataInfo: {},
    };
  },
  mounted() {
    this.$bus.off('dialog-user-data-view');
    this.$bus.on('dialog-user-data-view', (params = {}) => {
      this.visible = params.visible;
      this.dataInfo = params.dataInfo;
      this.isPrivate = params.isPrivate;
      this.component = params.dataInfo.spatialization ? components['data-map'] : components['data-table'];
    });
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    switchComponent(name) {
      this.component = name;
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
