<template>
<div class="flex pt-2">
        <div v-bind:key="i" v-for="i in 5" class="focus:outline-none" :class="{ 'mr-1': i < 5 }">
          <svg v-if="stars !== 0" class="block h-4 w-4" :class="[ stars >= i ? 'text-yellow-400': 'text-gray-400']" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
          <svg v-if="stars === 0" class="block h-4 w-4 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
        </div>
</div>
</template>

<script>
import Restaurant from "../entity/restaurant";
import Rating from "../entity/rating";
import store from '../store/index'
import Vuex from 'vuex'

export default {
    props: ['rating'],
    store: store,
    data(){
        return {
          stars: 0,
        }
    },
    methods: {
    },
    watch: {
        rating: function () {
        this.stars = this.rating
        },
    },
    mounted(){  
          let self = this
          self.stars = self.rating   
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
