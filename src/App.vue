<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { currentLocale } from '@/hooks/useI18n';
</script>
