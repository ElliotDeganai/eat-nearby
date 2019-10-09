<template>
  <div class="restaurant">
    <div class="carousel-restaurant">
      <img v-bind:src="restaurant.streetViewUrl"/>
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
    <div class="ratings">
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
    <div><router-link :to="{name: 'root'}" class="">Retour à la liste</router-link></div>
  </div>
</template>

<script>
import Restaurant from '../entity/restaurant.js';
import Rating from '../entity/rating';
import store from '../store/index'
import Vuex from 'vuex'

export default {
  store: store,
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
          'addRestaurant',
          //'addComment',
          'addRestaurants',
          'loadJsonRestaurant',
          'changeRestaurantFocus',
          'clearRestaurantFocus',
          'setStarFrom',
          'setStarTo',
          'replaceRestaurant'
      ]),
        addComment(){
          let restaurant = this.restaurant
          if(this.newPseudo !== '' && this.newComment !== '' && this.newRating !== ''){
            let ratingToAdd = new Rating(this.newRating, this.newComment, this.newPseudo)
            //this.addComment(this.restaurantFocus[0].lat, this.restaurantFocus[0].long, ratingToAdd)
            restaurant.addRatings(ratingToAdd)
            console.log(restaurant)
            this.replaceRestaurant(restaurant)
          }
          this.newPseudo = ''
          this.newComment = ''
          this.newRating = ''
        } 
    },
    computed: {
        ...Vuex.mapGetters([
            'restaurants',
            'restaurantsJson',
            //'restaurant',
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
            'markers',
            'mapsCenter',
            'restaurantById'
        ]),

    },
        created(){
          let self = this
          this.restaurant = this.restaurantById(this.$route.params.id)
        }
}
</script>

<style>

</style>