<template>
  <div class="top-bar">
    <MapplatBreadcrumb />
    <div class="align-center y-m-margin">
      <el-badge
        class="hover-pointer zy-m-margin"
        :value="12"
      >
        <k-icon
          icon="icon-notice"
          :size="20"
        />
      </el-badge>
      <MapplatUser class="zy-m-margin" />
      <KI18n />
    </div>
  </div>
</template>

<script setup>
import MapplatUser from '@/components/custom/mapplat-user.vue';
import KI18n from '@/components/common/k-i18n.vue';
import MapplatBreadcrumb from '@/components/custom/mapplat-breadcrumb.vue';
</script>
<style lang="scss">
.top-bar {
  background-color: $white;
  display: flex;
  justify-content: space-between;
}
</style>
