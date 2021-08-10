<template>
  <div class="file-table">
    <el-table
      ref="multipleTable"
      :data="files"
      style="width: 100%"
      max-height="400"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        :selectable='()=> selectable'
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        sortable
        :label="$t('message.file_name')">
      </el-table-column>
      <el-table-column
        prop="size"
        sortable
        :label="$t('message.file_size')">
        <template #default="scope">
          {{ formatFileSize(scope.row.size) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatFileSize } from '@/utils/utils';

export default {
  props: {
    selectable: {
      type: Boolean,
      default: false,
    },
    files: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectFiles: [],
    };
  },
  mounted() {
    this.$refs.multipleTable.toggleAllSelection();
  },
  methods: {
    handleSelectionChange(files) {
      this.$emit('updateSelectFiles', files);
    },
    formatFileSize,
  },
};
</script>
