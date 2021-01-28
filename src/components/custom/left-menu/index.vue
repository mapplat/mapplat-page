<template>
  <div
    class="nav-menu"
    :style="{ width: isCollapse ? '80px' : 'auto' }">
    <el-menu
      :router="false"
      :uniqueOpened="false"
      :collapse="isCollapse"
      background-color="#24292e"
      text-color="#ffffff"
      active-text-color="#0B8BF4">
      <el-submenu index="1">
        <template #title>
          <div class="nav-title-wrapper">
            <k-icon icon="icon-data" :size="20"></k-icon>
            <span class="nav-title">数据</span>
          </div>
        </template>
        <el-menu-item index="1-1">
          我的数据
        </el-menu-item>
        <el-menu-item index="1-2">
          公共数据
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <div class="nav-title-wrapper">
          <k-icon icon="icon-map_pro" :size="20"/>
          <span class="nav-title">地图</span>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>

export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activePath: null,
    };
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler(val) {
        const { meta } = this.$route;
        this.activePath = meta.activePath || val;
      },
    },
  },
  methods: {
    handleSelect(index) {
      if (this.$route.path === index) return;
      this.$router.push({
        path: index,
      });
    },
    handleClose() {
      this.isLogoCollapse = false;
    },
    handleOpen() {
      this.isLogoCollapse = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.nav-menu {
  // min-width: 200px;
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
