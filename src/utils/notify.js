import { ElNotification, ElMessageBox } from 'element-plus';
import { signout } from '@/utils/helpers';

function notify(type, message, options) {
  return ElNotification({
    type,
    message,
    ...options,
  });
}

const success = (message, options) => notify('success', message, options);
const warning = (message, options) => notify('warning', message, options);
const error = (message, result, options) => {
  if (result && result.data) {
    switch (result.data.code) {
      case 102: {
        setTimeout(() => {
          signout();
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
  notify('error', message, options);
};

const { confirm } = ElMessageBox;

export {
  confirm,
  success,
  warning,
  error,
};
