import { computed, ref } from 'vue';
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
const currentLang = ref(defaultLocale);
const setCurrentLang = (lang) => {
  if (currentLang.value === lang) return;
  currentLang.value = lang;
  localStorage.setItem('default_locale', lang);
  window.location.reload();
};
const currentLocale = computed(() => locale[currentLang.value]);

export {
  currentLocale,
  currentLang,
  setCurrentLang,
  $t,
};
