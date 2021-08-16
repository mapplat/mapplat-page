<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<script>

export default {
  computed: {
    locale() {
      return this.$ELEMENT_LOCALE[this.defaultLocale];
    },
  },
};
</script>
