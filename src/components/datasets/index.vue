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
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" @changeActiveIndex="changeActiveIndex"/>
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
<script>

const TAB_MENT = [
  {
    value: 'my-data',
    title: '我的数据',
  },
  {
    value: 'public-data',
    title: '公共数据',
  },
];
export default {
  data() {
    return {
      activeIndex: this.$route.name,
      TAB_MENT,
    };
  },
  methods: {
    changeActiveIndex(val) {
      this.activeIndex = val;
    },
    handleSelect(key) {
      this.activeIndex = key;
      this.$router.push({ name: key });
    },
  },
};
</script>
