import axios from 'axios';
import { SERVER_HOST } from '@/env';
import instance from './instance';

const formDataHeaders = {
  'Content-Type': 'multipart/form-data',
  token: localStorage.getItem('token'),
};

const files = {
  precreate(fileHash, params) {
    return instance.post(`/file/${fileHash}/precreate`, params);
  },
  block(blockHash, chunkFile) {
    const url = `${SERVER_HOST}/file/${blockHash}/block`;
    const formData = new FormData();
    formData.append('file', chunkFile);
    return axios.post(url, formData, {
      headers: formDataHeaders,
    });
  },
  merge(fileId) {
    return instance.post(`/file/${fileId}/create`);
  },
};

export default files;
