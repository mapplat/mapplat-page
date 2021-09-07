<template>
  <div class="upload-passworl">
    <el-dialog
      :title="$t('message.update_password')"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="upload-wrapper">
        <k-input
        class="sx-m-padding"
        :label="$t('message.old_password')"
        :rule="rules.password"
        ref="oldPassword"
        type="password"
        :is-line-border="true"
        v-model="oldPassword">
        </k-input>
        <k-input
        class="sx-m-padding"
        :label="$t('message.new_password')"
        :rule="rules.password"
        ref="newPassword"
        type="password"
        :is-line-border="true"
        v-model="newPassword">
        </k-input>
        <k-input
        class="sx-m-padding"
        :label="$t('message.confirm_new_password')"
        :rule="rules.password"
        ref="confirmNewPassword"
        type="password"
        :is-line-border="true"
        @keyupEnter="updatePassworld"
        v-model="confirmNewPassword">
        </k-input>
      </div>
      <template #footer>
        <el-button @click="handleClose">{{$t('message.cancel')}}</el-button>
        <el-button type="primary" @click="updatePassworld">{{$t('message.confirm')}}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import paramsRules from '@/utils/paramsRules';
import { checkRes, userAPI } from '@/apis';
import { validateRefs } from '@/utils/helpers';

const rules = {
  password: paramsRules.password,
};
const steps = {
  startUpload: {
    title: $t('message.upload_data'),
    value: 'startUpload',
  },
  selectFiels: {
    value: 'selectFiels',
  },
};
export default {
  setup() {
    return {
      rules,
      steps,
    };
  },
  data() {
    return {
      dialogVisible: false,
      repeatPassword: '',
      confirmNewPassword: '',
      oldPassword: '',
      newPassword: '',
    };
  },
  created() {
    this.$bus.off('open-password-dialog');
    this.$bus.on('open-password-dialog', () => {
      this.dialogVisible = true;
    });
  },
  methods: {
    handleClose() {
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmNewPassword = '';
      this.dialogVisible = false;
    },
    async updatePassworld() {
      if (validateRefs()) {
        this.$error($t('tip.illegal_parameter'));
        return;
      }
      if (this.newPassword !== this.confirmNewPassword) {
        this.$error($t('tip.illegal_confirm_password'));
        return;
      }

      const params = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      };
      const result = await userAPI.updatePassworld(params);
      if (checkRes(result)) {
        this.$success($t('tip.update_password_success'));
        this.handleClose();
      } else {
        this.$error($t('tip.update_password_failed'));
      }
    },
  },
};
</script>
<style lang="scss">
</style>
