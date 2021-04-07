function download(url) {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', url);
  link.click();
}

export default download;
