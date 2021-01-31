<template>
  <div class="desktop">
    <LeftNav class="left-nav-wrapper"></LeftNav>
    <div class="right-content">
      <TopBar class="top-bar-wrapper"></TopBar>
      <div class="desktop-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LeftNav from '@/components/desktop/left-nav';
import TopBar from '@/components/desktop/top-bar';

export default {
  components: {
    LeftNav,
    TopBar,
  },
};
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
