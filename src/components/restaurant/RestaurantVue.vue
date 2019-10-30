<template>
  <div class="restaurant flex relative" v-if="!this.modeMaps">
    <div class="restaurant-details w-1/2 mb-4">
      <div class="carousel-restaurant flex flex-wrap">
        <!-- <img v-bind:src="restaurant.streetViewUrl"/> -->
        <div class="w-full"><img class="w-full" src="https://picsum.photos/400/200"/></div>
        <div class="row flex">
        <div class="item2 w-1/2">
        <div class=""><img class="w-full" src="https://picsum.photos/200"/></div>
        </div>
        <div class="item3 flex w-1/2">
        <div class="w-1/2"><img class="w-full" src="https://picsum.photos/100"/></div>
        <div class="w-1/2"><img class="w-full" src="https://picsum.photos/100"/></div>
        <div class="w-1/2"><img class="w-full" src="https://picsum.photos/100"/></div>
        <div class="w-1/2"><img class="w-full" src="https://picsum.photos/100"/></div>
        </div>
        </div>
      </div>
      <h1 class="title-restaurant"> {{ restaurant.name }} </h1>
      <div class="info-card">
        <ul>
          <li> Note moyenne: {{ restaurant.averageRating }} </li>
          <li> Adresse: {{ restaurant.address }} </li>
        </ul>
      </div>
      <p class="description-restaurant">
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </p>
    </div>
    <div class="ratings w-1/2">
      <ul>
        <li class="item-list p-8"  v-bind:key="rating.name" v-for="rating in restaurant.ratings">
          <h4> {{ rating.author }} </h4>
          <p> {{ rating.comment }} </p>
          <p> {{ rating.star }} </p>
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
            <button v-on:click.prevent="addComment()">Ajouter un commentaire</button>
          </div>
        </li>
      </ul>
    </div>
<!--     <div><router-link :to="{name: 'root'}" class="">Retour à la liste</router-link></div> -->
    <div class="absolute">
      <button class="arrow-back" @click="this.setModeMaps">
        <svg class="text-white block h-12 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path class="heroicon-ui text-white" d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"/></svg>
      
      </button>
    </div>
  </div>
</template>

<script>
import Restaurant from '../../entity/restaurant.js';
import Rating from '../../entity/rating';
import store from '../../store/index'
import Vuex from 'vuex'

export default {
  store: store,
  props: ['restaurantForVue'],
    data(){
        return{
          restaurant: null,
          newPseudo: '',
          newComment: '',
          newRating: ''
        }
    },
    methods: {
      ...Vuex.mapActions([
          'replaceRestaurant',
          'setModeMaps'
      ]),
        addComment(){
          let restaurant = this.restaurant
          if(this.newPseudo !== '' && this.newComment !== '' && this.newRating !== ''){
            let ratingToAdd = new Rating(this.newRating, this.newComment, this.newPseudo)
            //this.addComment(this.restaurantFocus[0].lat, this.restaurantFocus[0].long, ratingToAdd)
            restaurant.addRatings(ratingToAdd)
            this.replaceRestaurant(restaurant)
          }
          this.newPseudo = ''
          this.newComment = ''
          this.newRating = ''
        } 
    },
    computed: {
        ...Vuex.mapGetters([
            'modeMaps'
        ]),
    },
    watch: {
    restaurantForVue: function () {
      this.restaurant = this.restaurantForVue
    }
    },
        mounted(){
          let self = this
          self.restaurant = self.restaurantForVue
        }
}
</script>

<style>

</style>