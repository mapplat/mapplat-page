import userAPI from '@/apis/user';

function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

async function logout(to = '') {
  localStorage.removeItem('token');
  await userAPI.signout();
  window.open(`/login.html?to=${to}`, '_self');
}

export {
  getType,
  logout,
};
