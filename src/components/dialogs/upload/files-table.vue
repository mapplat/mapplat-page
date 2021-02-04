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
        label="文件名称">
      </el-table-column>
      <el-table-column
        prop="size"
        sortable
        label="文件大小">
        <template #default="scope">
          {{ formatSize(scope.row.size) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
    formatSize(size) {
      if (size <= 1024) {
        return `${size}B`;
      }
      size /= 1024;
      if (size <= 1024) {
        return `${parseInt(size)}KB`;
      }
      size /= 1024;
      if (size <= 1024) {
        return `${parseInt(size)}MB`;
      }
      size /= 1024;
      return `${parseInt(size)}GB`;
    },
  },
};
</script>
