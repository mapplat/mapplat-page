<template>
  <div class="top-nav">
    <div class="left-wrapper">
      <MapplatBreadcrumb></MapplatBreadcrumb>
    </div>
    <div class="right-wrapper align-center">
      <el-badge class="notice-wrapper zy-m-margin" :value="12">
        <k-icon icon="icon-notice" :size="20"></k-icon>
      </el-badge>
      <MapplatUser class="zy-m-margin"></MapplatUser>
      <KI18n></KI18n>
    </div>
  </div>
</template>

<script>
import MapplatUser from '@/components/custom/mapplat-user';
import KI18n from '@/components/common/k-i18n';
import MapplatBreadcrumb from '@/components/custom/mapplat-breadcrumb';

export default {
  components: {
    MapplatUser,
    MapplatBreadcrumb,
    KI18n,
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
