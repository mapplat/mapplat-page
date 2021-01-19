import KIcon from '@/components/common/k-icon.vue';

const components = {
  KIcon,
};
export default {
  install(Vue) {
    Object.keys(components).forEach((val) => {
      Vue.component(val, components[val]);
    });
  },
};
