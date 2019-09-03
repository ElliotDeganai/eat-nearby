<template>
  <div class="restaurant bg-gray-200 rounded-lg">
    <ul>
      <li class="item-list"  v-bind:key="restaurant.name" v-for="restaurant in this.restaurants">
      <h3>{{ restaurant.name }}</h3>
      <p>{{ restaurant.address}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import store from './RestaurantsStore'
import Vuex from 'vuex'

export default {
    store: store,
    data(){
        return{
        }
    },
      mounted () {
        this.loadJsonRestaurant()
      },
      methods: {
        ...Vuex.mapActions([
            'addRestaurant',
            'addRestaurants',
            'loadJsonRestaurant'
        ]),
      },
      computed: {
        ...Vuex.mapGetters([
            'restaurants',
            'restaurantsCount'
        ]),
      }
}
</script>

<style>

</style>