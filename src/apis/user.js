import instance from './instance';

const user = {
  info() {
    return instance.get('/user/info');
  },
  signin(params) {
    return instance.post('/user/signin', params);
  },
  signup(params) {
    return instance.post('/user/signup', params);
  },
  forgetPassworld(params) {
    return instance.put('/user/passworld/forget', params);
  },
  updatePassworld(params) {
    return instance.put('/user/passworld', params);
  },
  signout() {
    return instance.get('/user/signout');
  },
  getVerifycode(params) {
    return instance.get('/auth/verifycode', { params });
  },
};

export default user;
