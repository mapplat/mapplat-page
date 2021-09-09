import mitt from 'mitt';
import { TITLE } from '@/assets/env';

export default {
  install(app) {
    app.config.globalProperties.$title = TITLE;
    app.config.globalProperties.$bus = mitt();
  },
};
