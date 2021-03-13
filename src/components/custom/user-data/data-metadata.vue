<template>
  <div class="data-metadata">
    <div>
      {{dataInfo.dataUuid}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataInfo: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
