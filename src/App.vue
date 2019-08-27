<template>
  <div id="app">
    <h1>Eat Nearby</h1>
    <restaurant-list/>
    <br>
    <google-maps/>
  </div>
</template>

<script>
import RestaurantList from './components/RestaurantList.vue'
import GoogleMaps from './components/GoogleMaps.vue'

export default {
  name: 'app',
  components: {
    RestaurantList, GoogleMaps
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
