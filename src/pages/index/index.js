import { createApp } from 'vue';
import router from '@/router';
import elementPlusPlugins from '@/plugins/element-plus';
import componentPlugins from '@/plugins/component';
import directivesPlugins from '@/plugins/directives';
import globalProperties from '@/plugins/global-properties';
import userAPI from '@/apis/user';
import { logout } from '@/utils/utils';
import 'ol/ol.css';
import '@/assets/style/index.scss';
import App from './index.vue';

(async () => {
  const app = createApp(App);

  const result = await userAPI.info();
  if (result && result.data && result.data.code === 0) {
    app.config.globalProperties.$user = result.data.data;
    router.$user = result.data.data;
  } else {
    logout();
    return;
  }

  app.config.productionTip = false;
  app.use(router);
  app.use(elementPlusPlugins);
  app.use(componentPlugins);
  app.use(directivesPlugins);
  app.use(globalProperties);
  app.mount('#app');
})();
