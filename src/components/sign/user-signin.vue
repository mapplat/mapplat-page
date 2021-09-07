<template>
  <div class="user-signin shadow">
    <div class="user-signin-title">
      <k-icon icon="icon-logo" :size="48"></k-icon>
      <span class="title">{{$title}}</span>
    </div>
    <div class="user-info-wrapper" v-if="type === 'signin'">
      <k-input
      :isLineBorder="true"
      class="sx-m-padding"
      :label="$t('message.email')"
      ref="email"
      :rule="rules.email"
      v-model="email">
      </k-input>
      <div class="forget-password" @click="forgetPassword">{{$t('message.forgot_password')}}</div>
      <k-input
      :isLineBorder="true"
      class="sx-m-padding"
      :rule="rules.password"
      :label="$t('message.password')"
      ref="password"
      type="password"
      @keyupEnter="signin"
      v-model="password">
      </k-input>
    </div>
    <div class="user-info-wrapper" v-if="type === 'signup'">
      <k-input
      :isLineBorder="true"
      class="sx-m-padding"
      :label="$t('message.email')"
      ref="email"
      :rule="rules.email"
      v-model="email">
      </k-input>
      <k-input
      :isLineBorder="true"
      class="sx-m-padding"
      :label="$t('message.verification_code')"
      :rule="rules.verifycode"
      ref="verifycode"
      v-model="verifycode">
      <template #suffix>
        <span @click="getVerifycode" :class="{'verifycode-content-active': isCanVerifycode}" class="verifycode-content">{{verifycodeMsg}}</span>
      </template>
      </k-input>
      <k-input
      :isLineBorder="true"
      class="sx-m-padding"
      :label="$t('message.password')"
      :rule="rules.password"
      ref="password"
      type="password"
      @keyupEnter="signup"
      v-model="password">
      </k-input>
    </div>
    <div class="user-info-wrapper" v-if="type === 'password'">
      <k-input
      :isLineBorder="true"
      class="sx-m-padding"
      :label="$t('message.email')"
      :rule="rules.email"
      ref="email"
      v-model="email">
      </k-input>
      <k-input
      :isLineBorder="true"
      class="sx-m-padding"
      :label="$t('message.verification_code')"
      :rule="rules.verifycode"
      ref="verifycode"
      v-model="verifycode">
      <template #suffix>
        <span @click="getVerifycode" :class="{'verifycode-content-active': isCanVerifycode}" class="verifycode-content">{{verifycodeMsg}}</span>
      </template>
      </k-input>
      <k-input
      :isLineBorder="true"
      class="sx-m-padding"
      :label="$t('message.password')"
      :rule="rules.password"
      ref="password"
      type="password"
      @keyupEnter="forgetPassworld"
      v-model="password">
      </k-input>
    </div>
    <div class="user-option-wrapper" v-if="type === 'signin'">
      <el-button type="primary" @click="signin">{{$t('message.signin')}}</el-button>
      <el-button plain @click="type = 'signup'">{{$t('message.register')}}</el-button>
    </div>
    <div class="user-option-wrapper" v-if="type === 'signup'">
      <el-button type="primary" @click="signup">{{$t('message.register')}}</el-button>
      <el-button plain @click="type = 'signin'">{{$t('message.return_signin')}}</el-button>
    </div>
    <div class="user-option-wrapper" v-if="type === 'password'">
      <el-button type="primary" @click="forgetPassworld">{{$t('message.update_password')}}</el-button>
      <el-button plain @click="type = 'signin'">{{$t('message.return_signin')}}</el-button>
    </div>
  </div>
</template>
<script>

import userAPI from '@/apis/user';
import paramsRules from '@/utils/paramsRules';

const rules = {
  email: paramsRules.email,
  password: paramsRules.password,
  verifycode: paramsRules.verifycode,
};

export default {
  setup() {
    const signinUsername = localStorage.getItem('signin_username');
    return {
      signinUsername,
      rules,
    };
  },
  data() {
    return {
      email: this.signinUsername,
      password: null,
      verifycode: null,
      isCanVerifycode: true,
      verifycodeMsg: $t('message.get_verification_code'),
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
        this.$error($t('tip.illegal_parameter'));
        return;
      }

      const result = await userAPI.signup(params);
      if (result && result.data && result.data.code === 0) {
        this.$success($t('tip.register_success'));

        this.toSignin();
      } else {
        this.$error($t('tip.register_failed'), result);
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
        this.$error($t('tip.illegal_parameter'));
        return;
      }

      const result = await userAPI.signin(params);
      localStorage.setItem('signin_username', this.email);
      if (result && result.data && result.data.code === 0) {
        this.$success($t('tip.signin_success'));
        localStorage.setItem('token', result.data.data.token);

        setTimeout(() => {
          window.open('/', '_self');
        }, 300);
      } else {
        this.$error($t('tip.signin_failed'), result);
      }
    },
    forgetPassword() {
      this.type = 'signin';
      this.password = null;
      this.verifycode = null;
      this.type = 'password';
    },
    async forgetPassworld() {
      const params = {
        email: this.email,
        verifycode: this.verifycode,
        password: this.password,
      };
      if (this.$validateRefs()) {
        this.$error($t('tip.illegal_parameter'));
        return;
      }

      const result = await userAPI.forgetPassworld(params);
      if (result && result.data && result.data.code === 0) {
        this.$success($t('tip.update_password_success'));

        this.toSignin();
      } else {
        this.$error($t('tip.update_password_failed'), result);
      }
    },
    async getVerifycode() {
      if (!this.isCanVerifycode) return;
      const params = {
        email: this.email,
      };
      if (this.$validateRefs(['email'])) {
        this.$error($t('tip.illegal_parameter'));
        return;
      }

      const result = await userAPI.getVerifycode(params);
      if (result && result.data && result.data.code === 0) {
        this.$success($t('tip.the_verification_code_has_been_sent_to_the_mailbox'));
      } else {
        this.$error($t('tip.verification_code_sent_failed'), result);
        return;
      }
      this.isCanVerifycode = false;
      let times = 60;
      const interval = setInterval(() => {
        if (times <= 0) {
          clearInterval(interval);
          this.isCanVerifycode = true;
          this.verifycodeMsg = $t('message.get_verification_code');
          return;
        }
        times -= 1;
        this.verifycodeMsg = $t('message.resend_in_second', [times]);
      }, 1000);
    },

  },
};
</script>
<style lang="scss">
.user-signin {
  position: relative;
  padding: 2rem 4rem;
  width: 500px;
  background-color: $white;
  border-radius: 12px;
  .user-signin-title {
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
