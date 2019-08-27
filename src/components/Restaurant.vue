<template>
  <div class="restaurant">
      <h1>{{ name }}</h1>
      <p> {{ address}} <p>
          <div class="comments">
               <ul>
                  <li v-bind:key="rating" v-for="rating in ratings">
                      <h3> {{ rating.author }} </h3>
                      <p> {{ rating.comment }} </p>
                  </li>
              </ul>
          </div>
  </div>
</template>

<script>
import Restaurant from '../entity/restaurant.js';

let restaurant = new Restaurant("Bronco", "39 Rue des Petites Écuries, 75010 Paris", 48.8737815, 2.3501649)
export default {
    data(){
        return{
            name: restaurant.name,
            address: restaurant.address,
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>