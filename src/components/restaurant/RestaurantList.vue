<template>
<div class="restaurants-list h-full w-1/3">
  <div v-if="this.restaurantFocus === null || this.restaurantFocus === undefined" class="">
    <form class="w-full max-w-lg flex p-8">
          <div class="flex">
          <label class="tracking-wide font-bold mb-2" for="filter-from">
            Note:
          </label>
          <div class="filter-box-restaurant-list">
            <select v-model="starFrom" class="filter-restaurant-list" id="filter-from">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <div class="filter-arrow-box-restaurant-list">
              <svg class="filter-arrow-restaurant-list" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

          <div class="flex">
          <label class="tracking-wide font-bold mb-2" for="filter-to">
            à
          </label>
          <div class="filter-box-restaurant-list">
            <select v-model="starTo" class="filter-restaurant-list" id="filter-to">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <div class="filter-arrow-box-restaurant-list">
              <svg class="filter-arrow-restaurant-list" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
    </form>
    <div>
        <ul>
            <div>
              <li class="item-list flex content-around"  v-bind:key="restaurant.name" v-for="restaurant in this.list">
                <div class="w-1/2 p-4">
                  <img class="object-cover h-36 w-36 shadow-lg" v-bind:src="restaurant.streetViewUrl"/>
                </div>
                <div class="flex flex-col justify-start p-4">
                  <div><h3 class="font-bold text-base">{{ restaurant.name }}</h3></div>
                  <div><p class="text-xs">{{ restaurant.city}} {{ restaurant.zip_code}}</p></div>
                  <div><p class="pt-8">{{ restaurant.averageRating }}</p></div>
                  <div class="flex">
                    <div v-for="i in 5" class="focus:outline-none" :class="{ 'mr-1': i < 5 }">
                      <svg class="block h-4 w-4 shadow-lg" :class="[ 2 >= i ? 'text-blue': 'text-grey']" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                    </div>
                  </div>
                </div>
              </li>
            </div>
        </ul>
    </div>
  </div>
  <div v-if="this.restaurantFocus !== null && this.restaurantFocus !== undefined">

  <div class="relative">
    <div>
      <img class="w-full object-contain" v-bind:src="this.restaurantFocus.streetViewUrl"/>
    </div>

    <div>
      <button class="arrow-back" v-on:click="this.clearRestaurantFocus">
        <svg class="text-white block h-12 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path class="heroicon-ui text-white" d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"/></svg>
      </button>
      
    </div>
  <div>
    <button class="restaurant-detail-link restaurant-detail-button" @click="this.setModeMaps">
      <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path class="heroicon-ui" d="M6 2h9a1 1 0 0 1 .7.3l4 4a1 1 0 0 1 .3.7v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm9 2.41V7h2.59L15 4.41zM18 9h-3a2 2 0 0 1-2-2V4H6v16h12V9zm-2 7a1 1 0 0 1-1 1H9a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1zm0-4a1 1 0 0 1-1 1H9a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1zm-5-4a1 1 0 0 1-1 1H9a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1z"/>
      </svg>
    </button>
  </div>
  </div>
  
  <div class="">
  <div class="text-left text-xs p-4">
    <div class="font-bold text-lg"> {{ this.restaurantFocus.name }} </div>
      <p class=""> {{ this.restaurantFocus.address }} </p>
      <p class=""> {{ this.restaurantFocus.zip_code }} {{ this.restaurantFocus.city }} </p>
      <p class=""> {{ this.restaurantFocus.averageRating }} </p>
      <div class="flex">
        <div v-for="i in 5" class="focus:outline-none" :class="{ 'mr-1': i < 5 }">
          <svg class="block h-4 w-4 shadow-lg" :class="[ 2 >= i ? 'text-blue': 'text-grey']" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
        </div>
      </div>
  </div>

    
      <ul class="text-left">
        <h2 class="font-bold pl-4">Les avis</h2>
        <li class="item-list p-4"  v-bind:key="restaurantUnic.name" v-for="restaurantUnic in this.restaurantFocus.ratings">
          <h2 class=""> {{ restaurantUnic.author }} </h2>
          <div class="text-xs">
          <p> {{ restaurantUnic.comment }} </p>
          <p> {{ restaurantUnic.star }} </p>
          <div class="flex">
            <div v-for="i in 5" class="focus:outline-none" :class="{ 'mr-1': i < 5 }">
              <svg class="block h-4 w-4 shadow-lg" :class="[ 2 >= i ? 'text-blue': 'text-grey']" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            </div>
          </div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</div>
</template>

<script>
//import store from './RestaurantsStore'
import { createNamespacedHelpers } from 'vuex'
import store from '../../store/index'
import Vuex from 'vuex'
import { setTimeout } from 'timers';
import Restaurant from '../../entity/restaurant.js';
import Rating from '../../entity/rating';

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
      methods: {
        ...Vuex.mapActions([
            'clearRestaurantFocus',
            'setStarFrom',
            'setStarTo',
            'setModeMaps'
        ])     
      },
      mounted(){

      }, 
      computed: {
        ...Vuex.mapGetters([
            'starFrom',
            'starTo'
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
  .arrow-back{
     position: absolute;
     top: 5px;
     left: 15px;
  }
  .restaurant-detail-link{
     position: absolute;
     bottom: -20px;
     right: 15px;   
  }
</style>