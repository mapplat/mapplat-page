<template>
  <div class="file-progress">
    <div class="progress-content" :style="progressStye"></div>
    <div class="file-content">
      <div class="file-name text-ellipsis">{{file.name}}</div>
      <div class="file-size text-ellipsis">{{formatFileSize(file.size)}}</div>
      <div class="file-status text-ellipsis">
          <template v-if="file.status === 'success'">
            <k-icon icon="icon-xuanze" :size="20"/>
            <div>
              {{file.msg}}
x            </div>
          </template>

          <template v-if="file.status === 'exception'">
            <div>
              {{file.msg}}
            </div>
          </template>

          <template v-if="!file.status">
            <div>
              {{fixedNum(file.percentage, 1)}}%
            </div>
          </template>
      </div>
    </div>
  </div>
</template>

<script>
import { formatFileSize, fixedNum } from '@/utils/utils';

export default {
  props: {
    file: {
      type: Object,
    },
  },
  data() {
    return {
      progressStye: {},
    };
  },
  watch: {
    file: {
      immediate: true,
      handler() {
        switch (this.file.status) {
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
              width: `${this.file.percentage}%`,
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
