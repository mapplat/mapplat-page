import utils from '@/utils/utils';

export default {
  install(app) {
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
