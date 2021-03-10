<template>
  <div class="nav-menu">
    <el-menu
      :router="true"
      :uniqueOpened="false"
      :collapse-transition="false"
      :collapse="collapse"
      :default-active="activePath"
      background-color="#24292e"
      text-color="#ffffff"
      active-text-color="#0B8BF4">
      <el-menu-item
        v-for="menu in menuConfs"
        :key="menu.path"
        :index="menu.path">
        <div class="nav-title-wrapper">
          <k-icon :icon="menu.icon" :size="20"/>
          <span class="nav-title">{{menu.title}}</span>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>

const menuConfs = [{
  icon: 'icon-datasets',
  title: '数据',
  path: '/datasets',
},
{
  icon: 'icon-maps',
  title: '地图',
  path: '/maps',
}];
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      menuConfs,
    };
  },
  data() {
    return {
      activePath: null,
    };
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(val) {
        const { meta } = val;
        this.activePath = meta.activePath || val.path;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.nav-menu {
  .nav-title-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    .nav-title {
      line-height: 20px;
      padding-left: 12px;
    }
  }

}
</style>
