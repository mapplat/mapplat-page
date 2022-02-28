<template>
  <div class="color-bar-item">
    <div class="color-bar-item-wrapper">
      <div
        v-for="(color, index) in colors"
        :key="index"
        class="color-bar-item-content"
        :style="{width: `${100/colors.length}%`, 'background-color': color}"
      />
    </div>

    <div class="color-invert">
      --
    </div>
  </div>
</template>

<script>
export default {
  props: ['colors'],
};
</script>
<style lang="scss" scoped>
.color-bar-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .color-bar-item-wrapper{
    width: 180px;
    display: flex;
    .color-bar-item-content {
      height: 8px;
    }
  }
  .color-invert {

  }
}
</style>
