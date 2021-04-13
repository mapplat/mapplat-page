<template>
  <div class="panel-datasets">
    <div><k-icon icon="icon-add" :size="20"></k-icon>{{_t('message.add_dataset')}}</div>
    <div>
      <Slider v-model="colors"></Slider>
    </div>
  </div>
</template>
<script>
import { Slider } from 'vue-color';

export default {
  components: {
    Slider,
  },
  data() {
    return {
      colors: '#194d33',
    };
  },
};
</script>
