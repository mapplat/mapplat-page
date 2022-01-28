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
      v-model="input"
      :class="{'el-input-line-border': isLineBorder, 'k-input-error': !!errorTip}"
      :placeholder="placeholder"
      :type="type"
      :show-password="showPassword"
      @keyup.enter="$emit('keyupEnter')"
      @blur="$emit('blur')"
      @input="validate"
    >
      <template #suffix>
        <slot name="suffix"></slot>
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

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
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
    type: {
      type: String,
      default: 'text',
    },
    isLineBorder: {
      type: Boolean,
      default: false,
    },
    round: {
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
  },
  setup(props) {
    const showPassword = props.type === 'password';

    let inputPositionClass = 'k-input-label-left';
    switch (props.position) {
      case 'top':
        inputPositionClass = 'k-input-label-top';
        break;
      case 'left':
        inputPositionClass = 'k-input-label-left';
        break;
      case 'right':
        inputPositionClass = 'k-input-label-right';
        break;
      default:
        break;
    }
    return {
      showPassword,
      inputClass: {
        [inputPositionClass]: true,
      },
    };
  },
  data() {
    return {
      errorTip: null,
      input: this.modelValue,
    };
  },
  methods: {
    validate() {
      let errorTip = null;
      if (this.rule && this.rule.format) {
        const { format, msg } = this.rule;
        if (!format.test(this.input)) {
          errorTip = msg || 'input illegal';
        }
      }

      this.errorTip = errorTip;
      this.$emit('update:modelValue', this.input);
      return errorTip;
    },
  },
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
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  .k-input-error {
    .el-input__inner {
      border-color: $red;
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
