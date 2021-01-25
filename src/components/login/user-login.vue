<template>
  <div class="user-login shadow">
    <div class="user-login-title">
      <k-icon icon="icon-logo" :size="48"></k-icon>
      <span class="title">MapPlat</span>
    </div>
    <div class="user-info-wrapper" v-if="type === 'signin'">
      <KInput
      :isLineBorder="true"
      class="sx-m-padding"
      label="邮箱"
      ref="email"
      :rule="rules.email"
      v-model="email">
      </KInput>
      <div class="forget-password" @click="type = 'password'">忘记密码?</div>
      <KInput
      :isLineBorder="true"
      class="sx-m-padding"
      :rule="rules.password"
      label="密码"
      ref="password"
      v-model="password">
      </KInput>
    </div>
    <div class="user-info-wrapper" v-if="type === 'signup'">
      <KInput
      :isLineBorder="true"
      class="sx-m-padding"
      label="邮箱"
      ref="email"
      :rule="rules.email"
      v-model="email">
      </KInput>
      <KInput
      :isLineBorder="true"
      class="sx-m-padding"
      label="验证码"
      :rule="rules.verifycode"
      ref="verifycode"
      v-model="verifycode">
      <template #suffix>
        <span @click="getVerifycode" :class="{'verifycode-content-active': isCanVerifycode}" class="verifycode-content">{{verifycodeMsg}}</span>
      </template>
      </KInput>
      <KInput
      :isLineBorder="true"
      class="sx-m-padding"
      label="密码"
      :rule="rules.password"
      ref="password"
      v-model="password">
      </KInput>
    </div>
    <div class="user-info-wrapper" v-if="type === 'password'">
      <KInput
      :isLineBorder="true"
      class="sx-m-padding"
      label="邮箱"
      :rule="rules.email"
      ref="email"
      v-model="email">
      </KInput>
      <KInput
      :isLineBorder="true"
      class="sx-m-padding"
      label="验证码"
      :rule="rules.verifycode"
      ref="verifycode"
      v-model="verifycode">
      <template #suffix>
        <span @click="getVerifycode" :class="{'verifycode-content-active': isCanVerifycode}" class="verifycode-content">{{verifycodeMsg}}</span>
      </template>
      </KInput>
      <KInput
      :isLineBorder="true"
      class="sx-m-padding"
      label="密码"
      :rule="rules.password"
      ref="password"
      v-model="password">
      </KInput>
    </div>
    <div class="user-option-wrapper" v-if="type === 'signin'">
      <el-button type="primary" @click="signin">登录</el-button>
      <el-button plain @click="type = 'signup'">注册账号</el-button>
    </div>
    <div class="user-option-wrapper" v-if="type === 'signup'">
      <el-button type="primary" @click="signup">注册账号</el-button>
      <el-button plain @click="type = 'signin'">返回登录</el-button>
    </div>
    <div class="user-option-wrapper" v-if="type === 'password'">
      <el-button type="primary" @click="updatePassworld">修改密码</el-button>
      <el-button plain @click="type = 'signin'">返回登录</el-button>
    </div>
  </div>
</template>
<script>

import KInput from '@/components/common/k-input.vue';
import userAPI from '@/apis/user';
import paramsRules from '@/utils/paramsRules';

const verifycodeMsgConfig = {
  true: '获取验证码',
  false: '秒后重新发送',
};

const rules = {
  email: paramsRules.email,
  password: paramsRules.password,
  verifycode: paramsRules.verifycode,
};

export default {
  components: {
    KInput,
  },
  setup() {
    return {
      rules,
    };
  },
  data() {
    return {
      email: null,
      password: null,
      verifycode: null,
      isCanVerifycode: true,
      verifycodeMsg: '获取验证码',
      type: 'signin',
    };
  },
  methods: {
    async signup() {
      const params = {
        email: this.email,
        verifycode: this.verifycode,
        password: this.password,
      };
      if (this.$validateRefs()) {
        this.$error('参数不合法');
        return;
      }

      const result = await userAPI.signup(params);
      if (result && result.data && result.data.code === 0) {
        this.$success('注册成功');

        this.toSignin();
      } else {
        this.$error('注册失败', result);
      }
    },
    toSignin() {
      this.type = 'signin';
      this.password = null;
      this.verifycode = null;
    },
    async signin() {
      const params = {
        email: this.email,
        password: this.password,
      };

      const errors = this.$validateRefs();
      if (errors) {
        this.$error('参数不合法');
        return;
      }

      const result = await userAPI.signin(params);
      if (result && result.data && result.data.code === 0) {
        this.$success('登录成功');
      } else {
        this.$error('登录失败', result);
      }
    },
    async updatePassworld() {
      const params = {
        email: this.email,
        verifycode: this.verifycode,
        password: this.password,
      };
      if (this.$validateRefs()) {
        this.$error('参数不合法');
        return;
      }

      const result = await userAPI.updatePassworld(params);
      if (result && result.data && result.data.code === 0) {
        this.$success('修改密码成功');

        this.toSignin();
      } else {
        this.$error('修改密码失败', result);
      }
    },
    async getVerifycode() {
      if (!this.isCanVerifycode) return;
      const params = {
        email: this.email,
      };
      if (this.$validateRefs(['email'])) {
        this.$error('参数不合法');
        return;
      }

      const result = await userAPI.getVerifycode(params);
      if (result && result.data && result.data.code === 0) {
        this.$success('验证码已发送到邮箱');
      } else {
        this.$error('验证码发送到失败', result);
        return;
      }
      this.isCanVerifycode = false;
      let times = 60;
      this.verifycodeMsg = `${times}${verifycodeMsgConfig[this.isCanVerifycode]}`;
      const interval = setInterval(() => {
        if (times <= 0) {
          clearInterval(interval);
          this.isCanVerifycode = true;
          this.verifycodeMsg = verifycodeMsgConfig[this.isCanVerifycode];
          return;
        }
        times -= 1;
        this.verifycodeMsg = `${times}${verifycodeMsgConfig[this.isCanVerifycode]}`;
      }, 1000);
    },

  },
};
</script>
<style lang="scss">
.user-login {
  position: relative;
  padding: 2rem 4rem;
  width: 500px;
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
    margin: 12px 1.5rem;

    .el-button {
      width: 100%;
      margin: 0;
      margin: 8px 0;
    }
  }

  .verifycode-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $light-gray;
    cursor: not-allowed;
  }
  .verifycode-content-active {
    color: $primary;
    cursor: pointer;
  }
  .forget-password {
    position: relative;
    float: right;
    text-align: right;
    top: 16px;
    color: $primary;
    cursor: pointer;
    z-index: 9;
  }
}
</style>
