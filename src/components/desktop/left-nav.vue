<template>
  <div class="left-nav">
    <div class="k-logo">
      <k-icon icon="icon-logo" :size="42"></k-icon>
      <span v-show="!isCollapse" class="title">MapPlat</span>
    </div>
    <div class="left-nav-content">
      <LeftMenu :collapse="isCollapse"></LeftMenu>
    </div>
  </div>
</template>

<script>
import LeftMenu from '@/components/custom/left-menu';

export default {
  components: {
    LeftMenu,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  created() {
    this.$bus.off('update-menu-collapse');
    this.$bus.on('update-menu-collapse', (val) => {
      this.isCollapse = val;
    });
  },
};
</script>

<style lang="scss">
.left-nav{
  background-color: $black;
  height: 100%;

  .k-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $top-bar-height;
    padding-left: 24px;
    padding-right: 24px;
    background-color: $black;
    .title {
      font-size: 2rem;
      font-weight: 360;
      padding: 8px;
      color: $white;
    }
  }
  .left-nav-content {
    padding-top: 12px;
  }
}
</style>
