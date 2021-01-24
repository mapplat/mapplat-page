import instance from './instance';

const user = {
  signin(params) {
    return instance.post('/user/signin', params);
  },
  signup(params) {
    return instance.post('/user/signup', params);
  },
  signout() {
    return instance.get('/user/signout');
  },
  getVerifycode() {
    return instance.get('/auth/verifycode');
  },
};

export default user;
