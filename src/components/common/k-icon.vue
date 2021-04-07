<template>
  <svg class="k-icon icon" aria-hidden="true" :style="svgStyle">
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
      default: null,
    },
    margin: {
      type: String,
      default: null,
    },
  },
  computed: {
    svgStyle() {
      return {
        width: `${this.width || this.size}px`,
        height: `${this.height || this.size}px`,
        color: this.color,
        fontSize: `${this.size}px`,
        margin: this.margin,
      };
    },
  },
};
</script>
