<template>
  <div class="restaurant">
    <div class="carousel-restaurant">
      <img v-bind:src="this.restaurantFocus[0].streetViewUrl"/>
    </div>
    <h1 class="title-restaurant"> {{ this.restaurantFocus[0].name }} </h1>
    <div class="info-card">
      <ul>
        <li> Note moyenne: {{ this.restaurantFocus[0].averageRating }} </li>
        <li> Adresse: {{ this.restaurantFocus[0].address }} </li>
      </ul>
    </div>
    <p class="description-restaurant">
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    </p>
    <div class="ratings">
      <ul>
        <li class="item-list p-8"  v-bind:key="rating.name" v-for="rating in this.restaurantFocus[0].ratings">
          <h4> {{ rating.author }} </h4>
          <p> {{ rating.comment }} </p>
          <p> {{ rating.star }} </p>
        </li>
      </ul>
    </div>
    <div><router-link :to="{name: 'root'}" class="">Retour à la liste</router-link></div>
  </div>
</template>

<script>
import Restaurant from '../entity/restaurant.js';
import store from '../store/index'
import Vuex from 'vuex'

export default {
  store: store,
    data(){
        return{
        }
    },
    computed: {
      ...Vuex.mapGetters([
          'restaurants',
          'restaurant',
          'restaurantsCount',
          'restaurantsByRating',
          'restaurantFocus',
          'starFrom',
          'starTo'
      ]),
    }
}
</script>

<style>

</style>