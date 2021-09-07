<template>
  <div class="mapplat-wrapper">
    <el-dropdown :hide-timeout="500" placement="bottom" @command="handleCommand">
      <span class="user-content">
        <!-- <img class="touxiang" src="@/assets/img/moren_touxiang.png" /> -->
        {{ username }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item disabled>
            <div class="mapplat-wrapper-username">{{username}}</div>
          </el-dropdown-item>
          <el-dropdown-item command="toProfile">
            <div class="justify-flex-start align-center">
              <k-icon icon="icon-user" :size="20" margin="0 6px"></k-icon>
              {{$t('message.profile')}}
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="updatePassword">
            <div class="justify-flex-start align-center">
              <k-icon icon="icon-xiugaimima" :size="20" margin="0 6px"></k-icon>
              {{$t('message.update_password')}}
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="signout">
            <div class="justify-flex-start align-center">
              <k-icon icon="icon-tuichu" :size="20" margin="0 6px"></k-icon>
              {{$t('message.signout')}}
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { signout } from '@/utils/helpers';

export default {
  computed: {
    username() {
      return this.$user.username;
    },
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'signout':
          signout();
          break;
        case 'updatePassword':
          this.updatePassword();
          break;
        case 'toProfile':
          this.$router.push({
            name: 'profile',
          });
          break;
        default:
          break;
      }
    },
    updatePassword() {
      this.$bus.emit('open-password-dialog');
    },
  },
  components: {},
};
</script>

<style lang="scss">
.mapplat-wrapper {
  margin-right: 24px;
  user-select: none;
  display: flex;
  align-items: center;
  .user-content {
    display: flex;
    align-items: center;
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
    .touxiang {
      height: 30px;
      margin-right: 12px;
    }
  }
}
</style>
