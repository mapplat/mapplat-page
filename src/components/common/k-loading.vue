<template>
  <div class="k-loading" v-if="loading">
    <i class="el-icon-loading"></i>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.k-loading {
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 40px;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
