<template>
  <div class="login" :style="{ background: `url(${loginBg})` }">
    <UserLogin/>
  </div>
</template>
<script>
import loginBg from '@/assets/imgs/login-bg.png';
import UserLogin from '@/components/login/user-login.vue';

export default {
  components: {
    UserLogin,
  },
  data() {
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
}
</style>
