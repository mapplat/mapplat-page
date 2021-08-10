<template>
  <div class="login" :style="{ background: `url(${loginBg})` }">
    <KI18n class="login-ki18n"></KI18n>
    <UserLogin/>
  </div>
</template>
<script>
import loginBg from '@/assets/imgs/login-bg.png';
import UserLogin from '@/components/login/user-login.vue';
import KI18n from '@/components/common/k-i18n.vue';

export default {
  components: {
    UserLogin,
    KI18n,
  },
  setup() {
    return {
      loginBg,
    };
  },
};
</script>
<style lang="scss">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-ki18n {
    position: fixed;
    top: 0;
    right: 0;
    padding: 12px;
    background-color: #fff;
  }
}
</style>
