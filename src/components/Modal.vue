<template>
  <div class="modal">
      <h2>Ajouter un élément</h2>
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
        position: absolute;
        z-index: 10;
        background-color: beige;
        height: 400px;
        width: 400px;
        top: 200px;
        left: 300px;
    }
</style>
