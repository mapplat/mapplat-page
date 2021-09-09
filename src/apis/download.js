import { SERVER_HOST } from '@/assets/env';

function download(url) {
  const link = document.createElement('a');
  const href = `${SERVER_HOST}/${url}?token=${localStorage.getItem('token')}`;
  link.href = href;
  link.setAttribute('download', href);
  link.click();
}

export default download;
