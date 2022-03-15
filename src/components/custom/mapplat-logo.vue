<template>
  <div class="k-logo">
    <k-icon
      icon="icon-logo"
      :size="42"
    />
    <span class="title">{{ TITLE }}</span>
  </div>
</template>
<script setup>
import { TITLE } from '@/env';
</script>
<style lang="scss">
.k-logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: $top-bar-height;
  padding:0 24px;
  background-color: $black;
  .title {
    font-size: 2rem;
    font-weight: 360;
    padding: 8px;
    color: $white;
  }
}
</style>
