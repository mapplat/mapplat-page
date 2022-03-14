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
      >
        {{ tab.title }}
      </el-menu-item>
    </el-menu>
    <div class="component-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :is="Component"
            @changeActiveIndex="changeActiveIndex"
          />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const TAB_MENT = [
  {
    value: 'my-map',
    title: $t('message.my_map'),
  },
  {
    value: 'public-map',
    title: $t('message.public_map'),
  },
];

const route = useRoute();
const activeIndex = ref(route.name);

const changeActiveIndex = (val) => {
  activeIndex.value = val;
};

const handleSelect = (key) => {
  activeIndex.value = key;
  route.push({ name: key });
};
</script>
