<template>
  <div class="panel-datasets">
    <div>
      <k-icon
        icon="icon-add"
        :size="20"
      />{{ $t('message.add_dataset') }}
    </div>
    <div>
      <ColorBarPicker />
    </div>
  </div>
</template>
<script setup>
import ColorBarPicker from '@/components/common/k-color/color-bar-picker/index.vue';
</script>
