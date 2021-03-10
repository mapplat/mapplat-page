<template>
  <div class="my-data">
    <div class="component-options-wrapper">
      <div class="component-options-left">
      </div>
      <div class="component-options-right">
        <KInput placeholder="搜索" :size="$size" @keyupEnter="reGetDataList" v-model="dataname">
          <template #suffix>
            <k-icon @click="reGetDataList" class="icon-primary" icon="icon--search" :size="20"></k-icon>
          </template>
        </KInput>
      </div>
    </div>
    <div class="component-options-content" v-loading="loading">
      <UserData v-if="datalist.length" :datalist="datalist"></UserData>
      <div v-else class="emptydata-wrapper">
        <k-icon icon="icon-kong" :size="40"></k-icon>
        <div class="emptydata-msg">
          无数据
        </div>
      </div>
      <el-pagination
        background
        :hide-on-single-page="true"
        :page-size="limit"
        v-model:current-page="page"
        @current-change="getDataList"
        layout="prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
    <!-- dialog -->
    <UploadDialog></UploadDialog>
  </div>
</template>
<script>
import UploadDialog from '@/components/dialogs/upload';
import UserData from '@/components/custom/user-data';
import userDataAPI from '@/apis/userData';

export default {
  components: {
    UploadDialog,
    UserData,
  },
  data() {
    return {
      isPrivate: false,
      datalist: [],
      dataname: '',
      count: 0,
      limit: 60,
      page: 1,
      loading: false,
    };
  },
  created() {
    this.getDataList();
    this.$bus.off('update-public-data-list');
    this.$bus.on('update-public-data-list', () => {
      this.getDataList();
    });
  },
  methods: {
    reGetDataList() {
      this.page = 1;
      this.getDataList();
    },
    openUploadDialog() {
      this.$bus.emit('open-upload-dialog');
    },
    async getDataList() {
      const params = {
        limit: this.limit,
        page: this.page,
        name: this.dataname,
        isPrivate: this.isPrivate,
      };
      this.loading = true;
      const result = await userDataAPI.publicData(params);
      this.loading = false;

      if (result && result.data && result.data.code === 0) {
        this.datalist = result.data.data.rows;
        this.count = result.data.data.count;
      } else {
        this.$error('获取失败', result);
      }
    },
  },
};
</script>

<style lang="scss">
.my-data {
  height: 100%;
  .component-options-wrapper {
    display: flex;
    padding: 12px 24px;
    align-items: center;
    justify-content: space-between;
  }
  .component-options-content {
    height: calc(100% - 60px);
  }
  .el-pagination {
    height: $pagination-height;
  }
}
</style>
