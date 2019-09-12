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
              <li class="item-list flex p-8"  v-bind:key="restaurant.name" v-for="restaurant in filteredRestaurants(this.starFrom, this.starTo)">
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
    <h1> {{ this.restaurantFocus[0].name }} </h1>
    <p> {{ this.restaurantFocus[0].address }} </p>
    <p> {{ this.restaurantFocus[0].averageRating }} </p>
    <p>  </p>
    <div>
      <img v-bind:src="restaurantFocus[0].streetViewUrl"/>
    </div>
    <div>
      <ul>
        <li class="item-list p-8"  v-bind:key="restaurantUnic.name" v-for="restaurantUnic in this.restaurantFocus[0].ratings">
          <h4> {{ restaurantUnic.author }} </h4>
          <p> {{ restaurantUnic.comment }} </p>
          <p> {{ restaurantUnic.star }} </p>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import store from './RestaurantsStore'
import Vuex from 'vuex'
import { setTimeout } from 'timers';

export default {
    store: store,
    data(){
        return{
        }
    },
      //mounted () {
        //this.loadJsonRestaurant()
      //},
      methods: {
        ...Vuex.mapActions([
            'addRestaurant',
            'addRestaurants',
            'loadJsonRestaurant',
            'changeRestaurantFocus',
            'clearRestaurantFocus',
            'setStarFrom',
            'setStarTo'
        ]),
        filteredRestaurants(starFrom, starTo){
            if(starFrom <= starTo){
                return this.restaurantsByRating(starFrom, starTo)
            }else{
                return this.restaurants
            }
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
        starFrom: {
          get() {
            return this.$store.state.starFrom
          },
          set(value) {
            this.setStarFrom(value)
          }
        },
        starTo: {
          get() {
            return this.$store.state.starTo
          },
          set(value) {
            this.setStarTo(value)
          }
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