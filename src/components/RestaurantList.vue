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
              <li class="item-list flex p-8"  v-bind:key="restaurant.name" v-for="restaurant in this.filteredRestaurants(this.starFrom, this.starTo)">
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
    <router-link :to="{name: 'restaurant'}" class="">Voir les détails du restaurant</router-link>
  </div>
    <h1> {{ this.restaurantFocus[0].name }} </h1>
    <p> {{ this.restaurantFocus[0].address }} </p>
    <p> {{ this.restaurantFocus[0].averageRating }} </p>
    <p>  </p>
    <div>
      <img v-bind:src="this.restaurantFocus[0].streetViewUrl"/>
    </div>
    <div>
      <ul>
        <h3>Commentaires</h3>
        <li class="item-list p-8"  v-bind:key="restaurantUnic.name" v-for="restaurantUnic in this.restaurantFocus[0].ratings">
          <h4 > {{ restaurantUnic.author }} </h4>
          <p> {{ restaurantUnic.comment }} </p>
          <p> {{ restaurantUnic.star }} </p>
        </li>
        <li class="newComment">
          <div><input v-model="newPseudo" type="text" placeholder="Entrez votre pseudo..."/></div>
          <div><input v-model="newComment" type="textarea" placeholder="Entrez votre commentaire..."/></div>
          <div><select v-model="newRating" class="" id="">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          </div>
          <div>
            <button v-on:click.prevent="addReview()">Ajouter un commentaire</button>
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
import store from '../store/index'
import Vuex from 'vuex'
import { setTimeout } from 'timers';
import Restaurant from '../entity/restaurant.js';
import Rating from '../entity/rating';

export default {
    store: store,
    data(){
        return{
          newPseudo: '',
          newComment: '',
          newRating: ''
        }
    },
      //mounted () {
        //this.loadJsonRestaurant()
      //},
      methods: {
        ...Vuex.mapActions('restaurant', [
            'addRestaurant',
            'destroyRestaurant',
            'addRestaurantJson',
            'addRestaurants',
            'addRestaurantsJson',
            'loadJsonRestaurant',
            'changeRestaurantFocus',
            'clearRestaurantFocus',
            'clearRestaurants',
            'clearRestaurantsJson',
            'setStarFrom',
            'setStarTo',
            'incrementCounterRestaurants'
        ]),
        ...Vuex.mapActions('map', [
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
        filteredRestaurants(starFrom, starTo){
            if(starFrom <= starTo){
                return this.restaurantsByRating(Number(starFrom), Number(starTo))
            }else{
                return this.restaurants
            }
        },
         addReview(){
          if(this.newPseudo !== '' && this.newComment !== '' && this.newRating !== ''){
            let ratingToAdd = new Rating(this.newRating, this.newComment, this.newPseudo)
            this.addComment(ratingToAdd)
          }
          this.newPseudo = ''
          this.newComment = ''
          this.newRating = ''
        }       
      }, 
      computed: {
        ...Vuex.mapGetters('restaurant', [
            'restaurants',
            'restaurantsJson',
            'restaurantsVisibles',
            'restaurant',
            'restaurantJson',
            'restaurantsCount',
            'restaurantsJsonCount',
            'restaurantsByRating',
            'restaurantsJsonByRating',
            'restaurantFocus',
            'starFrom',
            'starTo',
            'counterRestaurants'
        ]),
        ...Vuex.mapGetters('map', [
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
            let listOfRestaurants = []
            for(let restaurant of this.restaurantsJsonByRating(Number(self.starFrom), Number(self.starTo))){

            let myLatlng = new this.google.maps.LatLng(restaurant.lat, restaurant.long)
            if(this.screenBound.contains(myLatlng)){
              listOfRestaurants.push(restaurant)
            }
                    
            }


          for (var i = 0; i < self.markers.length; i++ ) {
          let myLatlng = new self.google.maps.LatLng(self.markers[i].getPosition().lat(), self.markers[i].getPosition().lng())
          let restaurantToRemove = self.restaurant(self.markers[i].getPosition().lat(), self.markers[i].getPosition().lng())
          if((!self.screenBound.contains(myLatlng)) || restaurantToRemove.averageRating < self.starFrom || restaurantToRemove.averageRating > self.starTo){
           self.destroyMarker(i)
           self.destroyRestaurant(restaurantToRemove)
          }
        }
        this.clearMarkers()
            this.clearRestaurants()
            this.addRestaurants(listOfRestaurants)
          }
        },
        starTo: {
          get() {
            return this.$store.state.starTo
          },
          set(value) {
            this.setStarTo(Number(value))
            let listOfRestaurants = []
            for(let restaurant of this.restaurantsJsonByRating(Number(self.starFrom), Number(self.starTo))){

            let myLatlng = new this.google.maps.LatLng(restaurant.lat, restaurant.long)
            if(this.screenBound.contains(myLatlng)){
              listOfRestaurants.push(restaurant)
            }
                    
            }


          for (var i = 0; i < self.markers.length; i++ ) {
          let myLatlng = new self.google.maps.LatLng(self.markers[i].getPosition().lat(), self.markers[i].getPosition().lng())
          let restaurantToRemove = self.restaurant(self.markers[i].getPosition().lat(), self.markers[i].getPosition().lng())
          if((!self.screenBound.contains(myLatlng)) || restaurantToRemove.averageRating < self.starFrom || restaurantToRemove.averageRating > self.starTo){
           self.destroyMarker(i)
           self.destroyRestaurant(restaurantToRemove)
          }
        }
        this.clearMarkers()

            this.clearRestaurants()
            this.addRestaurants(listOfRestaurants)
          }
        },
      
      }
}
</script>
<style>
  .restaurants-list{
    height: 100vh;
    overflow: auto;
  }
</style>