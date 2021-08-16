import I18n from '@ckpack/i18n';
import locale from '@/assets/locale';

const defaultLocale = localStorage.getItem('default_locale') || (['zh', 'zh-cn'].indexOf(navigator.language.toLowerCase()) === -1 ? 'en' : 'zh');
localStorage.setItem('default_locale', defaultLocale);

const i18n = new I18n({
  locale: defaultLocale, // set locale
  fallbackLocale: defaultLocale, // set fallback locale
  messages: locale,
});

const $t = i18n.t.bind(i18n);

window.$t = $t;
export default {
  install(app) {
    app.config.globalProperties.$t = $t;
    app.config.globalProperties.defaultLocale = defaultLocale;
    app.use(i18n);
  },
};
