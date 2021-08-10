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
    msg: $t('reg_tip.password'),
  },
  email: {
    type: 'string',
    format: REG_EXP.email,
    msg: $t('reg_tip.email'),
  },
  verifycode: {
    type: 'string',
    format: REG_EXP.verifycode,
    msg: $t('reg_tip.verifycode'),
  },
};
