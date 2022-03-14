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
  ElImage,
  ElDatePicker,
  ElConfigProvider,
  makeInstaller,
} from 'element-plus';
import 'element-plus/theme-chalk/src/index.scss';
import '@/assets/style/reset-element.scss';

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

export default {
  install(app) {
    app.use(makeInstaller(components), {
      size: 'default',
    });
  },
};
