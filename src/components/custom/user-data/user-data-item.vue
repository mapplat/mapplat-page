<template>
  <div class="user-data-item hover-shadow">
    <div class="user-data-item-thump">
      <k-icon :icon="item.private ? 'icon-suo' : 'icon-kaisuo'" color="#eaecef" :size="16" margin="4px"></k-icon>
    </div>
    <div class="user-data-item-defail">
      <div class="user-data-item-content user-data-item-info">
        <div class="user-data-item-name text-ellipsis">{{item.name}}</div>
        <div class="user-data-item-counts text-ellipsis">{{item.counts}}条记录</div>
      </div>
      <div class="user-data-item-content user-data-item-time text-ellipsis">{{formatDate(item.updatedAt, 'time')}}</div>
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
  // height: 220px;
  .user-data-item-thump {
    border-radius: 4px 4px 0 0;
    height: 150px;
    background-color: $deep-gray;
  }

  .user-data-item-defail {
    border-radius: 0 0 4px 4px;
    background-color: $white;
    .user-data-item-content {
      display: flex;
      justify-content: space-between;
    }
    .user-data-item-info {
      padding: 6px 4px;
      .user-data-item-name {
        flex-shrink: 1;
      }
      .user-data-item-counts {
        flex-shrink: 0;
        margin-left: 12px;
      }
    }
    .user-data-item-time {
      padding: 0 4px 6px 4px;
      color: $gray;
    }
  }
}
</style>
