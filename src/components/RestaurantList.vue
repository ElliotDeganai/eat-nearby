<template>
  <div class="restaurant">
      <li  v-bind:key="restaurant.name" v-for="restaurant in restaurantList">
      {{ restaurant }}
      </li>
  </div>
</template>

<script>
import axios from '../../node_modules/@bundled-es-modules/axios/axios'
import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';
import RestaurantList from '../entity/restaurantList';



export default {
    data(){
        return{
            restaurantList: RestaurantList.list,
            listJson: Object
        }
    },
      mounted () {
    axios
      .get("http://localhost/eat-nearby/src/restaurant-list.json").then(response => {
        this.listJson = response.data
        for(let restaurant of this.listJson){
          let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long)
        for(let rating of restaurant.ratings){
            let ratingToAdd = new Rating(rating.stars, rating.comment, rating.author)
            restaurantToAdd.ratings.push(ratingToAdd)
        }
        RestaurantList.list.push(restaurantToAdd)

          //this.restaurantList.push(restaurantToAdd)

        
        }
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>