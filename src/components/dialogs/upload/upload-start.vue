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
          <el-collapse-item name="support">
            <template #title>
              选择要上传的文件
              <k-icon icon="icon-xuanze" :size="20" margin="0 12px" color="#16BB83"></k-icon>
            </template>
            <FilesTable :files="formatFiles.support" :selectable="true" @updateSelectFiles="updateSelectFiles"></FilesTable>
          </el-collapse-item>
          <el-collapse-item name="not-support">
            <template #title>
              不支持上传的文件
              <k-icon icon="icon-no" :size="20" margin="0 12px" color="#F56C6C"></k-icon>
            </template>
            <FilesTable :files="formatFiles.notSupport"></FilesTable>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="upload-dialog-options">
      <el-button @click="handleClose">取 消</el-button>
      <el-button v-if="type === 'confirm-file'" :disabled="loading" type="primary" @click="handerNext">开始上传</el-button>
    </div>
  </div>
</template>

<script>
import KLoading from '@/components/common/k-loading';
import FilesTable from './files-table';

const limitFileSize = 100 * 1048576;

const acceptTyles = ['.geojson', '.json', '.csv', '.xls', '.xlsx', '.zip'];

const stepTypes = {
  inputFile: 'input-file',
  confirmFile: 'confirm-file',
};

export default {
  components: {
    FilesTable,
    KLoading,
  },
  setup() {
    return {
      acceptTyles: acceptTyles.join(','),
    };
  },
  data() {
    return {
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
    handleClose() {
      this.type = stepTypes.inputFile;
      this.formatFiles = {};
      this.loading = false;
      this.$emit('close');
    },
    handerNext() {

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
      console.log(files);
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
