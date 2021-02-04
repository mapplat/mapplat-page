<template>
  <div class="upload-start" >
    <div class="upload-start-wrapper" @dragenter.prevent="dragenter" @dragover.prevent="dragover"
      @drop.prevent="drop">
      <KLoading :loading="loading"></KLoading>
      <div v-if="type === 'input-file'">
        <input ref="uploadFile" style="display:none;" type="file" id="select-file"
          :accept="acceptTyles" multiple @change="onFileSelected">
        <label for="select-file" class="upload-start-content"><k-icon class="zy-m-margin" icon="icon-shangchuan" :size="24"></k-icon>拖拽文件至此处或点击上传文件</label>
      </div>
      <div v-if="type === 'confirm-file'">
        <el-collapse v-model="activeCollapse">
          <el-collapse-item title="选择要上传的文件" name="support">
            <FilesTable :files="formatFiles.support" :selectable="true" @updateSelectFiles="updateSelectFiles"></FilesTable>
          </el-collapse-item>
          <el-collapse-item title="不支持上传的文件" name="not-support">
            <FilesTable :files="formatFiles.notSupport"></FilesTable>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="upload-dialog-options">
      <el-button v-if="type === 'confirm-file'" @click="reSelected">重新选择</el-button>
      <el-button v-if="type === 'confirm-file'" :disabled="loading" type="primary" @click="handerNext">开始上传</el-button>
    </div>
  </div>
</template>

<script>
import FilesTable from './files-table';

const limitFileSize = 100 * 1048576;
const limitFileCount = 5;

const acceptTyles = ['.geojson', '.json', '.csv', '.xls', '.xlsx'];

const stepTypes = {
  inputFile: 'input-file',
  confirmFile: 'confirm-file',
};

export default {
  components: {
    FilesTable,
  },
  setup() {
    return {
      acceptTyles: acceptTyles.join(','),
    };
  },
  data() {
    return {
      selectedFiles: [],
      formatFiles: {
        support: [],
        noSupport: [],
      },
      type: stepTypes.inputFile,
      loading: false,
      activeCollapse: 'support',
    };
  },
  methods: {
    reSelected() {
      this.selectedFiles = [];
      this.formatFiles = {
        support: [],
        noSupport: [],
      };
      this.type = stepTypes.inputFile;
      this.loading = false;
      this.activeCollapse = 'support';
    },
    handerNext() {
      if (!Array.isArray(this.selectedFiles) || !this.selectedFiles.length) {
        this.$error('未选择上传的文件');
        return;
      }
      if (this.selectedFiles.length > limitFileCount) {
        this.$error(`选择上传的文件数量不能超过${limitFileCount}个`);
        return;
      }
      this.$bus.emit('push-upload-files', this.selectedFiles);
      this.$nextTick(() => {
        this.reSelected();
        this.$emit('close');
      });
    },
    dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    dragover(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    async drop(e) {
      e.stopPropagation();
      e.preventDefault();

      this.loading = true;
      const { items } = e.dataTransfer;
      const dropFilesEntrys = [];
      for (let item of items) {
        if (!item || !item.webkitGetAsEntry) continue;
        item = item.webkitGetAsEntry();
        if (!item) continue;
        const filesEntrys = await this.getFilesEntrys(item);
        dropFilesEntrys.push(...filesEntrys);
      }

      const files = await this.transformFilesEntrys(dropFilesEntrys);
      this.handerFiles(files);

      this.loading = false;
    },
    /**
       * FilesEntrys转为Files
       */
    async transformFilesEntrys(filesEntrys) {
      const files = [];
      const fileEntry2File = async (fileEntry) => new Promise((resolve) => {
        fileEntry.file((file) => {
          // 附加文件路径
          file._webkitRelativePath = fileEntry.fullPath;
          resolve(file);
        });
      });
      for (const filesEntry of filesEntrys) {
        files.push(await fileEntry2File(filesEntry));
      }
      return files;
    },

    /**
       * 获取drop区域的文件
       * @returns FilesEntrys
       */
    async getFilesEntrys(entrys) {
      const filesEntrys = [];
      const scanFiles = async (item) => new Promise((resolve) => {
        if (item.isDirectory) {
          const directoryReader = item.createReader();
          directoryReader.readEntries(async (entries) => {
            for (const entrie of entries) {
              await scanFiles(entrie);
            }
            resolve();
          });
        } else {
          filesEntrys.push(item);
          resolve();
        }
      });
      await scanFiles(entrys);
      return filesEntrys;
    },
    onFileSelected(evt) {
      this.loading = true;

      if (!evt.target || !evt.target.files || evt.target.files.length <= 0) {
        return;
      }

      const files = Array.from(evt.target.files).map((val) => {
        val._webkitRelativePath = val.webkitRelativePath || val.name;
        return val;
      });

      this.handerFiles(files);

      this.loading = false;
    },
    handerFiles(files) {
      if (!files.length) {
        this.$error('未选择文件');
        return;
      }
      if (files.length > 100) {
        this.$error('选择文件数量过多');
        return;
      }
      this.type = stepTypes.confirmFile;
      this.formatFiles = this.classifyFiles(files);
    },
    getFilesTypeByName(name) {
      if (!name) return null;
      return name.split('.').pop().toLocaleLowerCase();
    },
    classifyFiles(files) {
      const support = [];
      const notSupport = [];
      for (const file of files) {
        const fileInfo = {
          _file: file,
          _webkitRelativePath: file._webkitRelativePath,
          name: file.name,
          size: file.size,
          type: this.getFilesTypeByName(file.name),
        };

        if (fileInfo.size > limitFileSize || acceptTyles.indexOf(`.${fileInfo.type}`) === -1) {
          notSupport.push(fileInfo);
        } else {
          support.push(fileInfo);
        }
      }
      return {
        support,
        notSupport,
      };
    },
    updateSelectFiles(files) {
      this.selectedFiles = files;
    },
  },
};
</script>

<style lang="scss">
.upload-start {
  .upload-start-wrapper {
    position: relative;
    #select-file {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .upload-start-content {
      height: 300px;
      width: 100%;
      background-color: $light-gray;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        .k-icon {
          color: $primary;
        }
      }
    }
  }
}
</style>
