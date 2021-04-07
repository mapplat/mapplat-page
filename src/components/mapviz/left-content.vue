<template>
  <div class="left-content">
    <div class="left-nav">
      <div class="k-logo">
        <k-icon icon="icon-logo" :size="42"></k-icon>
      </div>
      <div class="left-nav-item-content">
        <div v-for="item in leftOptions" :key="item.key" @click="handler(item)" class="left-nav-item" :class="{'left-nav-item-active': activeItem.key === item.key}">
          <k-icon :icon="item.icon" :size="20"></k-icon>
          <div class="left-nav-item-title">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="left-panel" v-show="activeItem && activeItem.key">
      <div class="left-panel-top">
        <div>{{activeItem.title}}</div>
        <k-icon @click="closePanel" icon="icon-close" :size="12"></k-icon>
      </div>
      <div class="left-panel-wrapper">
        <keep-alive>
          <component :is="`panel-${activeItem.key}`"/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>

import PanelDatasets from '@/components/mapviz/left-panel/panel-datasets';
import PanelSetting from '@/components/mapviz/left-panel/panel-setting';

const leftOptions = [{
  icon: 'icon-datasets',
  title: '数据',
  key: 'datasets',
}, {
  icon: 'icon-maps',
  title: '地图',
  key: 'maps',
}, {
  icon: 'icon-shezhi',
  title: '设置',
  key: 'setting',
}, {
  icon: 'icon-baocun',
  title: '保存',
  key: 'baocun',
}, {
  icon: 'icon-shanchu',
  title: '删除',
  key: 'shanchu',
}];

export default {
  components: {
    PanelDatasets,
    PanelSetting,
  },
  setup() {
    return {
      leftOptions,
    };
  },
  data() {
    return {
      activeItem: leftOptions[0],
    };
  },
  methods: {
    closePanel() {
      this.activeItem = {};
    },
    handler(item) {
      switch (item.key) {
        case 'datasets':
        case 'maps':
        case 'setting':
          this.activeItem = item;
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss">
.left-content {
  display: flex;
  user-select: none;
  .left-nav {
    background-color: $black;
    .k-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: $top-bar-height;
      width: $top-bar-height;
      background-color: $black;
      cursor: pointer;
    }
    .left-nav-item-content {
      margin: 12px 0;
      .left-nav-item {
        cursor: pointer;
        padding: 12px 0;
        text-align: center;
        color: $white;
        &:hover {
          background-color: rgb(29, 33, 37);
        }
        .left-nav-item-title {
          line-height: 24px;
        }
      }
      .left-nav-item-active {
        color: $primary;
      }
    }
  }
  .left-panel {
    width: 280px;
    background-color: $white;
    display: flex;
    flex-direction: column;
    .left-panel-top {
      padding: 12px;
      border-bottom: 1px solid $light-gray;
      display: flex;
      justify-content: space-between;
      align-content: center;
      line-height: 14px;
      .k-icon {
        cursor: pointer;
      }
    }
    .left-panel-wrapper {
      position: relative;
      height: calc(100% - 40px);
      overflow: auto;
    }
  }
}
</style>
