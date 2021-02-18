import sha256 from 'fast-sha256';
import userAPI from '@/apis/user';
import FILES from '@/constant/FILES';

function getRandom(max, min = 0, digits = 4) {
  max = Number(max);
  min = Number(min);
  const num = Number((min + Math.random() * (max - min)).toFixed(digits));
  return Number.isNaN(num) ? null : num;
}

function getRandomStr(len) {
  const dictionary = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const dictionaryLen = dictionary.length;
  let str = '';
  for (let i = 0; i < len; i += 1) {
    str += dictionary[Math.floor(getRandom(dictionaryLen))];
  }
  return str;
}
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

  const { splitSize } = FILES;
  const { size } = file;
  for (let start = 0; start < size; start += splitSize) {
    const end = start + splitSize > size ? size : start + splitSize;
    const buffer = await file.slice(start, end).arrayBuffer();
    const u8Buffer = new Uint8Array(buffer);

    blocks.push({
      hash: buf2hex(sha256(u8Buffer)),
      index: start / splitSize,
      start,
      end,
    });

    hasher.update(u8Buffer);
  }
  const hash = hasher.digest();

  return {
    hash: buf2hex(hash),
    blocks,
  };
}

export {
  getRandomStr,
  fixedNum,
  getType,
  logout,
  formatFileSize,
  getFileHash,
};
