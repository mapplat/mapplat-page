const directives = {
  focus: {
    componentUpdated(el, { value }) {
      if (value) el.focus();
    },
  },
  loading: {
    mounted(el, binding) {
      const loading = binding.value;
      const loadingWrapper = document.createElement('div');
      // loadingWrapper.innerHTML = '<i class="el-icon-loading"></i>';
      loadingWrapper.innerHTML = '<svg class="k-icon icon" aria-hidden="true"><use xlink:href="#icon-loading"></use></svg>';
      loadingWrapper.className = 'mapplat-loading';
      el.style.position = 'relative';
      loadingWrapper.style.display = !loading ? 'none' : 'flex';
      el.appendChild(loadingWrapper);
    },
    updated: (el, binding) => {
      const loading = binding.value;
      el.querySelector('.mapplat-loading').style.display = !loading ? 'none' : 'flex';
    },
  },
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
