<template>
  <div
    class="signin"
    :style="{ background: `url(${signinBg})` }"
  >
    <KI18n class="signin-ki18n" />
    <UserSign />
  </div>
</template>
<script setup>
import signinBg from '@/assets/imgs/sign-bg.png';
import UserSign from '@/components/sign/user-signin.vue';
import KI18n from '@/components/common/k-i18n.vue';
</script>
<style lang="scss">
.signin {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .signin-ki18n {
    position: fixed;
    top: 0;
    right: 0;
    padding: 12px;
    background-color: #fff;
  }
}
</style>
