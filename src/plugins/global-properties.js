import { TITLE } from '@/env';

export default {
  install(app) {
    app.config.globalProperties.$title = TITLE;
  },
};
