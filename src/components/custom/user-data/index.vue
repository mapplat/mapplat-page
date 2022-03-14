<template>
  <div class="user-data">
    <DataItem
      v-for="item in datalist"
      :key="item.id"
      :item="item"
      @click="openData(item)"
    />
    <div
      v-for="i in 6"
      :key="i"
      class="data-item-temp"
    />
  </div>
</template>
<script setup>
import DataItem from '@/components/custom/user-data/user-data-item.vue';
import { bus } from '@/utils/bus';
import { inject } from 'vue';

const isPrivate = inject('isPrivate');

defineProps({
  datalist: {
    type: Array,
    default: () => [],
  },
});

const openData = (item) => {
  bus.emit('dialog-user-data-view', {
    isPrivate,
    visible: true,
    dataInfo: item,
  });
};
</script>

<style lang="scss">
.user-data {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: calc(100% - #{$pagination-height});
  overflow-y: auto;
  .user-data-item {
    margin: 24px;
  }
  .data-item-temp {
    width: 250px;
    margin: 24px;
    height: 0 !important;
    flex-grow: 0;
  }
}
</style>
