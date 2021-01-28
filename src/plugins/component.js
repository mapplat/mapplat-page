import KIcon from '@/components/common/k-icon';

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
