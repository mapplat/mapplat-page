import { createI18n } from 'vue-i18n';
import locale from '@/assets/locale';

const defaultLocale = localStorage.getItem('default_locale') || (['zh', 'zh-cn'].indexOf(navigator.language.toLowerCase()) === -1 ? 'en' : 'zh');
localStorage.setItem('default_locale', defaultLocale);

const i18n = createI18n({
  locale: defaultLocale, // set locale
  fallbackLocale: defaultLocale, // set fallback locale
  messages: locale,
});

window._$t = i18n.global.t;
export default {
  install(app) {
    app.config.globalProperties._$t = window._$t;
    app.config.globalProperties.defaultLocale = defaultLocale;
    app.use(i18n);
  },
};
