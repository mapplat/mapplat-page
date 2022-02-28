<template>
  <div class="desktop">
    <LeftNav class="left-nav-wrapper" />
    <div class="right-content">
      <TopBar class="top-bar-wrapper" />
      <div class="desktop-content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>

    <!-- dialog -->
    <UpdatePassword />
    <UploadProgress />
    <DataView />
  </div>
</template>

<script setup>
import LeftNav from '@/components/desktop/left-nav.vue';
import TopBar from '@/components/desktop/top-bar.vue';
import UploadProgress from '@/components/custom/upload-progress/index.vue';
import DataView from '@/components/dialogs/data-view.vue';
import UpdatePassword from '@/components/dialogs/update-password/index.vue';
</script>
<style lang="scss">
.desktop{
  height: 100%;
  display: flex;
  .left-nav-wrapper {
    height: 100%;
  }
  .right-content {
    height: 100%;
    flex: 1;
    overflow-x: hidden;
    flex-direction: column;

    .top-bar-wrapper {
      height: $top-bar-height;
      background-color: $white;
      border-bottom: 1px solid $light-gray;
    }
    .desktop-content {
      height: calc(100% - #{$top-bar-height});
    }
  }
}
</style>
