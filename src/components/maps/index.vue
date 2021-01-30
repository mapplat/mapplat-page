<template>
  <div class="component-wrapper">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="tab in TAB_MENT"
        :key="tab.value"
        :index="tab.value"
        :disabled="tab.disabled"
        >{{ tab.title }}</el-menu-item
      >
    </el-menu>
    <div class="component-content">
      <keep-alive>
        <component
          v-bind:is="activeIndex"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import MyMap from './my-map';

const TAB_MENT = [
  {
    value: 'my-map',
    title: '我的地图',
  },
];
export default {
  components: {
    MyMap,
  },
  data() {
    let activeIndex = null;
    if (TAB_MENT.find((tab) => tab.value === this.$route.name)) {
      activeIndex = this.$route.name;
    }
    return {
      activeIndex,
      TAB_MENT,
    };
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
    },
  },
};
</script>
