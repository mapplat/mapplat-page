import mitt from 'mitt';
import { TITLE } from '@/env';

export default {
  install(app) {
    app.config.globalProperties.$title = TITLE;
    app.config.globalProperties.$bus = mitt();
  },
};
