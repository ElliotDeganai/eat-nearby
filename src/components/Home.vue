<template>
    <div class="flex">
            <restaurant-list/>
            
            <br>
            <google-maps/>
    </div>
</template>

<script>
import RestaurantList from './RestaurantList.vue'
import GoogleMaps from './GoogleMaps.vue'
import store from '../store/index'
import Vuex from 'vuex'

export default {
  store: store,
  data() {
    return {
    }
  },
  components: {
    RestaurantList, GoogleMaps
  },
  methods: {
    ...Vuex.mapActions([
        'addRestaurant',
        'destroyRestaurant',
        'addRestaurantJson',
        'addRestaurants',
        'setRestaurants',
        'setRestaurantsAPI',
        'addRestaurantsJson',
        'loadJsonRestaurant',
        'changeRestaurantFocus',
        'clearRestaurantFocus',
        'clearRestaurants',
        'clearRestaurantsJson',
        'setStarFrom',
        'setStarTo',
        'incrementCounterRestaurants',
        'setScreenBound',
        'clearMarkers',
        'setMarkers',
        'setMarker',
        'setGoogle',
        'setMap',
        'setMapsCenter',
        'destroyAllMarkers',
        'destroyMarkersOutbound',
        'destroyMarker',
        'placeMarker',
        'addEventBoundChanged',
        'addEventClickMarker'
    ]),
  },
  computed: {
    ...Vuex.mapGetters([
        'restaurantsJson',
        'restaurant',
        'restaurantJson',
        'restaurantsCount',
        'restaurantsJsonCount',
        'restaurantsByRating',
        'restaurantsJsonByRating',
        'restaurantFocus',
        'starFrom',
        'starTo',
        'counterRestaurants',
        'screenBound',
        'google',
        'map',
        'markers',
        'mapsCenter',
    ]),
/*     restaurants: {
      get() {
        return this.$store.state.restaurants
      },
      set() {
        this.setRestaurantsAPI()
      }
      }
    ,
    coords: {
      get() {
      },
      set() {
      }
    }*/
  }, 
  mounted(){
/*     let self = this
    self.setRestaurantsAPI() */


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