<template>
  <div class="file-progress">
    <div
      class="progress-content"
      :style="progressStye"
    ></div>
    <div class="file-content">
      <div class="file-name text-ellipsis">
        {{ file.name }}
      </div>
      <div class="file-size text-ellipsis">
        {{ formatFileSize(file.size) }}
      </div>
      <div class="file-status text-ellipsis">
        <template v-if="file.status === 'success'">
          <k-icon
            icon="icon-xuanze"
            :size="18"
          />
          <div class="file-status-msg">
            {{ file.msg }}
          </div>
        </template>

        <template v-if="file.status === 'exception'">
          <k-icon
            icon="icon-shibai"
            :size="18"
          />
          <div class="file-status-msg">
            {{ file.msg }}
          </div>
        </template>

        <template v-if="file.status === 'progress'">
          <div class="file-status-msg">
            {{ file.msg }}
          </div>
          <div>
            {{ fixedNum(file.percentage, 1) }}%
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
              width: '0',
              'background-color': '#e2eeff',
            };
            break;
          case 'exception':
            this.progressStye = {
              width: '0',
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
      width: 50%;
    }
    .file-size,.file-status {
      width: 25%;
      text-align: center;
      display: flex;
      justify-content: flex-start;
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
  .file-status-msg {
    display: inline-block;
    padding: 0 4px;
  }
}
</style>
