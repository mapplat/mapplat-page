<template>
  <div>
    {{ router.$user }}
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
