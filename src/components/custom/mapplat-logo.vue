<template>
  <div class="k-logo">
    <k-icon icon="icon-logo" :size="42"></k-icon>
    <span class="title">{{title}}</span>
  </div>
</template>

<script>
const title = 'MAPPLAT';
export default {
  setup() {
    return {
      title,
    };
  },
};
</script>
<style lang="scss">
.k-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: $top-bar-height;
  padding:0 24px;
  background-color: $black;
  .title {
    font-size: 2rem;
    font-weight: 360;
    padding: 8px;
    color: $white;
  }
}
</style>
