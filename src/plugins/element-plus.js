import {
  ElButton, ElMessage, ElForm, ElFormItem, ElInput, ElSelect,
} from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/style/common.scss';

export default {
  install(app) {
    app.use(ElButton);
    app.use(ElForm);
    app.use(ElFormItem);
    app.use(ElInput);
    app.use(ElSelect);
    app.config.globalProperties.$message = ElMessage;
  },
};
