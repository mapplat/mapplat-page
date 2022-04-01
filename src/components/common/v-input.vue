<template>
  <div
    class="k-input"
  >
    <div
      v-if="label"
      class="k-input-label"
      :style="{width: labelWidth}"
    >
      {{ label }}
    </div>
    <el-input
      v-bind="$attrs"
      :class="{'el-input-line-border': isLineBorder, 'k-input-error': !!tips}"
    >
      <template #suffix>
        <slot name="suffix" />
      </template>
    </el-input>
    <div
      v-if="tips"
      class="k-input-error-tip"
    >
      {{ tips }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  tips: String,
  isLineBorder: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: 'top',
  },
  labelWidth: {
    type: String,
    default: '100%',
  },
});
</script>

<style lang="scss">
.k-input {
  position: relative;
  .k-input-label {
    font-size: 1.2rem;
    padding: 4px 0;
  }
  .el-input-line-border {
    .el-input__inner {
      border-radius: 0;
      box-shadow: 0 1px 0;
    }
  }
  .k-input-error {
    .el-input__inner {
      box-shadow: 0 1px 0 $red;
    }
  }
  .k-input-error-tip {
    position: absolute;
    left: 0px;
    font-size: 12px;
    color: $red;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
