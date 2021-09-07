import mitt from 'mitt';
import Parameter from '@ckpack/parameter';
import { checkRes } from '@/utils/customUtils';

const parameter = new Parameter();
export default {
  install(app) {
    app.config.globalProperties.$title = 'mapplat';
    app.config.globalProperties.$bus = mitt();
    app.config.globalProperties.checkRes = checkRes;
    app.config.globalProperties.parameter = parameter;
    app.config.globalProperties.$validateRefs = function (refs) {
      refs = refs || Object.keys(this.$refs);
      const errors = refs.filter((ref) => this.$refs[ref] && 'validate' in this.$refs[ref] && typeof this.$refs[ref].validate === 'function').map((ref) => this.$refs[ref].validate()).filter((val) => !!val);
      return errors.length ? errors : null;
    };
  },
};
