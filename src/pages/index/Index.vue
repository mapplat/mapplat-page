<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <div>
    {{$user}}
  </div>
  <router-view/>
</template>
<script>
export default {};
</script>
<style lang="scss">

</style>
