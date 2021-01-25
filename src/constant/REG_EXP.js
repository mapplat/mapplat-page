export default {
  username: /^[0-9a-zA-Z_-]{2,20}$/,
  password: /^\S{6,32}$/,
  email: /^[0-9a-zA-Z_.-]{2,20}@[0-9a-zA-Z_-]{1,20}(\.[a-zA-Z0-9_-]{2,8}){1,2}$/,
  verifycode: /^\d{6}$/,
};
