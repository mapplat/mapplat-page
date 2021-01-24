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
    @change="changeHandler">
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
    value: {
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
  data() {
    return {
      errorTip: null,
      input: this.value,
    };
  },
  methods: {
    changeHandler(val) {
      console.log(this.rule);
      if (this.rule && this.rule.reg) {
        const { reg, tip } = this.rule;
        if (!reg.test(val)) {
          this.errorTip = tip || 'input illegal';
          return;
        }
      }
      this.errorTip = null;
      this.$emit('update:value', val);
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
