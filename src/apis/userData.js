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
  updateColumnValue(dataUuid, params) {
    return instance.put(`/data/${dataUuid}/column/value`, params);
  },
  updateColumn(dataUuid, params) {
    return instance.put(`/data/${dataUuid}/column`, params);
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
  tableList(dataUuid, params) {
    return instance.get(`/data/${dataUuid}/table`, { params });
  },
};

export default job;
