<template>
  <div class="user-data">
    <DataItem @click="openData(item)" v-for="item in datalist" :key="item.id" :item="item"></DataItem>
    <div class="data-item-temp" v-for="i in 6" :key="i"></div>
  </div>
</template>
<script>
import DataItem from './user-data-item';

export default {
  props: {
    datalist: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    DataItem,
  },
  methods: {
    openData(item) {
      this.$bus.emit('dialog-user-data-view', {
        visible: true,
        dataInfo: item,
      });
    },
  },
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
