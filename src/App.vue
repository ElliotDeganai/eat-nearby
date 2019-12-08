<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
this.$root.log = function log() {
  for (let i = 0; i < arguments.length; i += 1) {
    if (typeof (arguments[i]) === 'object') {
      try {
        arguments[i] = JSON.parse(JSON.stringify(arguments[i]));
      } catch (e) {
        console.error(e);
      }
    }
  }
  console.log(...arguments);
};
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
