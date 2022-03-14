<template>
  <div>
    {{ router.$user }}
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';

const router = useRoute();
</script>
