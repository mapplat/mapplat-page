<template>
  <div>
    {{tableList}}
  </div>
</template>

<script>
import userDataAPI from '@/apis/userData';

export default {
  props: {
    dataInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tableList: [],
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      const result = await userDataAPI.tableList(this.dataInfo.dataUuid);
      if (this.checkRes(result)) {
        this.tableList = result.data.data;
      } else {
        this.$error('查询失败', result);
      }
    },
  },
};
</script>
