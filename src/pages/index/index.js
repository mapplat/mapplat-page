import { createApp } from 'vue';
import router from '@/router';
import elementPlusPlugins from '@/plugins/element-plus';
import componentPlugins from '@/plugins/component';
import '@/assets/style/index.scss';
import App from './Index.vue';

const app = createApp(App);
app.config.productionTip = false;
app.use(router);
app.use(elementPlusPlugins);
app.use(componentPlugins);
app.mount('#app');
