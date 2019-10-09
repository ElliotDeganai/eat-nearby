<template>
  <div class="form-add-restaurant">

          <div><input v-model="name" type="text" placeholder="Le nom du restaurant..."/></div>
          <div><input v-model="adress" type="text" placeholder="L'adresse du restaurant..."/></div>
          <button v-on:click="addNewRestaurant">Valider</button>
      
  </div>
</template>

<script>
import Restaurant from "../entity/restaurant";
import Rating from "../entity/rating";
import store from '../store/index'
import Vuex from 'vuex'

export default {
    store: store,
    props: ['coord'],
    data(){
        return {
            name: '',
            adress: '',
            lat: this.coord.lat(),
            lng: this.coord.lng()
        }
    },
    methods: {
        ...Vuex.mapActions([
            'setAddingRestaurant',
        ]),
        addNewRestaurant(){
            let self = this
            if(self.name === '' || self.address === ''){
                return
            }
            let restaurantData = {
                name: self.name,
                address: self.address,
                lat: self.lat,
                lng: self.lng
            }
            //self.setAddingRestaurant()
            self.$emit('formValidated', restaurantData)
            
        }
    },
    mounted(){     
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .form-add-restaurant{
        position: absolute;
        z-index: 10;
        background-color: beige;
        height: 400px;
        width: 400px;
        top: 200px;
        left: 300px;
    }
</style>
