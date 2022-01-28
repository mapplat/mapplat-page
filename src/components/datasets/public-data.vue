<template>
  <div class="my-data">
    <div class="component-options-wrapper">
      <div class="component-options-left">
      </div>
      <div class="component-options-right">
        <k-input
          v-model="dataname"
          :placeholder="$t('message.search')"
          @keyupEnter="reGetDataList"
        >
          <template #suffix>
            <k-icon
              class="icon-primary"
              icon="icon--search"
              :size="20"
              @click="reGetDataList"
            ></k-icon>
          </template>
        </k-input>
      </div>
    </div>
    <div
      v-loading="loading"
      class="component-options-content"
    >
      <UserData
        v-if="datalist.length"
        :datalist="datalist"
      ></UserData>
      <div
        v-else
        class="emptydata-wrapper"
      >
        <k-icon
          icon="icon-kong"
          :size="40"
        ></k-icon>
        <div class="emptydata-msg">
          {{ $t('message.no_data') }}
        </div>
      </div>
      <el-pagination
        v-model:current-page="page"
        background
        :hide-on-single-page="true"
        :page-size="limit"
        layout="prev, pager, next, jumper"
        :total="count"
        @current-change="getDataList"
      >
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
  provide() {
    return {
      isPrivate: this.isPrivate,
    };
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
