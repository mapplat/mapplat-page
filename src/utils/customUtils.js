function checkRes(res) {
  return (res && res.data && res.data.code === 0);
}

async function signout(href = '') {
  window.localStorage.removeItem('token');
  window.location.href = href;
}

function getFilesTypeByName(name) {
  if (!name) return null;
  return name.split('.').pop().toLocaleLowerCase();
}

export {
  checkRes,
  signout,
  getFilesTypeByName,
};
