<template>
  <div class="mapviz">
    <LeftContent/>
    <Dashboard/>
  </div>
</template>
<script>
import LeftContent from './left-content';
import Dashboard from './dashboard';

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
