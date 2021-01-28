import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElNotification,
  ElMessage,
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
  ElNotification,
  ElMessage,
];

export default {
  install(app) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
