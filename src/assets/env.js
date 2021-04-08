const SERVER_HOST = process.env.NODE_ENV === 'production' ? `://${window.location.host}` : 'http://117.50.82.140';

export default {
  SERVER_HOST,
};
