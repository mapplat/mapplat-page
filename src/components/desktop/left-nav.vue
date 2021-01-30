<template>
  <div class="left-nav" :class="{'left-nav-collapse': collapse}">
    <div class="k-logo">
      <k-icon icon="icon-logo" :size="42"></k-icon>
      <span v-show="!collapse" class="title">MapPlat</span>
    </div>
    <div class="left-nav-content">
      <LeftMenu :collapse="collapse"></LeftMenu>
    </div>
    <div @click="changeCollapse" class="waitch-collapse">
      <k-icon :icon="collapse ? 'icon-youjiantou' : 'icon-zuojiantou'" :size="28"></k-icon>
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
      collapse: false,
    };
  },
  methods: {
    changeCollapse() {
      this.collapse = !this.collapse;
    },
  },
};
</script>

<style lang="scss">
.left-nav-collapse {
  .k-logo {
    padding: 0 !important;
  }
}
.left-nav{
  position: relative;
  background-color: $black;
  height: 100%;

  .k-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $top-bar-height;
    padding: 0 24px;
    background-color: $black;
    cursor: pointer;
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
  .waitch-collapse {
    position: absolute;
    bottom: 0;
    height: 48px;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 24px;
    color: $white;
    &:hover {
      color: $primary !important;
    }
  }
}
</style>
