<template>
  <div class="restaurant">
      <h1>{{ name }}</h1>
      <p> {{ address}} </p>

  </div>
</template>

<script>
import Restaurant from '../entity/restaurant.js';

let restaurant = new Restaurant("La grande étoile", "39 Rue des Petites Écuries, 75010 Paris", 48.8737815, 2.3501649)
export default {
    data(){
        return{
            name: restaurant.name,
            address: restaurant.address,
            streetViewItem: {}
        }
    },
    mounted(){
    this.$streetViewItem = this.$resource()
    
    this.$streetViewItem.query().then((response) => {
    this.streetViewItem = response.data
  },
  (response) => {})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>