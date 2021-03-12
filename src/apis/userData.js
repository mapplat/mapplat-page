import instance from './instance';
import download from './download';

const job = {
  myData(params) {
    params.isPrivate = true;
    return instance.get('/data', { params });
  },
  publicData(params) {
    params.isPrivate = false;
    return instance.get('/data', { params });
  },
  update(dataUuid, params) {
    return instance.put(`/data/${dataUuid}`, params);
  },
  delete(dataUuid) {
    return instance.delete(`/data/${dataUuid}`);
  },
  download(dataUuid, type) {
    return download(`/api/data/download/${dataUuid}.${type}`);
  },
  copy(dataUuid) {
    return instance.post(`/data/copy/${dataUuid}`);
  },
  tableList(dataUuid) {
    return instance.get(`/data/${dataUuid}/table`);
  },
};

export default job;
