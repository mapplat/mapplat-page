<template>
  <div class="mapplat-breadcrumb no-user-select">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/desktop' }">
        <k-icon icon="icon-home" :size="20"></k-icon>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="breadcrumb in breadcrumbs"
        :to="{ path: breadcrumb.path }"
        :key="breadcrumb.name">
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
    $route: {
      immediate: true,
      handler(to) {
        const { meta } = to;
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
  padding: 12px;
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
