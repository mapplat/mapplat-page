<template>
  <div class="user-data-item hover-shadow">
    <div class="user-data-item-thump" >
      <div class="user-data-top">
        <k-icon v-if="isPrivate" @click.stop="updatePrivate(!item.private)" :icon="item.private ? 'icon-suo' : 'icon-kaisuo'" :size="20" margin="4px"></k-icon>
        <div v-else></div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" @click.stop>
            <k-icon class="data-actions" icon="icon-gengduo" :size="18" margin="4px"></k-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>创建地图</el-dropdown-item>
              <el-dropdown-item>下载数据</el-dropdown-item>
              <el-dropdown-item v-if="isPrivate">删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <el-image :lazy="true" fit='contain' :src="item.spatialization ? `http://mapplat.localhost/api/data/${item.dataUuid}/thumb` : ''">
        <template #placeholder>
          <div class="image-placeholder">
            <k-icon icon="icon-datasets" :size="132"></k-icon>
          </div>
        </template>
        <template #error>
          <div class="image-slot">
            <k-icon icon="icon-datasets" :size="132"></k-icon>
          </div>
        </template>
      </el-image>
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
import userDataAPI from '@/apis/userData';

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  inject: ['isPrivate'],
  methods: {
    async updatePrivate(isPrivate) {
      const params = {
        isPrivate,
      };
      const updateRes = await userDataAPI.update(this.item.dataUuid, params);
      if (this.checkRes(updateRes)) {
        this.$bus.emit('update-user-data-list');
        this.$bus.emit('update-public-data-list');
      } else {
        this.$error('修改失败', updateRes);
      }
    },
  },
};
</script>
<style lang="scss">
.user-data-item {
  width: 250px;
  // height: 220px;
  &:hover {
    .data-actions {
      cursor: pointer;
      color: $primary;
    }
    .el-dropdown {
      background-color: $light-gray;
    }
  }
  .user-data-item-thump {
    border-radius: 4px 4px 0 0;
    height: 150px;
    background-color: $deep-gray;
    color: $light-gray;
    .user-data-top {
      display: flex;
      justify-content: space-between;
      .k-icon {
        z-index: 999;
      }
    }

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
  .el-image {
    width: 100%;
    height: 100%;
    position: relative;
    top: -24px;
    padding: 12px;
    .image-slot,.image-placeholder {
      text-align: center;
      color: $gray;
    }
  }

  .el-dropdown {
    z-index: 999;
    margin: 4px;
  }
}
</style>
