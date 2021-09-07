<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<script>
import enLocale from 'element-plus/lib/locale/lang/en';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';

const ELEMENT_LOCALE = {
  en: enLocale,
  zh: zhLocale,
};
export default {
  computed: {
    locale() {
      return ELEMENT_LOCALE[this.defaultLocale];
    },
  },
};
</script>
