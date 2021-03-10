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
        <!-- <component :is="activeIndex"></component> -->
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
// import MyData from './my-data';
// import PublicData from './public-data';

const TAB_MENT = [
  {
    value: 'my-data',
    title: '我的数据',
  },
  {
    value: 'public-data',
    title: '公共数据',
    disabled: false,
  },
];
export default {
  // components: {
  //   MyData,
  //   PublicData,
  // },
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
