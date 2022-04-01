<template>
  <div class="user-signin shadow">
    <div class="user-signin-title">
      <k-icon
        icon="icon-logo"
        :size="48"
      />
      <span class="title">{{ TITLE }}</span>
    </div>
    <div
      v-if="type === 'signin'"
      class="user-info-wrapper"
    >
      <v-input
        v-model="email"
        :is-line-border="true"
        class="sx-m-padding"
        :label="$t('message.email')"
        :tips="errors.email"
      />
      <div
        class="forget-password"
        @click="forgetPassword"
      >
        {{ $t('message.forgot_password') }}
      </div>
      <v-input
        v-model="password"
        :is-line-border="true"
        class="sx-m-padding"
        :tips="errors.password"
        :label="$t('message.password')"
        show-password
        type="password"
        @keyup.enter="signin"
      />
    </div>
    <div
      v-if="type === 'signup'"
      class="user-info-wrapper"
    >
      <v-input
        v-model="email"
        :is-line-border="true"
        class="sx-m-padding"
        :label="$t('message.email')"
        :tips="errors.email"
      />
      <v-input
        v-model="verifycode"
        :is-line-border="true"
        class="sx-m-padding"
        :label="$t('message.verification_code')"
        :tips="errors.verifycode"
      >
        <template #suffix>
          <span
            :class="{'verifycode-content-active': isCanVerifycode}"
            class="verifycode-content"
            @click="getVerifycode"
          >{{ verifycodeMsg }}</span>
        </template>
      </v-input>
      <v-input
        v-model="password"
        :is-line-border="true"
        class="sx-m-padding"
        :label="$t('message.password')"
        :tips="errors.password"
        show-password
        type="password"
        @keyup.enter="signup"
      />
    </div>
    <div
      v-if="type === 'password'"
      class="user-info-wrapper"
    >
      <v-input
        v-model="email"
        class="sx-m-padding"
        :is-line-border="true"
        :label="$t('message.email')"
        :tips="errors.email"
      />
      <v-input
        v-model="verifycode"
        :is-line-border="true"
        class="sx-m-padding"
        :label="$t('message.verification_code')"
        :tips="errors.verifycode"
      >
        <template #suffix>
          <span
            :class="{'verifycode-content-active': isCanVerifycode}"
            class="verifycode-content"
            @click="getVerifycode"
          >{{ verifycodeMsg }}</span>
        </template>
      </v-input>
      <v-input
        v-model="password"
        :is-line-border="true"
        class="sx-m-padding"
        :label="$t('message.password')"
        :tips="errors.password"
        show-password
        type="password"
        @keyup.enter="forgetPassworld"
      />
    </div>
    <div
      v-if="type === 'signin'"
      class="user-option-wrapper"
    >
      <el-button
        type="primary"
        @click="signin"
      >
        {{ $t('message.signin') }}
      </el-button>
      <el-button
        plain
        @click="toSignUp"
      >
        {{ $t('message.register') }}
      </el-button>
    </div>
    <div
      v-if="type === 'signup'"
      class="user-option-wrapper"
    >
      <el-button
        type="primary"
        @click="signup"
      >
        {{ $t('message.register') }}
      </el-button>
      <el-button
        plain
        @click="toSignUp"
      >
        {{ $t('message.return_signin') }}
      </el-button>
    </div>
    <div
      v-if="type === 'password'"
      class="user-option-wrapper"
    >
      <el-button
        type="primary"
        @click="forgetPassworld"
      >
        {{ $t('message.update_password') }}
      </el-button>
      <el-button
        plain
        @click="toSignin"
      >
        {{ $t('message.return_signin') }}
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { TITLE } from '@/env';
import { notify } from '@/utils';
import { checkRes, userAPI } from '@/apis';
import paramsRules from '@/utils/paramsRules';
import { ref, watch } from 'vue';
import VInput from '@/components/common/v-input.vue';
import { useForm } from '@/hooks/useValidate';

const signinUsername = localStorage.getItem('signin_username');

const { useField, validate, errors } = useForm({
  email: paramsRules.email,
  password: paramsRules.password,
  verifycode: paramsRules.verifycode,
});
const { value: email } = useField('email', signinUsername);
const { value: password } = useField('password');
const { value: verifycode } = useField('verifycode');

const isCanVerifycode = ref(true);
const verifycodeMsg = ref($t('message.get_verification_code'));
const type = ref('signin');

const toSignUp = () => {
  type.value = 'signup';
};
const toSignin = () => {
  type.value = 'signin';
};
const forgetPassword = () => {
  type.value = 'password';
};
watch(type, () => {
  password.value = undefined;
  verifycode.value = undefined;
  isCanVerifycode.value = true;
});

const signup = async () => {
  const params = {
    email: email.value,
    verifycode: verifycode.value,
    password: password.value,
  };
  if (validate(params)) {
    notify.error($t('tip.illegal_parameter'));
    return;
  }

  const result = await userAPI.signup(params);
  if (checkRes(result)) {
    notify.success($t('tip.register_success'));
    toSignin();
  } else {
    notify.error($t('tip.register_failed'), result);
  }
};

const signin = async () => {
  const params = {
    email: email.value,
    password: password.value,
  };

  if (validate(params)) {
    notify.error($t('tip.illegal_parameter'));
    return;
  }

  const result = await userAPI.signin(params);
  localStorage.setItem('signin_username', email.value);
  if (checkRes(result)) {
    notify.success($t('tip.signin_success'));
    localStorage.setItem('token', result.data.data.token);

    setTimeout(() => {
      window.open('/', '_self');
    }, 300);
  } else {
    notify.error($t('tip.signin_failed'), result);
  }
};

const forgetPassworld = async () => {
  const params = {
    email: email.value,
    verifycode: verifycode.value,
    password: password.value,
  };
  if (validate(params)) {
    notify.error($t('tip.illegal_parameter'));
    return;
  }

  const result = await userAPI.forgetPassworld(params);
  if (checkRes(result)) {
    notify.success($t('tip.update_password_success'));

    toSignin();
  } else {
    notify.error($t('tip.update_password_failed'), result);
  }
};

const getVerifycode = async () => {
  if (!isCanVerifycode.value) return;
  const params = {
    email: email.value,
  };
  if (validate(params)) {
    notify.error($t('tip.illegal_parameter'));
    return;
  }

  const result = await userAPI.getVerifycode(params);
  if (checkRes(result)) {
    notify.success($t('tip.the_verification_code_has_been_sent_to_the_mailbox'));
  } else {
    notify.error($t('tip.verification_code_sent_failed'), result);
    return;
  }
  isCanVerifycode.value = false;
  let times = 60;
  const interval = setInterval(() => {
    if (times <= 0) {
      clearInterval(interval);
      isCanVerifycode.value = true;
      verifycodeMsg.value = $t('message.get_verification_code');
      return;
    }
    times -= 1;
    verifycodeMsg.value = $t('message.resend_in_second', [times]);
  }, 1000);
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
