<template>
  <div class="modal p-8 w-full h-full sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full absolute z-10 bg-transparent shadow-md rounded">
  <div class="w-full">
      <h2 class="mb-4 font-bold text-xl">Ajouter un restaurant</h2>
          <slot/>
      
  </div>
  </div>
</template>

<script>
import Restaurant from "../entity/restaurant";
import Rating from "../entity/rating";
import store from '../store/index'
import Vuex from 'vuex'

export default {
    store: store,
    data(){
        return {
        }
    },
    methods: {
        ...Vuex.mapActions([
            'setAddingRestaurant',
        ])
    },
    mounted(){     
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .modal{

    }
</style>
