<template>
  <div class="mapplat-wrapper">
    <el-dropdown
      :hide-timeout="500"
      placement="bottom"
      @command="handleCommand"
    >
      <span class="user-content">
        <!-- <img class="touxiang" src="@/assets/img/moren_touxiang.png" /> -->
        {{ router.$user.username }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="toProfile">
            <div class="justify-flex-start align-center">
              <k-icon
                icon="icon-user"
                :size="20"
                margin="6px 6px"
              />
              {{ $t('message.profile') }}
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="updatePassword">
            <div class="justify-flex-start align-center">
              <k-icon
                icon="icon-xiugaimima"
                :size="20"
                margin="6px 6px"
              />
              {{ $t('message.update_password') }}
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="signout">
            <div class="justify-flex-start align-center">
              <k-icon
                icon="icon-tuichu"
                :size="20"
                margin="6px 6px"
              />
              {{ $t('message.signout') }}
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { signout } from '@/utils/helpers';
import { bus } from '@/utils/bus';
import { useRoute } from 'vue-router';

const router = useRoute();

const updatePassword = () => {
  bus.emit('open-password-dialog');
};
const handleCommand = (command) => {
  switch (command) {
    case 'signout':
      signout();
      break;
    case 'updatePassword':
      updatePassword();
      break;
    case 'toProfile':
      router.push({
        name: 'profile',
      });
      break;
    default:
      break;
  }
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
