<template>
  <div class="user-data-item hover-shadow">
    <div class="user-data-item-thump" >
      <div class="user-data-top">
        <k-icon class="icon-hover-color" v-if="isPrivate" @click.stop="updatePrivate(!item.private)" :icon="item.private ? 'icon-suo' : 'icon-kaisuo'" :size="20" margin="4px"></k-icon>
        <div v-else></div>
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link" @click.stop>
            <k-icon class="data-actions" icon="icon-gengduo" :size="18" margin="4px"></k-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="openInMap">{{$t('message.create_map')}}</el-dropdown-item>
              <el-dropdown-item @click="copyData">{{$t('message.copy_data')}}</el-dropdown-item>
              <el-dropdown-item @click="download">{{$t('message.download_data')}}</el-dropdown-item>
              <el-dropdown-item class="color-danger" v-if="isPrivate" @click="deleteData">{{$t('message.delete')}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <el-image :lazy="true" fit='contain' :src="item.spatialization ? `${SERVER_HOST}/api/data/thumb/${item.dataUuid}.png` : ''">
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
        <div class="user-data-item-counts text-ellipsis">{{item.counts}} {{$t('message.records')}}</div>
      </div>
      <div class="user-data-item-content user-data-item-time text-ellipsis">{{formatDate(item.updatedAt, 'time')}}</div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/utils/utils';
import { checkRes, userDataAPI } from '@/apis';
import { SERVER_HOST } from '@/assets/env';

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  inject: ['isPrivate'],
  setup() {
    return {
      SERVER_HOST,
    };
  },
  methods: {
    formatDate,
    async updatePrivate(isPrivate) {
      const msg = `${isPrivate ? $t('message.cancel') : ''}${$t('message.share')}`;
      const params = {
        isPrivate,
      };
      const updateRes = await userDataAPI.update(this.item.dataUuid, params);
      if (checkRes(updateRes)) {
        this.$bus.emit('update-user-data-list');
        this.$bus.emit('update-public-data-list');
        this.$success(`${msg}, ${$t('tip.success')}`);
      } else {
        this.$error(`${msg}, ${$t('tip.failed')}`, updateRes);
      }
    },
    async deleteData() {
      this.$confirm($t('message.this_operation_will_delete_the_file_do_you_want_to_continue'), $t('tip.tip'), {
        confirmButtonText: $t('message.confirm'),
        cancelButtonText: $t('message.cancel'),
        type: 'warning',
      }).then(async () => {
        const deleteRes = await userDataAPI.delete(this.item.dataUuid);
        if (checkRes(deleteRes)) {
          this.$bus.emit('update-user-data-list');
          this.$bus.emit('update-public-data-list');
          this.$success($t('tip.deleted_success'));
        } else {
          this.$error($t('tip.deleted_failed'), deleteRes);
        }
      }).catch();
    },
    async copyData() {
      const copyRes = await userDataAPI.copy(this.item.dataUuid);
      if (checkRes(copyRes)) {
        this.$bus.emit('update-user-data-list');
        this.$success($t('message.cancel'));
        this.$router.push({ name: 'my-data' });
      } else {
        this.$error($t('message.copy_success'), copyRes);
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
