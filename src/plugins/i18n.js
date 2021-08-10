import I18n from '@ckpack/i18n';
import locale from '@/assets/locale';
// import ElementLocale from 'element-plus/lib/locale';

const defaultLocale = localStorage.getItem('default_locale') || (['zh', 'zh-cn'].indexOf(navigator.language.toLowerCase()) === -1 ? 'en' : 'zh');
localStorage.setItem('default_locale', defaultLocale);

const i18n = new I18n({
  locale: defaultLocale, // set locale
  fallbackLocale: defaultLocale, // set fallback locale
  messages: locale,
});

window.$t = i18n.t.bind(i18n);
// ElementLocale.i18n(window.$t);

export default {
  install(app) {
    app.config.globalProperties.$t = window.$t;
    app.config.globalProperties.defaultLocale = defaultLocale;
    app.use(i18n);
  },
};
