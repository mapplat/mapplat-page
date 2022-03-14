<template>
  <div class="data-metadata-item">
    <div class="data-metadata-item-title">
      {{ title }}
    </div>
    <div class="data-metadata-item-value">
      {{ value }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
  },
  value: {
    type: [String, Number, Object, Array, Boolean],
  },
});
</script>
<style lang="scss">
.data-metadata-item {
  margin: 12px 0;
  .data-metadata-item-title {
    display: inline-block;
    width: 120px;
    &::after{
      content: ':';
      padding: 0 4px;
    }
  }
  .data-metadata-item-value {
    display: inline-block;
  }
}
</style>
