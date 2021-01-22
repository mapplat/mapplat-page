<template>
  <div class="user-login shadow">
    <div class="user-login-title">
      <k-icon icon="icon-logo" :size="48"></k-icon>
      <span class="title">MapPlat</span>
    </div>
    <div class="user-info-wrapper">
      <KInput
      :isLineBorder="true"
      class="sx-m-padding"
      label="邮箱"
      v-model="email">
      </KInput>
      <KInput
      :isLineBorder="true"
      class="sx-m-padding"
      label="密码"
      v-model="passworld">
      </KInput>

      <div>
        <KInput
        :isLineBorder="true"
        class="sx-m-padding"
        label="验证码"
        v-model="passworld">
        </KInput>
        <el-button type="primary">验证码</el-button>
      </div>
    </div>
    <div class="user-option-wrapper">
      <el-button type="primary">登陆</el-button>
      <el-button type="primary">注册</el-button>
      <el-button type="primary">修改</el-button>
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
      email: null,
      passworld: null,
      repeatPassworld: null,
    };
  },
};
</script>
<style lang="scss">
.user-login {
  padding: 2rem 4rem;
  width: 560px;
  background-color: $white;
  border-radius: 12px;
  .user-login-title {
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 2.5rem;
      font-weight: bold;
      padding: 24px;
    }
  }
  .user-info-wrapper {
    margin: 0 1.5rem;
  }
  .user-option-wrapper {
    margin: 0 1.5rem;

    .el-button {
      width: 100%;
      margin: 0;
      margin: 8px 0;
    }
  }
}
</style>
