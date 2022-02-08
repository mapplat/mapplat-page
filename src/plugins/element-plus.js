import {
  ElButton,
  ElInput,
  ElSelect,
  ElMenu,
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
  ElDatePicker,
  ElConfigProvider,
  makeInstaller,
} from 'element-plus';
import 'element-plus/theme-chalk/src/index.scss';
import '@/assets/style/reset-element.scss';
import { signout } from '@/utils/helpers';

const components = [
  ElButton,
  ElInput,
  ElSelect,
  ElMenu,
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
  ElDatePicker,
  ElConfigProvider,
];

function notify(type, message, options) {
  return ElNotification({
    type,
    message,
    ...options,
  });
}

export default {
  install(app) {
    app.config.globalProperties.$success = (message, options) => notify('success', message, options);
    app.config.globalProperties.$warning = (message, options) => notify('warning', message, options);
    app.config.globalProperties.$error = (message, result, options) => {
      if (result && result.data) {
        switch (result.data.code) {
          case 102: {
            setTimeout(() => {
              signout();
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
    app.use(makeInstaller(components), {
      size: 'default',
    });
  },
};
