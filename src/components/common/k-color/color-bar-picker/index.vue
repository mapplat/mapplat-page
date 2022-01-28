<template>
  <div class="color-bar-picker">
    <Sketch
      v-if="color"
      v-model="color"
    />

    <template
      v-for="(colors, index) in presetColors"
      :key="index"
    >
      <ColorBarItem :colors="colors"></ColorBarItem>
    </template>
  </div>
</template>

<script>
import { Sketch } from '@ckpack/vue-color';
import ColorBarItem from './color-bar-item.vue';

const presetColors = [
  ['#5182e4', '#ce62d6', '#9bcc66', '#8954d4', '#3fb27e', '#5156b8', '#f7cb4a', '#51b4f1', '#f88d48', '#69d4db', '#f35352', '#d42d6b'],
  ['#1a9850', '#91cf60', '#d9ef8b', '#ffffbf', '#fee08b', '#fc8d59', '#d73027'],
  ['#008080', '#70a494', '#b4c8a8', '#f6edbd', '#edbb8a', '#de8a5a', '#ca562c'],
  ['#009392', '#39b185', '#9ccb86', '#e9e29c', '#eeb479', '#e88471', '#cf597e'],

  // 纯色
  ['#f7fbff', '#d6e6f4', '#a8cce7', '#6baed6', '#3a85c0', '#195b9c', '#08306b'],
  ['#edf8fb', '#c6e9ea', '#99d7cd', '#66c2a4', '#3fad76', '#1d904e', '#006d2c'],
  ['#edf8fb', '#c6dbeb', '#a6bbd9', '#8c96c6', '#896bb1', '#863e99', '#810f7c'],
  ['#fef0d9', '#fdd8a4', '#fdb77a', '#fc8d59', '#eb6040', '#d33122', '#b30000'],
  ['#fff5f0', '#fdd4c2', '#fca082', '#fb6a4a', '#e32f27', '#b21218', '#67000d'],
  ['#fafafa', '#d1d1d1', '#a8a8a8', '#808080', '#575757', '#2e2e2e', '#050505'],
  // 黄色开始
  ['#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#005a32'],
  ['#ffffcc', '#c0e6bc', '#81ceb9', '#41b6c4', '#3391bc', '#2a66ac', '#253494'],
  ['#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'],
  ['#ffffd4', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#8c2d04'],

  ['#a6611a', '#cca25c', '#e6d3a5', '#f5f5f5', '#a7dad2', '#56b5a6', '#018571'],
  ['#762a83', '#af8dc3', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#7fbf7b', '#1b7837'],
  ['#c51b7d', '#e9a3c9', '#fde0ef', '#f7f7f7', '#e6f5d0', '#a1d76a', '#4d9221'],

  ['#f3e79b', '#fac484', '#f8a07e', '#eb7f86', '#ce6693', '#a059a0', '#5c53a5'],
  ['#fcde9c', '#faa476', '#f0746e', '#e34f6f', '#dc3977', '#b9257a', '#7c1d6f'],
  ['#ede5cf', '#e0c2a2', '#d39c83', '#c1766f', '#a65461', '#813753', '#541f3f'],

  // 黄色结束
  ['#440154', '#443b83', '#30698d', '#21938c', '#3cba75', '#9ad83c', '#fde725'],
  ['#000004', '#2f0a5b', '#71196e', '#b0315b', '#e45a31', '#fb9d07', '#f2ea69'],
  ['#0d0887', '#5e01a6', '#9d199c', '#cd4a76', '#ef7d51', '#f3d92c', '#f3f027'],
];
export default {
  components: {
    Sketch,
    ColorBarItem,
  },
  setup() {
    return {
      presetColors,
    };
  },
  data() {
    return {
      color: '',
    };
  },
};
</script>
<style lang="scss">

</style>
