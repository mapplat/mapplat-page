<template>
  <div class="file-table">
    <el-table
      ref="multipleTableRef"
      :data="files"
      style="width: 100%"
      max-height="400"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        :selectable="() => selectable"
        width="55"
      />
      <el-table-column
        prop="name"
        sortable
        :label="$t('message.file_name')"
      />
      <el-table-column
        prop="size"
        sortable
        :label="$t('message.file_size')"
      >
        <template #default="scope">
          {{ formatFileSize(scope.row.size) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { formatFileSize } from '@/utils/utils';
import { onMounted, ref } from 'vue';

const multipleTableRef = ref();
defineProps({
  selectable: {
    type: Boolean,
    default: false,
  },
  files: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['updateSelectFiles']);

const handleSelectionChange = (files) => emit('updateSelectFiles', files);
onMounted(() => {
  multipleTableRef.value.toggleAllSelection();
});
</script>
