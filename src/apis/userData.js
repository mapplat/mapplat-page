import instance from './instance';

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
};

export default job;
