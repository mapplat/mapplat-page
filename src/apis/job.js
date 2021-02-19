import instance from './instance';

const job = {
  info(jobId) {
    return instance.get(`/job/${jobId}`);
  },
  list(params) {
    return instance.get('/job', { params });
  },
  create(params) {
    return instance.post('/job', params);
  },
};

export default job;
