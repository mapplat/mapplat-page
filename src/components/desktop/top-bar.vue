<template>
  <div class="top-nav">
    <div class="left-wrapper">
    </div>
    <div class="right-wrapper align-center">
      <el-badge class="notice-wrapper zy-m-margin" :value="12">
        <k-icon icon="icon-notice" :size="20"></k-icon>
      </el-badge>
      <MapplatUser class="zy-m-margin"></MapplatUser>
    </div>
  </div>
</template>

<script>
import MapplatUser from '@/components/custom/mapplat-user';

export default {
  components: {
    MapplatUser,
  },
  data() {
    return {
      collapse: false,
    };
  },
};
</script>
<style lang="scss">
.top-nav {
  background-color: $white;
  .left-wrapper {
    float: left;
    height: 100%;
    .collapse-wrapper {
      padding-left: 12px;
      height: 100%;
      &:hover {
        cursor: pointer;
        color: $primary;
      }
    }
  }
  .right-wrapper {
    padding-right: 24px;
    float: right;
    height: 100%;

    .notice-wrapper {
      cursor: pointer;
    }
  }
}
</style>
