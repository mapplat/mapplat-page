<template>
  <div class="top-nav">
    <div class="left-wrapper">
      <div class="collapse-wrapper align-center" @click="changeIsCollapse">
        <k-icon :icon="isCollapse ? 'icon-yousuojin' : 'icon-zuosuojin'" :size="20"></k-icon>
      </div>
    </div>
    <div class="right-wrapper"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    changeIsCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$bus.emit('update-menu-collapse', this.isCollapse);
    },
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
    float: right;
    height: 100%;
  }
}
</style>
