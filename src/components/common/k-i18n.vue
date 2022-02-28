<template>
  <div class="gc-i18n">
    <el-dropdown
      placement="bottom"
      :hide-timeout="500"
      @command="handleCommand"
    >
      <span class="gc-i18n-content">
        <k-icon
          icon="icon-language"
          :size="20"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="lang in options"
            :key="lang.value"
            :command="lang.value"
            :class="{ 'active-item': value === lang.value }"
          >
            <div class="justify-flex-start">
              {{ lang.label }}
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    locale: {
      type: String,
    },
  },
  data() {
    return {
      options: [
        {
          value: 'zh',
          label: '简体中文',
        },
        {
          value: 'en',
          label: 'English',
        },
      ],
      value: this.defaultLocale,
    };
  },
  methods: {
    handleCommand(command) {
      if (this.value === command) return;
      this.value = command;
      localStorage.setItem('default_locale', command);
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
.gc-i18n {
  user-select: none;
  display: flex;
  align-items: center;
  .gc-i18n-content {
    display: flex;
    align-items: center;
    color: $primary;
    font-size: 16px;
    &:hover {
      cursor: pointer;
      color: $primary;
    }
  }
  .iconfont {
    margin-right: 6px;
    font-size: 20px !important;
  }
  .active {
    background-color: $primary;
  }
}
.el-dropdown-menu {
  .active-item {
    background-color: #e7f3fe;
    color: #3ca2f6;
  }
}
</style>
