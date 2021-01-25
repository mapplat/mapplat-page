import utils from '@/utils/utils';
import Parameter from '@c_kai/parameter';

const parameter = new Parameter();
export default {
  install(app) {
    app.config.globalProperties.parameter = parameter;
    app.config.globalProperties.$validateRefs = function (refs) {
      refs = refs || Object.keys(this.$refs);
      const errors = refs.filter((ref) => this.$refs[ref] && 'validate' in this.$refs[ref] && typeof this.$refs[ref].validate === 'function').map((ref) => this.$refs[ref].validate()).filter((val) => !!val);

      return errors.length ? errors : null;
    };
    app.config.globalProperties.$success = function (message) {
      this.$message({
        type: 'success',
        message,
      });
    };
    app.config.globalProperties.$error = function (message, result) {
      if (result && result.data) {
        switch (result.data.code) {
          case 102: {
            message = '会话已失效请重新登陆';
            setTimeout(() => {
              utils.logout();
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
      this.$message({
        type: 'error',
        message,
      });
    };
  },
};
