<template>
  <div class="user-login">

    <div class="user-login-title">
      <span class="title">MapPlat</span>
      <k-icon icon="icon-logo" :size="48"></k-icon>
    </div>
    <div class="user-info-wrapper">
      <KInput label="username" v-model="username"></KInput>
    </div>
  </div>
</template>
<script>
import KInput from '@/components/common/k-input.vue';

export default {
  components: {
    KInput,
  },
  data() {
    return {
      username: null,
      passworld: null,
      repeatPassworld: null,
    };
  },
};
</script>
<style lang="scss">
.user-login {
  .user-login-title {
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 2rem;
      font-weight: bold;
      padding: $m-padding;
    }
  }
}
</style>
