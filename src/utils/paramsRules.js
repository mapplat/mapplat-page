import constant from '@/constant';

const { REG_EXP } = constant;
export default {
  username: {
    type: 'string',
    format: REG_EXP.username,
  },
  password: {
    type: 'string',
    format: REG_EXP.password,
    msg: '密码长度不能小于六位',
  },
  email: {
    type: 'string',
    format: REG_EXP.email,
    msg: '邮箱不合法',
  },
  verifycode: {
    type: 'string',
    format: REG_EXP.verifycode,
    msg: '验证码长度错误',
  },
};
