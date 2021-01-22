<template>
  <div class="k-input">
    <div class="k-input-label">
      {{label}}
    </div>
    <el-input
    :class="{'el-input-line-border': isLineBorder}"
    :placeholder="placeholder"
    v-model="input"
    @change="changeHandler">
    <slot></slot>
    </el-input>
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
      if (this.rule) {
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
  .k-input-label {
    font-size: 1.4rem;
    padding: 6px 0;
  }
  .el-input-line-border {
    .el-input__inner {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
    }
  }
}
</style>
