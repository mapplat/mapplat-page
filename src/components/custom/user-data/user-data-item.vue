<template>
  <div class="user-data-item hover-shadow">
    <div class="user-data-item-thump" >
      <div class="user-data-top">
        <k-icon class="icon-hover-color" v-if="isPrivate" @click.stop="updatePrivate(!item.private)" :icon="item.private ? 'icon-suo' : 'icon-kaisuo'" :size="20" margin="4px"></k-icon>
        <div v-else></div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" @click.stop>
            <k-icon class="data-actions" icon="icon-gengduo" :size="18" margin="4px"></k-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="openInMap">创建地图</el-dropdown-item>
              <el-dropdown-item @click="copyData">复制数据</el-dropdown-item>
              <el-dropdown-item @click="download">下载数据</el-dropdown-item>
              <el-dropdown-item class="color-danger" v-if="isPrivate" @click="deleteData">删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <el-image :lazy="true" fit='contain' :src="item.spatialization ? `http://mapplat.localhost/api/data/thumb/${item.dataUuid}.png` : ''">
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
      const msg = `${isPrivate ? '取消' : ''}分享`;
      const params = {
        isPrivate,
      };
      const updateRes = await userDataAPI.update(this.item.dataUuid, params);
      if (this.checkRes(updateRes)) {
        this.$bus.emit('update-user-data-list');
        this.$bus.emit('update-public-data-list');
        this.$success(`${msg}成功`);
      } else {
        this.$error(`${msg}失败`, updateRes);
      }
    },
    async deleteData() {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const deleteRes = await userDataAPI.delete(this.item.dataUuid);
        if (this.checkRes(deleteRes)) {
          this.$bus.emit('update-user-data-list');
          this.$bus.emit('update-public-data-list');
          this.$success('删除成功');
        } else {
          this.$error('删除失败', deleteRes);
        }
      }).catch();
    },
    async copyData() {
      const copyRes = await userDataAPI.copy(this.item.dataUuid);
      if (this.checkRes(copyRes)) {
        this.$bus.emit('update-user-data-list');
        this.$success('复制成功');
        this.$router.push({ name: 'my-data' });
      } else {
        this.$error('复制成功', copyRes);
      }
    },
    async download() {
      await userDataAPI.download(this.item.dataUuid, 'csv');
    },
    openInMap() {
      this.$info('TODO');
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
