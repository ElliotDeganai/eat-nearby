<template>
    <div class="flex">
            <restaurant-list/>
            
            <br>
            <google-maps/>
    </div>
</template>

<script>
import RestaurantList from './RestaurantList.vue'
import Restaurant from './Restaurant.vue'
import GoogleMaps from './GoogleMaps.vue'

export default {
  components: {
    RestaurantList, GoogleMaps, Restaurant
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