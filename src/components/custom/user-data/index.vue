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
<script>
import DataItem from '@/components/custom/user-data/user-data-item.vue';

export default {
  components: {
    DataItem,
  },
  inject: ['isPrivate'],
  props: {
    datalist: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    openData(item) {
      this.$bus.emit('dialog-user-data-view', {
        isPrivate: this.isPrivate,
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
