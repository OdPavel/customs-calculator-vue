<template>
  <div id="app">
    <wrapper/>
  </div>
</template>

<script>
import Wrapper from "@/components/Wrapper";

export default {
  name: 'App',
  components: {
    Wrapper
  }
}
</script>

<style lang="scss">
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
