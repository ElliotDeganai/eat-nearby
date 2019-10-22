<template>
  <div class="form-add-restaurant">

          <div><input v-model="name" type="text" placeholder="Le nom du restaurant..."/></div>
          <div><input v-model="address" type="text" placeholder="L'adresse du restaurant..."/></div>
          <button v-on:click="addNewRestaurant">Valider</button>
          <button v-on:click="setAddingRestaurant">Annuler</button>
      
  </div>
</template>

<script>
import Restaurant from "../../entity/restaurant";
import Rating from "../../entity/rating";
import store from '../../store/index'
import Vuex from 'vuex'

export default {
    store: store,
    props: ['coord'],
    data(){
        return {
            name: '',
            address: ''
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
                lat: self.coord.lat(),
                lng: self.coord.lng()
            }
            self.name = ''
            self.address = ''           
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
        position: relative;
        margin: auto 0;
    }
</style>
