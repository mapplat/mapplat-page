<template>
  <div class="data-table" :class="{'data-table-private': isPrivate}" v-loading="loading">
    <el-input
      v-show="isShowEditInput"
      ref="data-table-cell-edit"
      class="data-table-edit"
      type="textarea"
      :autofocus="true"
      :style="inputStyle"
      :rows="2"
      @change="changeCellValue"
      @blur="blurCellValue"
      v-model="curentCell.columnValue">
    </el-input>
    <el-input
      v-show="isShowHeaderEditInput"
      ref="data-table-header-edit"
      class="data-table-edit"
      type="textarea"
      :autofocus="true"
      :style="inputStyle"
      :rows="2"
      @change="changeColumnName"
      @blur="blurCellValue"
      v-model="curentHeader.columnValue">
    </el-input>
    <el-table
      ref="data-table"
      :data="dataTable.rows"
      size="mini"
      :fit="true"
      :border="true"
      height="calc(100% - 60px)"
      @cell-dblclick="cellDblclick"
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
          <div class="text-ellipsis table-header-cell-name">
            <div class="table-header-name">{{key}}</div>
            <k-icon @click="(event)=>{headerEdit(event,key)}" class="cell-value-content-option" v-if="isPrivate && key !== idColumn" icon="icon-bianji" :size="20"></k-icon>
          </div>
          <div class="text-ellipsis table-header-cell-type">
            <div class="table-header-type">{{value}}</div>
          </div>
        </template>
        <template #default="scope">
          <div :key="key" class="data-table-cell">
            <div class="cell-value-content text-ellipsis">{{scope.row[key]}}</div>
            <k-icon class="cell-value-content-option" v-if="isPrivate && key !== idColumn" @click="(event)=>{cellEdit(event,scope.row[this.idColumn], key, scope.row[key])}" icon="icon-bianji" :size="20"></k-icon>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="data-table-pagination">
      <el-pagination
        background
        :hide-on-single-page="true"
        v-model:current-page="page"
        @current-change="getDataList"
        layout="prev, pager, next, jumper"
        :page-size="limit"
        :total="dataTable.count">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import userDataAPI from '@/apis/userData';

const idColumn = 'mapplat_id';
export default {
  inject: ['isPrivate'],
  setup() {
    return {
      idColumn,
    };
  },
  props: {
    isPrivate: {
      type: Boolean,
      default: false,
    },
    dataInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      page: 1,
      limit: 20,
      curentHeader: {},
      isShowHeaderEditInput: false,
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
    this.getDataList();
  },
  methods: {
    async getDataList() {
      const params = {
        limit: this.limit,
        page: this.page,
      };
      this.loading = true;
      const result = await userDataAPI.tableList(this.dataInfo.dataUuid, params);
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
    async cellDblclick(row, column, cell, event) {
      if (!this.isPrivate) return;
      const columnKey = column.property;
      if (columnKey === this.idColumn) {
        this.$warning(`${this.idColumn}字段不允许编辑`);
        return;
      }
      const [columnValue, columnId] = [row[columnKey], row[this.idColumn]];
      this.cellEdit(event, columnId, columnKey, columnValue);
    },
    async cellEdit(event, columnId, columnKey, columnValue) {
      if (!this.isPrivate) return;
      if (columnKey === this.idColumn) {
        this.$warning(`${this.idColumn}字段不允许编辑`);
        return;
      }
      const { x, y } = event;
      this.isShowEditInput = true;
      this.inputStyle.left = `${x - 150}px`;
      this.inputStyle.top = `${y + 12}px`;
      this.$nextTick(() => {
        const dataTableEdit = this.$refs['data-table-cell-edit'];
        if (dataTableEdit) dataTableEdit.focus();
        this.curentCell = {
          columnValue,
          columnKey,
          columnId,
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
      const result = await userDataAPI.updateColumnValue(this.dataInfo.dataUuid, params);
      if (this.checkRes(result)) {
        const dataIndex = this.dataTable.rows.findIndex((val) => val[this.idColumn] === columnId);
        if (dataIndex !== -1) {
          this.dataTable.rows[dataIndex][columnKey] = columnValue;
        }
      } else {
        this.$error('修改失败');
      }
    },
    async headerEdit(event, columnName) {
      const { x, y } = event;
      this.isShowHeaderEditInput = true;
      this.inputStyle.left = `${x - 150}px`;
      this.inputStyle.top = `${y + 12}px`;
      this.$nextTick(() => {
        const dataTableEdit = this.$refs['data-table-header-edit'];
        if (dataTableEdit) dataTableEdit.focus();
        this.curentHeader = {
          columnValue: columnName,
          columnName,
        };
      });
    },
    async changeColumnName() {
      const { columnName, columnValue } = this.curentHeader;
      const params = {
        columnName,
        reColumnName: columnValue,
      };
      const result = await userDataAPI.updateColumn(this.dataInfo.dataUuid, params);
      if (this.checkRes(result)) {
        this.getDataList();
      } else {
        this.$error('修改失败');
      }
    },
    blurCellValue() {
      this.isShowEditInput = false;
      this.isShowHeaderEditInput = false;
      this.curentCell = {};
      this.curentHeader = {};
    },
  },
};
</script>

<style lang="scss">
.data-table {
  .table-header-cell-name {
    color: #606266;
    display: flex;
    justify-content: space-between;
    .cell-value-content-option {
      display: none;
    }
  }

  .data-table-edit {
    position: fixed;
    z-index: 999;
    width: 280px;
  }
  .data-table-cell {
    height: 23px;
    display: flex;
    justify-content: space-between;
  }

  .data-table-pagination {
    display: flex;
    justify-content: center;
    bottom: 0;
    width: 100%;
    margin: 12px 0;
  }

}
.data-table-private {
  td {
    cursor: pointer;
    user-select: none !important;
    .cell-value-content-option {
      display: none;
    }
    &:hover {
      color: $primary;
      .cell-value-content-option {
        display: inline-block;
      }
    }
  }
  .el-table_1_column_1 {
    cursor: none;
    &:hover {
      color: $gray !important;
    }
  }

  .table-header-cell-name {
    cursor: pointer;
    &:hover {
      color: $primary;
      .cell-value-content-option {
        display: inline-block;
      }
    }
  }
}
</style>
