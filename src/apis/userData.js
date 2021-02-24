import instance from './instance';

const job = {
  list(params) {
    return instance.get('/data', { params });
  },
};

export default job;
