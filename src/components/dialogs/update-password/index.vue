<template>
  <div class="upload-passworl">
    <el-dialog
      v-model="dialogVisible"
      :title="$t('message.update_password')"
      width="30%"
      :before-close="handleClose"
    >
      <div class="upload-wrapper">
        <k-input
          ref="oldPassword"
          v-model="oldPassword"
          class="sx-m-padding"
          :label="$t('message.old_password')"
          :rule="rules.password"
          show-password
          type="password"
          :is-line-border="true"
        />
        <k-input
          ref="newPassword"
          v-model="newPassword"
          class="sx-m-padding"
          :label="$t('message.new_password')"
          :rule="rules.password"
          show-password
          type="password"
          :is-line-border="true"
        />
        <k-input
          ref="confirmNewPassword"
          v-model="confirmNewPassword"
          class="sx-m-padding"
          :label="$t('message.confirm_new_password')"
          :rule="rules.password"
          show-password
          type="password"
          :is-line-border="true"
          @keyup.enter="updatePassworld"
        />
      </div>
      <template #footer>
        <el-button @click="handleClose">
          {{ $t('message.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="updatePassworld"
        >
          {{ $t('message.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { notify } from '@/utils';
import paramsRules from '@/utils/paramsRules';
import { checkRes, userAPI } from '@/apis';
import { validateRefs } from '@/utils/helpers';
import { bus } from '@/utils/bus';
import { onMounted, ref } from 'vue';

const rules = {
  password: paramsRules.password,
};

const dialogVisible = ref(false);
const confirmNewPassword = ref('');
const oldPassword = ref('');
const newPassword = ref('');

const handleClose = () => {
  oldPassword.value = '';
  newPassword.value = '';
  confirmNewPassword.value = '';
  dialogVisible.value = false;
};

const updatePassworld = async () => {
  if (validateRefs()) {
    notify.error($t('tip.illegal_parameter'));
    return;
  }
  if (newPassword.value !== confirmNewPassword.value) {
    notify.error($t('tip.illegal_confirm_password'));
    return;
  }

  const params = {
    oldPassword: oldPassword.value,
    newPassword: newPassword.value,
  };
  const result = await userAPI.updatePassworld(params);
  if (checkRes(result)) {
    notify.success($t('tip.update_password_success'));
    handleClose();
  } else {
    notify.error($t('tip.update_password_failed'));
  }
};

onMounted(() => {
  bus.off('open-password-dialog');
  bus.on('open-password-dialog', () => {
    dialogVisible.value = true;
  });
});
</script>
<style lang="scss">
</style>
