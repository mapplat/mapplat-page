<template>
  <div class="upload-start">
    <div
      v-loading="loading"
      class="upload-start-wrapper"
      @dragenter.prevent="dragenter"
      @dragover.prevent="dragover"
      @drop.prevent="drop"
    >
      <div v-if="type === 'input-file'">
        <input
          id="select-file"
          ref="uploadFile"
          style="display:none;"
          type="file"
          :accept="acceptTyles"
          multiple
          @change="onFileSelected"
        >
        <label
          for="select-file"
          class="upload-start-content"
        ><k-icon
          class="zy-m-margin"
          icon="icon-shangchuan"
          :size="24"
        />{{ $t('message.drag_and_drop_files_here_or_click_to_upload_files') }}</label>
      </div>
      <div v-if="type === 'confirm-file'">
        <el-collapse v-model="activeCollapse">
          <el-collapse-item
            :title="$t('message.select_the_file_to_upload')"
            name="support"
          >
            <FilesTable
              :files="formatFiles.support"
              :selectable="true"
              @updateSelectFiles="updateSelectFiles"
            />
          </el-collapse-item>
          <el-collapse-item
            v-if="formatFiles.notSupport && formatFiles.notSupport.length"
            :title="$t('message.files_not_supported_for_upload')"
            name="not-support"
          >
            <FilesTable :files="formatFiles.notSupport" />
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="upload-dialog-options">
      <el-button
        v-if="type === 'confirm-file'"
        @click="reSelected"
      >
        {{ $t('message.reselect') }}
      </el-button>
      <el-button
        v-if="type === 'confirm-file'"
        :disabled="loading"
        type="primary"
        @click="handerNext"
      >
        {{ $t('message.start_upload') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import { notify } from '@/utils';
import FILES from '@/constant/FILES';
import { getFilesTypeByName } from '@/utils/helpers';
import { bus } from '@/utils/bus';
import FilesTable from './files-table.vue';

const stepTypes = {
  inputFile: 'input-file',
  confirmFile: 'confirm-file',
};

const acceptTyles = FILES.types.map((val) => `.${val}`).join(',');

const emit = defineEmits(['close']);
const selectedFiles = ref([]);
const formatFiles = ref({
  support: [],
  noSupport: [],
});
const type = ref(stepTypes.inputFile);
const loading = ref(false);
const activeCollapse = ref('support');

const reSelected = () => {
  selectedFiles.value = [];
  formatFiles.value = {
    support: [],
    noSupport: [],
  };
  type.value = stepTypes.inputFile;
  loading.value = false;
  activeCollapse.value = 'support';
};

const handerNext = () => {
  if (!Array.isArray(selectedFiles.value) || !selectedFiles.value.length) {
    notify.error($t('message.no_files_selected_for_upload'));
    return;
  }
  if (selectedFiles.value.length > FILES.limitCount) {
    notify.error(`${$t('message.the_number_of_files_selected_for_upload_cannot_exceed', { number: FILES.limitCount })}`);
    return;
  }
  bus.emit('push-upload-files', selectedFiles.value);
  nextTick(() => {
    reSelected();
    emit('close');
  });
};

const dragenter = (e) => {
  e.stopPropagation();
  e.preventDefault();
};
const dragover = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

/**
 * FilesEntrys转为Files
 */
const transformFilesEntrys = async (filesEntrys) => {
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
};

/**
 * 获取drop区域的文件
 * @returns FilesEntrys
 */
const getFilesEntrys = async (entrys) => {
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
};

const classifyFiles = (files) => {
  const support = [];
  const notSupport = [];
  for (const file of files) {
    const { size: fileSize } = file;
    if (fileSize > FILES.limitSize || FILES.types.indexOf(getFilesTypeByName(file.name)) === -1) {
      notSupport.push(file);
    } else {
      support.push(file);
    }
  }
  return {
    support,
    notSupport,
  };
};
const handerFiles = (files) => {
  if (!files.length) {
    notify.error($t('message.no_file_selected'));
    return;
  }
  if (files.length > 100) {
    notify.error($t('message.the_number_of_files_selected_for_upload_cannot_exceed', { number: FILES.limitCount }));
    return;
  }
  type.value = stepTypes.confirmFile;
  formatFiles.value = classifyFiles(files);
};

const drop = async (e) => {
  e.stopPropagation();
  e.preventDefault();
  loading.value = true;
  const { items } = e.dataTransfer;
  const dropFilesEntrys = [];
  for (let item of items) {
    if (!item || !item.webkitGetAsEntry) continue;
    item = item.webkitGetAsEntry();
    if (!item) continue;
    const filesEntrys = await getFilesEntrys(item);
    dropFilesEntrys.push(...filesEntrys);
  }

  const files = await transformFilesEntrys(dropFilesEntrys);
  handerFiles(files);

  loading.value = false;
};

const updateSelectFiles = (files) => {
  selectedFiles.value = files;
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
