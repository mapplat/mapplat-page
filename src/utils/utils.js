import sha256 from 'fast-sha256';
import userAPI from '@/apis/user';

const splitFileSize = 8 * 1048576;

/**
 *
 * @param {number} num 数字
 * @param {number} digits 保留小数位数
 */
function fixedNum(num, digits = 4) {
  num = Number(num);
  return Number.isNaN(num) ? Number(0).toFixed(digits) : num.toFixed(digits);
}

function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

async function logout(to = '') {
  localStorage.removeItem('token');
  await userAPI.signout();
  window.open(`/login.html?to=${to}`, '_self');
}

function formatFileSize(size) {
  if (size <= 1024) {
    return `${size}B`;
  }
  size /= 1024;
  if (size <= 1024) {
    return `${fixedNum(size, 2)}KB`;
  }
  size /= 1024;
  if (size <= 1024) {
    return `${fixedNum(size, 2)}MB`;
  }
  size /= 1024;
  return `${fixedNum(size, 2)}GB`;
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), (x) => (`00${x.toString(16)}`).slice(-2)).join('');
}

async function getFileHash(file) {
  const blocks = [];
  const hasher = new sha256.Hash();

  const { size } = file;
  for (let start = 0; start < size; start += splitFileSize) {
    const buffer = await file.slice(start, start + splitFileSize).arrayBuffer();
    hasher.update(buffer);

    blocks.push({
      hash: sha256(buffer),
      index: start / splitFileSize,
    });
  }
  const hash = hasher.digest();

  return {
    hash,
    blocks,
  };
}
export {
  buf2hex,
  fixedNum,
  getType,
  logout,
  formatFileSize,
  getFileHash,
};
