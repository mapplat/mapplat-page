import KIcon from '@/components/common/k-icon.vue';
import KInput from '@/components/common/k-input.vue';

const components = {
  'k-icon': KIcon,
  'k-input': KInput,
};
export default {
  install(Vue) {
    Object.keys(components).forEach((val) => {
      Vue.component(val, components[val]);
    });
  },
};
