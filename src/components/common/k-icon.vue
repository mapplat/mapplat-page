<template>
  <svg class="icon" aria-hidden="true" :style="svgStyle">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>
<script>
export default {
  props: {
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
    },
  },
  computed: {
    svgStyle() {
      return {
        width: `${this.width || this.size}px`,
        height: `${this.height || this.size}px`,
        color: this.color || null,
        fontSize: `${this.size}px`,
      };
    },
  },
};
</script>
