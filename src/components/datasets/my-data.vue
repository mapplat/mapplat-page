<template>
  <div class="my-data">
    <div class="component-options-wrapper">
      <div class="component-options-left">
        <el-button :size="$size" type="primary" @click="openUploadDialog">上传</el-button>
      </div>
      <div class="component-options-right">
        <KInput placeholder="搜索" :size="$size" @keyupEnter="reGetDataList" v-model="dataname">
          <template #suffix>
            <k-icon @click="reGetDataList" class="icon-primary" icon="icon--search" :size="20"></k-icon>
          </template>
        </KInput>
      </div>
    </div>
    <div class="component-options-content">
      <UserData :datalist="datalist"></UserData>
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
      datalist: [],
      dataname: '',
      count: 0,
      limit: 10,
      page: 1,
    };
  },
  created() {
    this.$bus.off('update-user-data-list');
    this.$bus.on('update-user-data-list', () => {
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
      };
      const result = await userDataAPI.list(params);
      if (result && result.data && result.data.code === 0) {
        this.datalist = result.data.data.rows;
        this.count = result.data.data.count;
      } else {
        this.$error('注册失败', result);
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
