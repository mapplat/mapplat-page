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
          <el-dropdown-item command="accountManage">
            <div class="justify-flex-start align-center">
              <k-icon icon="icon-user" :size="20" margin="0 6px"></k-icon>
              个人中心
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="accountManage">
            <div class="justify-flex-start align-center">
              <k-icon icon="icon-xiugaimima" :size="20" margin="0 6px"></k-icon>
              修改密码
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <div class="justify-flex-start align-center">
              <k-icon icon="icon-tuichu" :size="20" margin="0 6px"></k-icon>
              退出
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from '@/utils/utils';

export default {
  computed: {
    username() {
      return this.$user.username;
    },
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          logout();
          break;
        case 'accountManage':
          this.accountManage();
          break;
        default:
          break;
      }
    },
    accountManage() {
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
