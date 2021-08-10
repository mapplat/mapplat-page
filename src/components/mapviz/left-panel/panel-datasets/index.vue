<template>
  <div class="panel-datasets">
    <div><k-icon icon="icon-add" :size="20"></k-icon>{{$t('message.add_dataset')}}</div>
    <div>
      <ColorBarPicker></ColorBarPicker>
    </div>
  </div>
</template>
<script>
import ColorBarPicker from '@/components/common/k-color/color-bar-picker/index.vue';

export default {
  components: {
    ColorBarPicker,
  },
  data() {
    return {
      colors: '#194d33',
    };
  },
};
</script>
