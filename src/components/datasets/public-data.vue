<template>
  <div class="my-data">
    <div class="component-options-wrapper">
      <div class="component-options-left" />
      <div class="component-options-right">
        <k-input
          v-model="dataname"
          :placeholder="$t('message.search')"
          @keyup.enter="reGetDataList"
        >
          <template #suffix>
            <k-icon
              class="icon-primary"
              icon="icon--search"
              :size="20"
              @click="reGetDataList"
            />
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
      />
      <div
        v-if="!datalist.length && !loading"
        class="emptydata-wrapper"
      >
        <k-icon
          icon="icon-kong"
          :size="40"
        />
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
      />
    </div>
  </div>
</template>
<script setup>
import { notify } from '@/utils';
import UserData from '@/components/custom/user-data/index.vue';
import { checkRes, userDataAPI } from '@/apis';
import { bus } from '@/utils/bus';
import {
  onActivated, onMounted, provide, ref,
} from 'vue';

const emit = defineEmits(['changeActiveIndex']);
const isPrivate = ref(false);
const datalist = ref([]);
const dataname = ref('');
const count = ref(0);
const limit = ref(60);
const page = ref(1);
const loading = ref(false);
provide('isPrivate', isPrivate.value);

const getDataList = async () => {
  const params = {
    limit: limit.value,
    page: page.value,
    name: dataname.value,
    isPrivate: isPrivate.value,
  };
  loading.value = true;
  const result = await userDataAPI.publicData(params);
  loading.value = false;

  if (checkRes(result)) {
    datalist.value = result.data.data.rows;
    count.value = result.data.data.count;
  } else {
    notify.error($t('message.query_failed'), result);
  }
};

const reGetDataList = async () => {
  page.value = 1;
  getDataList();
};

onActivated(() => {
  emit('changeActiveIndex', 'public-data');
});
onMounted(() => {
  getDataList();
  bus.off('update-public-data-list');
  bus.on('update-public-data-list', () => {
    getDataList();
  });
});
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
