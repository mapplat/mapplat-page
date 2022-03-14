<template>
  <svg
    class="k-icon icon"
    aria-hidden="true"
    :style="svgStyle"
  >
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: String,
  },
  size: {
    type: [Number, String],
    default: 18,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  color: {
    type: String,
    default: null,
  },
  margin: {
    type: String,
    default: null,
  },
});

const svgStyle = computed(() => ({
  width: `${props.width || props.size}px`,
  height: `${props.height || props.size}px`,
  color: props.color,
  fontSize: `${props.size}px`,
  margin: props.margin,
}));
</script>
