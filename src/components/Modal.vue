<template>
  <div class="modal absolute m-32 right-0 left-0 h-3/5 w-1/2 z-10 bg-gray-400 p-8 shadow-md rounded">
      <h2 class="mb-4 font-bold text-lg">Ajouter un élément</h2>
          <slot/>
      
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
