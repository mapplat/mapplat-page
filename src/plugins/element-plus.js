import {
  ElButton,
  ElForm,
  ElFormItem,
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
  ElNotification,
} from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/style/reset-element.scss';
import '@/assets/style/common.scss';

const components = [
  ElButton,
  ElForm,
  ElFormItem,
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
  ElNotification,
];

export default {
  install(app) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
