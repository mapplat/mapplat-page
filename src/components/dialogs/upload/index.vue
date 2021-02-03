<template>
  <div class="upload-dialog">
    <el-dialog
      title="上传数据"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="upload-wrapper">
        <KLoading :loading="isHandleSelectFile"></KLoading>
        <div v-if="curentStep === steps.startUpload.value" class="upload-start" @dragenter.prevent="dragenter" @dragover.prevent="dragover"
          @drop.prevent="drop">
          <input ref="uploadFile" style="display:none;" type="file" id="select-file"
            :accept="acceptTyles" multiple @change="onFileSelected">
          <label for="select-file" class="upload-start-content"><k-icon class="zy-m-margin" icon="icon-shangchuan" :size="24"></k-icon>拖拽文件至此处或点击上传文件</label>
        </div>
      </div>
      <template #footer>
        <span v-if="curentStep === steps.startUpload.value">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handerNext">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import KLoading from '@/components/common/k-loading';

const acceptTyles = ['.geojson', '.json', '.csv', '.xls', '.xlsx', '.zip'];
const steps = {
  startUpload: {
    value: 'startUpload',
  },
  selectFiels: {
    value: 'selectFiels',
  },
};
export default {
  components: {
    KLoading,
  },
  setup() {
    return {
      acceptTyles: acceptTyles.join(','),
      steps,
    };
  },
  data() {
    return {
      curentStep: steps.startUpload.value,
      dialogVisible: false,
      isHandleSelectFile: false,
    };
  },
  created() {
    this.$bus.off('open-upload-dialog');
    this.$bus.on('open-upload-dialog', () => {
      this.dialogVisible = true;
    });
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handerNext() {
      switch (this.curentStep) {
        case steps.startUpload.value:

          break;
        default:
          break;
      }
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

      this.isHandleSelectFile = true;

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

      this.isHandleSelectFile = false;
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
    handerFiles(files) {
      console.log(files);
    },
    onFileSelected(evt) {
      this.isHandleSelectFile = true;
      if (!evt.target || !evt.target.files || evt.target.files.length <= 0) {
        return;
      }

      const files = Array.from(evt.target.files).map((val) => {
        if (val.webkitRelativePath) {
          val._webkitRelativePath = val.webkitRelativePath;
        } else {
          val._webkitRelativePath = val.name;
        }
        return val;
      });
      this.handerFiles(files);

      this.isHandleSelectFile = false;
    },
  },
};
</script>
<style lang="scss">
.upload-wrapper {
  position: relative;

  .upload-start {
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
