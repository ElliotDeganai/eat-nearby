<template>
  <div class="restaurants-list h-full w-3/4 sm:w-3/4 md:w-1/3 lg:w-2/5 scrolling-auto overflow-auto">
  <div class="relative">
    <div v-if="this.restaurantFocus === null || this.restaurantFocus === undefined" class>
      <form class="w-full flex flex-wrap">
        <div class="flex pl-4 sm:pl-2 md:pl-2 lg:pl-0 xl:pl-0">
          <label class="tracking-wide font-bold mb-2 text-xs pt-3 sm:text-xs sm:p-2 sm:pt-3 sm:pr-0  md:text-xs md:p-2 md:pt-3 lg:p-2 lg:text-base " for="filter-from">Note:</label>
          <div class="filter-box-restaurant-list  ml-4 py-2 mx-1 sm:mx-1 sm:py-2 sm:w-12 md:w-16 md:mx-2 md:py-2 lg:w-16 lg:mx-4"> 
            <select v-model="starFrom" class="filter-restaurant-list  sm:pl-1 md:pl-2 lg:pl-4" id="filter-from">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <div class=" pointer-events-none absolute top-0 right-0 flex items-center px-2 py-2 text-gray-700">
              <svg
                class="fill-current h-6 w-4  border-l border-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex pl-8 sm:pl-8 md:pl-8 lg:pl-0 xl:pl-0">
          <label class="tracking-wide font-bold mb-2 text-xs pt-3 sm:text-xs sm:p-2 sm:pt-3 md:text-xs md:pt-3 lg:text-base lg:p-2" for="filter-to">à</label>
          <div class="filter-box-restaurant-list ml-6 py-2 mx-1 sm:mx-1 sm:py-2 sm:w-12 md:w-16 md:mx-2 md:py-2 lg:w-16 lg:mx-4">
            <select v-model="starTo" class="filter-restaurant-list sm:pl-2 md:pl-2 lg:pl-4" id="filter-to">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <div class=" pointer-events-none absolute top-0 right-0 flex items-center px-2 py-2 text-gray-700">
              <svg
                class="fill-current h-6 w-4  border-l border-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </form>
      <div>
        <ul>
          <div v-bind:key="restaurant.id" v-for="restaurant in this.list">
            <button @click="setFocus(restaurant.id)">
            <li
              class="item-list flex content-around flex-wrap sm:flex-wrap md:flex-wrap"
            >
              <div class="p-4 sm:w-full md:w-full lg:w-1/2">
                <img class="object-cover h-36 w-36 shadow-lg" v-bind:src="restaurant.streetViewUrl" />
              </div>
              <div class="flex flex-col justify-start text-left p-4">
                <div>
                  <h3 class="font-bold text-base">{{ restaurant.name }}</h3>
                </div>
                <div>
                  <p class="text-xs pt-2 text-gray-600">{{ restaurant.city}} {{ restaurant.zip_code}}</p>
                </div>
                <rating-stars :rating="restaurant.averageRating" class="pt-4"/>
              </div>
            
            </li>
            </button>
          </div>
        </ul>
      </div>
    </div>
    <div v-if="this.restaurantFocus !== null && this.restaurantFocus !== undefined">
      <div class="relative">
        <div>
          <img class="w-full object-contain" v-bind:src="this.restaurantFocus.streetViewUrl" />
        </div>

        <div>
          <button class="arrow-back" v-on:click="this.clearRestaurantFocus">
            <svg
              class="text-white block lg:h-12 lg:w-12"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path
                class="heroicon-ui text-white"
                d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
              />
            </svg>
          </button>
        </div>
        <div>
          <button class="" @click="this.setModeMaps">
            <svg class="w-10 h-10 p sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 absolute right-0 bottom-0 mr-4 text-indigo-600 bg-white rounded-full shadow-lg" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2V9H9v2zm0-6v2h2V5H9z"/></svg>
          </button>
        </div>
      </div>

      <div class>
        <div class="text-left text-xs p-4">
          <div class="font-bold text-base sm:text-base md:text-base lg:text-lg">{{ this.restaurantFocus.name }}</div>
          <p class="pt-2 text-xs sm:text-xs md:text-sm lg:text-base">{{ this.restaurantFocus.address }}</p>
          <p class="pt-2 text-xs sm:text-xs md:text-sm lg:text-base">{{ this.restaurantFocus.zip_code }} {{ this.restaurantFocus.city }}</p>
          <rating-stars :rating="this.restaurantFocus.averageRating" class="pt-4"/>
        </div>

        
          <h2 class="font-bold pl-4 text-base text-left">Les avis</h2>

          <div class="" v-if="this.restaurantFocus.ratings.length !== 0">
          <ul class="text-left">
          <li
            class="item-list p-4 text-xs sm:text-xs md:text-sm lg:text-base"
            v-bind:key="restaurantUnic.id"
            v-for="restaurantUnic in this.restaurantFocus.ratings"
          >
            <h2 class="text-base text-xs sm:text-sm md:text-sm lg:text-base">{{ restaurantUnic.author }}</h2>
            <div class="text-xs sm:text-sm md:text-sm lg:text-base">
              <rating-stars :rating="restaurantUnic.star" class="pt-4"/>
              <p class="pt-2 text-xs sm:text-xs md:text-sm lg:text-base">{{ restaurantUnic.comment }}</p>
            </div>
          </li>
        </ul>
          </div>
           <div class="text-base text-left p-8" v-else>Il n'y a pas encore de commentaires pour ce restaurant...</div>
      </div>
    </div>

<!--   <div class="absolute top-0 h-full w-2 bg-gray-600 shadow-2xl right-0 z-50" ></div> -->


  </div>
  </div>
</template>

<script>
//import store from './RestaurantsStore'
import { createNamespacedHelpers } from "vuex";
import store from "../../store/index";
import Vuex from "vuex";
import { setTimeout } from "timers";
import Restaurant from "../../entity/restaurant.js";
import Rating from "../../entity/rating";
import RatingStars from "./../RatingStars.vue";

export default {
  store: store,
  props: ["restaurantsList", "selectedRestaurant"],
  data() {
    return {
      newPseudo: "",
      newComment: "",
      newRating: "",
      list: [],
      restaurantFocus: null
    };
  },
  components: {
    RatingStars
  },
  methods: {
    ...Vuex.mapActions([
      "clearRestaurantFocus",
      "changeRestaurantFocusById",
      "setStarFrom",
      "setStarTo",
      "setModeMaps"
    ]),
    setFocus(id){
      this.changeRestaurantFocusById(id);
    }
  },
  mounted() {},
  computed: {
    ...Vuex.mapGetters(["starFrom", "starTo"]),
    starFrom: {
      get() {
        return this.$store.state.starFrom;
      },
      set(value) {
        let self = this;
        this.setStarFrom(Number(value));
        //this.setRestaurants()
      }
    },
    starTo: {
      get() {
        return this.$store.state.starTo;
      },
      set(value) {
        this.setStarTo(Number(value));
        //this.setRestaurants()
      }
    }
  },
  watch: {
    restaurantsList: function(value) {
      this.list = this.restaurantsList;
    },
    selectedRestaurant: function(value) {
      this.restaurantFocus = this.selectedRestaurant;
    }
  }
};
</script>
<style>
.restaurants-list {
  height: 100vh;
  overflow: auto;
}
.arrow-back {
  position: absolute;
  top: 5px;
  left: 15px;
}
.restaurant-detail-link {
  position: absolute;
  bottom: -20px;
  right: 15px;
}
</style>