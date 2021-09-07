function validateRefs(refs) {
  refs = refs || Object.keys(this.$refs);
  const errors = refs.filter((ref) => this.$refs[ref] && 'validate' in this.$refs[ref] && typeof this.$refs[ref].validate === 'function').map((ref) => this.$refs[ref].validate()).filter((val) => !!val);
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
