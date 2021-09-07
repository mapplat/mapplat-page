import mitt from 'mitt';

export default {
  install(app) {
    app.config.globalProperties.$title = 'mapplat';
    app.config.globalProperties.$bus = mitt();
  },
};
