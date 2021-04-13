<template>
  <div class="mapviz">
    <LeftContent/>
    <Dashboard/>
  </div>
</template>
<script>
import REG_EXP from '@/constant/REG_EXP';
import LeftContent from './left-content';
import Dashboard from './dashboard';

export default {
  components: {
    LeftContent,
    Dashboard,
  },
  created() {
    if (!REG_EXP.uuid.test(this.mapid)) {
      this.$error(_t('reg_tip.map_id', [this.mapid]));
      // return;
    }

    // 回去mapconfig
  },
  data() {
    return {
      mapid: this.$route.params.mapid,
    };
  },
  methods: {
    initVizConfig() {
      console.log(this.mapid);
    },
  },
};
</script>
<style lang="scss">
.mapviz {
  display: flex;
  height: 100%;
  .left-content {
    flex: 0;
  }
  .dashboard {
    flex: 1;
  }
}
</style>
