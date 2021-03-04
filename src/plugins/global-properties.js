import mitt from 'mitt';
import Parameter from '@c_kai/parameter';
import { logout, formatDate } from '@/utils/utils';

const parameter = new Parameter();
export default {
  install(app) {
    app.config.globalProperties.$title = 'mapplat';
    app.config.globalProperties.$size = 'medium';
    app.config.globalProperties.$bus = mitt();
    app.config.globalProperties.parameter = parameter;
    app.config.globalProperties.logout = logout;
    app.config.globalProperties.formatDate = formatDate;
    app.config.globalProperties.$validateRefs = function (refs) {
      refs = refs || Object.keys(this.$refs);
      const errors = refs.filter((ref) => this.$refs[ref] && 'validate' in this.$refs[ref] && typeof this.$refs[ref].validate === 'function').map((ref) => this.$refs[ref].validate()).filter((val) => !!val);
      return errors.length ? errors : null;
    };
    app.config.globalProperties.$success = function (message, options = {}) {
      const duration = options.duration || 2500;
      this.$notify({
        duration,
        type: 'success',
        message,
      });
    };
    app.config.globalProperties.$error = function (message, result, options = {}) {
      const duration = options.duration || 2500;

      if (result && result.data) {
        switch (result.data.code) {
          case 102: {
            setTimeout(() => {
              this.logout();
            }, 1500);
            break;
          }
          case 105: {
            const errorData = result.data.msg;
            if (Array.isArray(errorData)) {
              message = `${errorData.map((val) => val.field)} is not correct`;
            } else {
              message = errorData;
            }
            break;
          }
          default:
            message = result.data.msg || message;
            break;
        }
      }
      this.$notify({
        duration,
        type: 'error',
        message,
      });
    };
  },
};
