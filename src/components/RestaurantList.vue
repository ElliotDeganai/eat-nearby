<template>
<div class="restaurants-list bg-gray-200 rounded-lg h-full">
  <div v-if="this.restaurantFocus === null || this.restaurantFocus === undefined" class="">
    <form class="w-full max-w-lg flex p-8">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="filter-from">
            From
          </label>
          <div class="relative">
            <select v-model="starFrom" class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="filter-from">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="filter-to">
            To
          </label>
          <div class="relative">
            <select v-model="starTo" class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="filter-to">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
    </form>
    <div>
        <ul>
            <div>
              <li class="item-list flex p-8"  v-bind:key="restaurant.name" v-for="restaurant in this.list">
                <div>
                  <h3>{{ restaurant.name }}</h3>
                  <p>{{ restaurant.address}}</p>
                  <p>{{ restaurant.averageRating }}</p>
                </div>
                <div>
                  <img v-bind:src="restaurant.streetViewUrl"/>
                </div>
              </li>
            </div>
        </ul>
    </div>
  </div>
  <div v-if="this.restaurantFocus !== null && this.restaurantFocus !== undefined">
    <div>
      <button v-on:click="this.clearRestaurantFocus">Revenir à la liste</button>
    </div>
  <div>
    <router-link :to="{name: 'restaurant', params: {id: this.restaurantFocus.id}}" class="">Voir les détails du restaurant</router-link>
  </div>
    <h1> {{ this.restaurantFocus.name }} </h1>
    <p> {{ this.restaurantFocus.address }} </p>
    <p> {{ this.restaurantFocus.averageRating }} </p>
    <p>  </p>
    <div>
      <img v-bind:src="this.restaurantFocus.streetViewUrl"/>
    </div>
    <div>
      <ul>
        <h3>Commentaires</h3>
        <li class="item-list p-8"  v-bind:key="restaurantUnic.name" v-for="restaurantUnic in this.restaurantFocus.ratings">
          <h4 > {{ restaurantUnic.author }} </h4>
          <p> {{ restaurantUnic.comment }} </p>
          <p> {{ restaurantUnic.star }} </p>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
//import store from './RestaurantsStore'
import { createNamespacedHelpers } from 'vuex'
import store from '../store/index'
import Vuex from 'vuex'
import { setTimeout } from 'timers';
import Restaurant from '../entity/restaurant.js';
import Rating from '../entity/rating';

export default {
    store: store,
    props: ['restaurantsList', 'selectedRestaurant'],
    data(){
        return{
          newPseudo: '',
          newComment: '',
          newRating: '',
          list: [],
          restaurantFocus: null
        }
    },
      //mounted () {
        //this.loadJsonRestaurant()
      //},
      methods: {
        ...Vuex.mapActions([
            'addRestaurant',
            'destroyRestaurant',
            'addRestaurantJson',
            'addRestaurants',
            'setRestaurants',
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
            'setMapsCenter',
            'destroyAllMarkers',
            'destroyMarkersOutbound',
            'destroyMarker'
        ]),      
      },
      mounted(){

      }, 
      computed: {
        ...Vuex.mapGetters([
            //'restaurants',
            'restaurantsJson',
            'restaurant',
            'restaurantJson',
            'restaurantsCount',
            'restaurantsJsonCount',
            'restaurantsByRating',
            'restaurantsJsonByRating',
            //'restaurantFocus',
            'starFrom',
            'starTo',
            'counterRestaurants',
            'screenBound',
            'google',
            'markers',
            'mapsCenter',
        ]),
        starFrom: {
          get() {
            return this.$store.state.starFrom
          },
          set(value) {
            let self = this
            this.setStarFrom(Number(value))
            //this.setRestaurants()
        }
          }
        ,
        starTo: {
          get() {
            return this.$store.state.starTo
          },
          set(value) {
            this.setStarTo(Number(value))
            //this.setRestaurants()
          }
        }     
      },
      watch: {
        restaurantsList: function (value) {
          this.list = this.restaurantsList
        },
        selectedRestaurant: function (value) {
          this.restaurantFocus = this.selectedRestaurant
        }
      }
    }
</script>
<style>
  .restaurants-list{
    height: 100vh;
    overflow: auto;
  }
</style>