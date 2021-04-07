import i18n from '@/plugins/i18n';
import { createApp } from 'vue';
import elementPlusPlugins from '@/plugins/element-plus';
import componentPlugins from '@/plugins/component';
import globalProperties from '@/plugins/global-properties';
import '@/assets/style/index.scss';
import App from './login.vue';

const app = createApp(App);
app.config.productionTip = false;
app.use(i18n);
app.use(elementPlusPlugins);
app.use(componentPlugins);
app.use(globalProperties);
app.mount('#app');
