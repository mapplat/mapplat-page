import I18n from '@/plugins/i18n';
import GlobalProperties from '@/plugins/global-properties';
import Directives from '@/plugins/directives';
import ElementPlus from '@/plugins/element-plus';
import Component from '@/plugins/component';

export default {
  install(app) {
    app.use(I18n);
    app.use(GlobalProperties);
    app.use(Directives);
    app.use(ElementPlus);
    app.use(Component);
  },
};
