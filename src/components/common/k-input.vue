<template>
  <div class="k-input">
    <div class="k-input-label">
      {{label}}
    </div>
    <el-input
    :class="{'el-input-line-border': isLineBorder, 'k-input-error': !!errorTip}"
    :placeholder="placeholder"
    :type="type"
    v-model="input"
    :show-password="showPassword"
    @keyup.enter="$emit('keyupEnter')"
    @input="validate">
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
    </el-input>
    <div class="k-input-error-tip" v-if="errorTip">{{ errorTip }}</div>
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
      type: String,
      default: null,
    },
    rule: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: 'small',
    },
    type: {
      type: String,
      default: 'text',
    },
    isLineBorder: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const showPassword = props.type === 'password';
    return {
      showPassword,
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
}
</style>
