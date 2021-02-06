import axios from 'axios';
import instance from './instance';

const formDataHeaders = {
  'Content-Type': 'multipart/form-data',
};

const files = {
  precreate(fileHash, params) {
    return instance.post(`/file/${fileHash}/precreate`, params);
  },
  block(fileHash, params, chunkFile) {
    const { hash, index } = params;
    const url = `/file/${fileHash}/block?index=${index}&hash=${hash}`;
    const formData = new FormData();
    formData.append('file', chunkFile);
    return axios.post(url, formData, {
      headers: formDataHeaders,
      token: localStorage.getItem('token'),
    });
  },
  merge(fileHash) {
    return instance.post(`/file/${fileHash}/precreate`);
  },
};

export default files;
