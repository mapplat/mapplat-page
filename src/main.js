import { createApp } from 'vue';

import plugins from '@/plugin';
import App from '@/App.vue';
import router from '@/router';
import { checkRes, userAPI } from '@/apis';

import 'ol/ol.css';
import '@/assets/icon/iconfont';

async function getUserInfo() {
  const userRes = await userAPI.info();
  return checkRes(userRes) ? userRes.data.data : null;
}

(async () => {
  const userInfo = await getUserInfo();
  router.$user = userInfo;

  const app = createApp(App);
  app.config.productionTip = false;
  app.config.globalProperties.$user = userInfo;

  app.use(plugins);
  app.use(router);

  app.mount('#app');
})();
