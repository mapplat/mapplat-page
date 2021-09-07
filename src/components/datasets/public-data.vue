<template>
  <div class="my-data">
    <div class="component-options-wrapper">
      <div class="component-options-left">
      </div>
      <div class="component-options-right">
        <k-input :placeholder="$t('message.search')" @keyupEnter="reGetDataList" v-model="dataname">
          <template #suffix>
            <k-icon @click="reGetDataList" class="icon-primary" icon="icon--search" :size="20"></k-icon>
          </template>
        </k-input>
      </div>
    </div>
    <div class="component-options-content" v-loading="loading">
      <UserData v-if="datalist.length" :datalist="datalist"></UserData>
      <div v-else class="emptydata-wrapper">
        <k-icon icon="icon-kong" :size="40"></k-icon>
        <div class="emptydata-msg">
          {{$t('message.no_data')}}
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
  </div>
</template>
<script>
import UserData from '@/components/custom/user-data/index.vue';
import { checkRes, userDataAPI } from '@/apis';

export default {
  components: {
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
  provide() {
    return {
      isPrivate: this.isPrivate,
    };
  },
  created() {
    this.getDataList();
    this.$bus.off('update-public-data-list');
    this.$bus.on('update-public-data-list', () => {
      this.getDataList();
    });
  },
  activated() {
    this.$emit('changeActiveIndex', 'public-data');
  },
  methods: {
    reGetDataList() {
      this.page = 1;
      this.getDataList();
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

      if (checkRes(result)) {
        this.datalist = result.data.data.rows;
        this.count = result.data.data.count;
      } else {
        this.$error($t('message.query_failed'), result);
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
