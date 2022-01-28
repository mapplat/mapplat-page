<template>
  <div class="mapplat-breadcrumb no-user-select">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">
        <k-icon
          icon="icon-home"
          :size="20"
        ></k-icon>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb.name"
        :to="{ path: breadcrumb.path }"
      >
        {{ breadcrumb.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{}],
    };
  },
  watch: {
    '$route.meta': {
      immediate: true,
      handler(meta) {
        this.breadcrumbs = meta.breadcrumbs;
      },
    },
  },
  methods: {
    setRoute(path) {
      if (this.$route.path === path) return;
      this.$router.push({
        path,
      });
    },
  },
};
</script>

<style lang="scss" scopen>
.mapplat-breadcrumb {
  display: flex;
  height: 100%;
  padding-left: 12px;
  .icon-home {
    &:hover {
      color: $primary;
    }
  }
  .el-breadcrumb {
    display: flex;
    .el-breadcrumb__item {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

}
</style>
