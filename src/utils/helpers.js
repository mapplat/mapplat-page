function validateRefs(refs) {
  const errors = refs.filter((ref) => ref && 'validate' in ref && typeof ref.validate === 'function')
    .map((ref) => ref.validate())
    .filter((val) => !!val);
  return errors.length ? errors : null;
}

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
  validateRefs,
  checkRes,
  signout,
  getFilesTypeByName,
};
