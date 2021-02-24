<template>
  <div class="user-data-item">
    <div class="user-data-item-thump">
    </div>
    <div class="user-data-item-defail">
      <div class="user-data-item-info">
        <div>{{item.name}}</div>
        <div>{{item.counts}}条记录</div>
      </div>
      <div>{{formatDate(item.updatedAt, 'time')}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss">
.user-data-item {
  width: 250px;
  height: 220px;
  .user-data-item-thump {
    height: 150px;
    background-color: $deep-gray;
  }

  .user-data-item-defail {
    background-color: $white;
    .user-data-item-info {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
