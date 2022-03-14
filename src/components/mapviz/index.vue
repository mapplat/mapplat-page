<template>
  <div class="mapviz">
    <LeftContent />
    <Dashboard />
  </div>
</template>
<script setup>
import LeftContent from '@/components/mapviz/left-content.vue';
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import Dashboard from '@/components/mapviz/dashboard.vue';
import REG_EXP from '@/constant/REG_EXP';
import { notify } from '@/utils';

const route = useRoute();
const mapid = computed(() => route.params.mapid);

onMounted(() => {
  if (!REG_EXP.uuid.test(mapid)) {
    notify.error($t('reg_tip.map_id', [mapid]));
    // return;
  }
});
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
