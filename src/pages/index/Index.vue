<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <a-button type="primary"
    @click="info"
    >
      Primary
    </a-button>
    <el-button type="primary"
    @click="info"
    >
      Primary
    </el-button>
  </div>
  <router-view/>
</template>
<script>
export default {
  methods: {
    info() {
      console.log(this);
      // this.$message.info('hello');
      this.$message.success({
        message: '恭喜你，这是一条成功消息',
        type: 'success',
      });
    },
  },
};
</script>
<style lang="scss">

</style>
