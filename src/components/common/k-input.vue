<template>
  <div class="k-input">
    <div class="k-input-label">
      {{label}}
    </div>
    <el-input :placeholder="placeholder" v-model="input"  @change="changeHandler"></el-input>
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
    padding: $s-padding 0;
  }
}
</style>
