<template>
  <div class="file-progress">
    <div class="progress-content" :style="progressStye"></div>
    <div class="file-content">
      <div class="file-name text-ellipsis">{{file.name}}</div>
      <div class="file-size text-ellipsis">{{formatFileSize(file.size)}}</div>
      <div class="file-status text-ellipsis">
          <k-icon v-if="uploadInfo.status === 'success'" icon="icon-xuanze" :size="20"/>
          <div v-if="uploadInfo.status === 'exception'">
            {{uploadInfo.exception}}
          </div>
          <div  v-if="!uploadInfo.status">
            {{fixedNum(uploadInfo.percentage, 1)}}%
            -
            {{fixedNum(file.percentage, 1)}}%
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatFileSize, fixedNum } from '@/utils/utils';

// success exception
export default {
  props: {
    file: Object,
    default: () => {},
  },
  data() {
    return {
      uploadInfo: {
        status: '',
        percentage: 0,
        exception: '',
      },
      progressStye: {},

    };
  },
  watch: {
    'file.uploadInfo': {
      deep: true,
      immediate: true,
      handler(val) {
        this.uploadInfo = val || {};
      },
    },
    status: {
      immediate: true,
      handler(val) {
        switch (val) {
          case 'success':
            this.progressStye = {
              width: '100%',
              'background-color': '#e2eeff',
            };
            break;
          case 'exception':
            this.progressStye = {
              width: '100%',
              'background-color': '#ffeaea',
            };
            break;
          default:
            this.progressStye = {
              width: `${this.uploadInfo.percentage}%`,
              'background-color': '#e2eeff',
            };
        }
      },
    },
  },
  methods: {
    formatFileSize,
    fixedNum,
  },
};
</script>

<style lang="scss">
.file-progress {
  position: relative;
  .file-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .file-name,.file-size,.file-status {
      padding: 0 12px;
    }
    .file-name {
      width: 40%;
    }
    .file-size,.file-status {
      width: 20%;
    }
  }
  .progress-content {
    position: absolute;
    top: 0;
    bottom: 0;
    max-width: 100%;
    background-color: $light-primary;
    z-index: -1;
  }
}
</style>
