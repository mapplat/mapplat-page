import instance from './instance';

const job = {
  info(jobId) {
    return instance.get(`/job/${jobId}`);
  },
  create(params) {
    return instance.post('/job', params);
  },
};

export default job;
