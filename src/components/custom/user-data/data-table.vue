<template>
  <div class="data-table" v-loading="loading">
    <el-input
      v-show="isShowEditInput"
      ref="data-table-edit"
      class="data-table-edit"
      type="textarea"
      :autofocus="true"
      :style="inputStyle"
      :rows="2"
      @change="changeCellValue"
      @blur="blurCellValue"
      v-model="curentCell.columnValue">
    </el-input>
    <el-table
      ref="data-table"
      :data="dataTable.rows"
      size="mini"
      :fit="true"
      :border="true"
      height="100%"
      @cell-dblclick="cellEdit"
      style="width: 100%;">
      <el-table-column
      v-for="(value, key) in dataTable.columns"
      :key="key"
      :fixed="key === idColumn"
      :min-width="key === idColumn ? '100px' : '180px'"
      :resizable="false"
      :prop="key"
      >
        <template #header>
          <div class="text-ellipsis table-header-name">{{key}}</div>
          <div class="text-ellipsis table-header-type">{{value}}</div>
        </template>
        <template #default="scope">
          <div :key="key" class="data-table-cell text-ellipsis hover-pointer">{{scope.row[key]}}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="10"
      :total="dataTable.count">
    </el-pagination>
  </div>
</template>

<script>
import userDataAPI from '@/apis/userData';

const idColumn = 'mapplat_id';
export default {
  setup() {
    return {
      idColumn,
    };
  },
  props: {
    dataInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      curentCell: {},
      isShowEditInput: false,
      dataTable: {},
      loading: false,
      inputStyle: {
        top: '0px',
        left: '0px',
      },
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      this.loading = true;
      const result = await userDataAPI.tableList(this.dataInfo.dataUuid);
      this.loading = false;
      if (this.checkRes(result)) {
        this.dataTable = result.data.data;

        this.$nextTick(() => {
          const dataTable = this.$refs['data-table'];
          if (dataTable) dataTable.doLayout();
        });
      } else {
        this.$error('查询失败', result);
      }
    },
    async cellEdit(row, column, cell, event) {
      const { property } = column;
      if (property === this.idColumn) {
        this.$warning(`${this.idColumn}字段不允许编辑`);
        return;
      }
      this.isShowEditInput = true;
      const { x, y } = event;
      this.inputStyle.left = `${x - 150}px`;
      this.inputStyle.top = `${y + 12}px`;
      this.$nextTick(() => {
        const dataTableEdit = this.$refs['data-table-edit'];
        if (dataTableEdit) dataTableEdit.focus();
        this.curentCell = {
          columnValue: row[property],
          columnKey: property,
          columnId: row[this.idColumn],
        };
      });
    },
    async changeCellValue() {
      const { columnKey, columnId, columnValue } = this.curentCell;
      const params = {
        columnKey,
        columnId,
        columnValue,
      };
      const result = await userDataAPI.updateColumn(this.dataInfo.dataUuid, params);
      if (this.checkRes(result)) {
        const dataIndex = this.dataTable.rows.findIndex((val) => val[this.idColumn] === columnId);
        if (dataIndex !== -1) {
          this.dataTable.rows[dataIndex][columnKey] = columnValue;
        }
      } else {
        this.$error('修改失败', result);
      }
    },
    blurCellValue() {
      this.isShowEditInput = false;
      this.curentCell = {};
    },
  },
};
</script>

<style lang="scss">
.data-table {
  .table-header-name {
    color: #606266 !important;
  }
  .data-table-edit {
    position: fixed;
    z-index: 999;
    width: 280px;
  }
  .data-table-cell {
    height: 23px;
  }
  td {
    user-select: none !important;
    &:hover {
      border: 1px solid $primary;
      color: $primary;
    }
  }
  .el-table_1_column_1 {
    cursor: none;
    &:hover {
      border: 1px solid #EBEEF5 !important;
      color: $gray !important;
    }
  }
}
</style>
