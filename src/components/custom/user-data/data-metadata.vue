<template>
  <div>
    {{dataInfo}}
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
