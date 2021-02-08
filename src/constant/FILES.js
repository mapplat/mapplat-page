export default {
  types: ['geojson', 'json', 'csv', 'xls', 'xlsx', 'zip'],
  limitSize: 1000 * 1048576,
  limitCount: 5,
  // splitSize: 16 * 1048576,
  splitSize: 16 * 1024,
};
