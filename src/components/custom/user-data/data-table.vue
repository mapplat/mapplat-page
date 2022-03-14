<template>
  <div
    v-loading="loading"
    class="data-table"
    :class="{'data-table-private': isPrivate}"
  >
    <el-input
      v-show="isShowEditInput"
      ref="dataTableCellEditRef"
      v-model="curentCell.columnValue"
      class="data-table-edit"
      type="textarea"
      :autofocus="true"
      :style="inputStyle"
      :rows="2"
      @change="changeCellValue"
      @blur="blurCellValue"
    />
    <el-input
      v-show="isShowHeaderEditInput"
      ref="dataTableHeaderEditRef"
      v-model="curentHeader.columnValue"
      class="data-table-edit"
      type="textarea"
      :autofocus="true"
      :style="inputStyle"
      :rows="2"
      @change="changeColumnName"
      @blur="blurCellValue"
    />
    <el-table
      ref="dataTableRef"
      :data="dataTable.rows"
      :fit="true"
      :border="true"
      height="calc(100% - 60px)"
      style="width: 100%;"
      @cell-dblclick="cellDblclick"
    >
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
            <div class="table-header-name">
              {{ key }}
            </div>
            <k-icon
              v-if="isPrivate && key !== idColumn"
              class="cell-value-content-option"
              icon="icon-bianji"
              :size="20"
              @click="(event)=>{headerEdit(event,key)}"
            />
          </div>
          <div class="text-ellipsis table-header-cell-type">
            <div class="table-header-type">
              {{ value }}
            </div>
          </div>
        </template>
        <template #default="scope">
          <div
            :key="key"
            class="data-table-cell"
          >
            <div class="cell-value-content text-ellipsis">
              {{ scope.row[key] }}
            </div>
            <k-icon
              v-if="isPrivate && key !== idColumn"
              class="cell-value-content-option"
              icon="icon-bianji"
              :size="20"
              @click="(event)=>{cellEdit(event,scope.row[idColumn], key, scope.row[key])}"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="data-table-pagination">
      <el-pagination
        v-model:current-page="page"
        background
        :hide-on-single-page="true"
        layout="prev, pager, next, jumper"
        :page-size="limit"
        :total="dataTable.count"
        @current-change="getDataList"
      />
    </div>
  </div>
</template>
<script setup>
import { notify } from '@/utils';
import { checkRes, userDataAPI } from '@/apis';
import {
  nextTick, onMounted, ref,
} from 'vue';

const idColumn = 'mapplat_id';
const dataTableRef = ref();
const dataTableCellEditRef = ref();
const dataTableHeaderEditRef = ref();
const props = defineProps({
  isPrivate: {
    type: Boolean,
    default: false,
  },
  dataInfo: {
    type: Object,
    default: () => {},
  },
});

const loading = ref(false);
const isShowHeaderEditInput = ref(false);
const isShowEditInput = ref(false);
const page = ref(1);
const limit = ref(20);
const curentHeader = ref({});
const curentCell = ref({});
const dataTable = ref({});
const inputStyle = ref({
  top: '0px',
  left: '0px',
});

const getDataList = async () => {
  const params = {
    limit: limit.value,
    page: page.value,
  };
  loading.value = true;
  const result = await userDataAPI.tableList(props.dataInfo.dataUuid, params);
  loading.value = false;
  if (checkRes(result)) {
    dataTable.value = result.data.data;

    nextTick(() => {
      if (dataTableRef.value) dataTableRef.value.doLayout();
    });
  } else {
    notify.error($t('message.query_failed'), result);
  }
};
const cellEdit = async (event, columnId, columnKey, columnValue) => {
  if (!props.isPrivate) return;
  if (columnKey === idColumn) {
    notify.warning(`${idColumn} ${$t('message.column_is_not_allowed_to_be_edited')}`);
    return;
  }
  const { x, y } = event;
  isShowEditInput.value = true;
  inputStyle.value.left = `${x - 150}px`;
  inputStyle.value.top = `${y + 12}px`;
  nextTick(() => {
    const dataTableEdit = dataTableCellEditRef.value;
    if (dataTableEdit) dataTableEdit.focus();
    curentCell.value = {
      columnValue,
      columnKey,
      columnId,
    };
  });
};

const cellDblclick = async (row, column, cell, event) => {
  if (!props.isPrivate) return;
  const columnKey = column.property;
  if (columnKey === idColumn) {
    notify.warning(`${idColumn} ${$t('message.column_is_not_allowed_to_be_edited')}`);
    return;
  }
  const [columnValue, columnId] = [row[columnKey], row[idColumn]];
  cellEdit(event, columnId, columnKey, columnValue);
};
const changeCellValue = async () => {
  const { columnKey, columnId, columnValue } = curentCell.value;
  const params = {
    columnKey,
    columnId,
    columnValue,
  };
  const result = await userDataAPI.updateColumnValue(props.dataInfo.dataUuid, params);
  if (checkRes(result)) {
    const dataIndex = dataTable.value.rows.findIndex((val) => val[idColumn] === columnId);
    if (dataIndex !== -1) {
      dataTable.value.rows[dataIndex][columnKey] = columnValue;
    }
  } else {
    notify.error($t('message.update_failed'));
  }
};
const headerEdit = async (event, columnName) => {
  const { x, y } = event;
  isShowHeaderEditInput.value = true;
  inputStyle.value.left = `${x - 150}px`;
  inputStyle.value.top = `${y + 12}px`;
  nextTick(() => {
    const dataTableEdit = dataTableHeaderEditRef.value;
    if (dataTableEdit) dataTableEdit.focus();
    curentHeader.value = {
      columnValue: columnName,
      columnName,
    };
  });
};
const changeColumnName = async () => {
  const { columnName, columnValue } = curentHeader.value;
  const params = {
    columnName,
    reColumnName: columnValue,
  };
  const result = await userDataAPI.updateColumn(props.dataInfo.dataUuid, params);
  if (checkRes(result)) {
    getDataList();
  } else {
    notify.error($t('message.update_failed'));
  }
};
const blurCellValue = () => {
  isShowEditInput.value = false;
  isShowHeaderEditInput.value = false;
  curentCell.value = {};
  curentHeader.value = {};
};

onMounted(() => {
  getDataList();
});
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
