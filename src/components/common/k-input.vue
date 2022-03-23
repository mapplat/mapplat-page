<template>
  <div
    class="k-input"
    :class="inputClass"
  >
    <div
      v-if="label"
      class="k-input-label"
      :style="{width: labelWidth}"
    >
      {{ label }}
    </div>
    <el-input
      :model-value="modelValue"
      :class="{'el-input-line-border': isLineBorder, 'k-input-error': !!errorTip}"
      v-bind="$attrs"
      @input="handlerInput"
    >
      <template #suffix>
        <slot name="suffix" />
      </template>
    </el-input>
    <div
      v-if="errorTip"
      class="k-input-error-tip"
    >
      {{ errorTip }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Number, Object, Array],
    default: null,
  },
  rule: {
    type: Object,
    default: () => {},
  },
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

const errorTip = ref('');
const inputClass = computed(() => `k-input-label-${props.position}`);

const handlerInput = (value) => {
  errorTip.value = '';
  if (props.rule && props.rule.format) {
    const { format, msg } = props.rule;
    if (!format.test(value)) {
      errorTip.value = msg || 'input illegal';
    }
  }
  emit('update:modelValue', value);
};
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

  .el-input__suffix {
    display: flex;
    align-items: center;
  }
}
.k-input-label-left {
  display: flex;
  justify-content: space-between;
}
.k-input-label-left {
  display: flex;
  justify-content: space-between;
}
</style>
