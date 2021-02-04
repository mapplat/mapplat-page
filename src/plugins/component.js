import KIcon from '@/components/common/k-icon';
import KInput from '@/components/common/k-input';
import KLoading from '@/components/common/k-loading';

const components = {
  KIcon,
  KInput,
  KLoading,
};
export default {
  install(Vue) {
    Object.keys(components).forEach((val) => {
      Vue.component(val, components[val]);
    });
  },
};
