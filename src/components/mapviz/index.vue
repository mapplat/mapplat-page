<template>
  <div class="mapviz">
    <LeftContent />
    <Dashboard />
  </div>
</template>
<script>
import REG_EXP from '@/constant/REG_EXP';
import LeftContent from '@/components/mapviz/left-content.vue';
import Dashboard from '@/components/mapviz/dashboard.vue';

export default {
  components: {
    LeftContent,
    Dashboard,
  },
  data() {
    return {
      mapid: this.$route.params.mapid,
    };
  },
  created() {
    if (!REG_EXP.uuid.test(this.mapid)) {
      this.$error($t('reg_tip.map_id', [this.mapid]));
      // return;
    }

    // 回去mapconfig
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
