<template>
  <div class="nav-menu">
    <el-menu
      :router="true"
      :uniqueOpened="false"
      :collapse-transition="false"
      :collapse="collapse"
      background-color="#24292e"
      text-color="#ffffff"
      active-text-color="#0B8BF4">
      <el-menu-item index="/desktop/datasets">
        <div class="nav-title-wrapper">
          <k-icon icon="icon-datasets" :size="20"/>
          <span class="nav-title">数据</span>
        </div>
      </el-menu-item>
      <el-menu-item index="/desktop/maps">
        <div class="nav-title-wrapper">
          <k-icon icon="icon-maps" :size="20"/>
          <span class="nav-title">地图</span>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>

export default {
  props: {
    collapse: {
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
