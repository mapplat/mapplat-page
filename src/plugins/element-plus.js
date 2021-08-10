import {
  ElButton,
  ElInput,
  ElSelect,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElBadge,
  ElDialog,
  ElCollapse,
  ElCollapseItem,
  ElTable,
  ElTableColumn,
  ElPopover,
  ElPagination,
  ElNotification,
  ElImage,
} from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss';
import '@/assets/style/reset-element.scss';
import { logout } from '@/utils/customUtils';

const components = [
  ElButton,
  ElInput,
  ElSelect,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElBadge,
  ElDialog,
  ElCollapse,
  ElCollapseItem,
  ElTable,
  ElTableColumn,
  ElPopover,
  ElPagination,
  ElImage,
  ElNotification,
];

function notify(type, message, options) {
  return ElNotification({
    type,
    message,
    ...options,
  });
}

// form check
async function checkForm(form = 'form') {
  return new Promise((res) => {
    this.$refs[form].validate((valid) => {
      res(valid);
    });
  });
}

function resetForm(form = 'form') {
  this.$nextTick(() => {
    this.$refs[form].resetFields();
  });
}

export default {
  install(app) {
    app.config.globalProperties.$ELEMENT = {
      size: 'small',
    };
    app.config.globalProperties.$notify = ElNotification;
    app.config.globalProperties.$success = (message, options) => notify('success', message, options);
    app.config.globalProperties.$error = (message, result, options) => {
      if (result && result.data) {
        switch (result.data.code) {
          case 102: {
            setTimeout(() => {
              logout();
            }, 1500);
            break;
          }
          case 105: {
            const errorData = result.data.msg;
            if (Array.isArray(errorData)) {
              message = `${errorData.map((val) => val.field)} is not correct`;
            } else {
              message = errorData;
            }
            break;
          }
          default:
            message = result.data.msg || message;
            break;
        }
      }
      notify('error', message, options);
    };
    app.config.globalProperties.$warning = (message, options) => notify('warning', message, options);
    app.config.globalProperties.checkForm = checkForm;
    app.config.globalProperties.resetForm = resetForm;
    components.forEach((component) => {
      app.use(component);
    });
  },
};
