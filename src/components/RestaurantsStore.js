import Vuex from 'vuex'
//import axios from '../../node_modules/@bundled-es-modules/axios/axios'
import axios from 'axios'
import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';


const state = {
    restaurants: []
}

const mutations = {
    ADD_RESTAURANT: (state, restaurant) => {
        state.restaurants.push(restaurant)
    },
    ADD_RESTAURANTS: (state, restaurants) => {
        for(let restaurant of restaurants){
            state.restaurants.push(restaurant)
        }
    },
    LOAD_JSON_RESTAURANTS: () => {
    axios.get("http://localhost/eat-nearby/src/restaurant-list.json").then(response => {
      let jsonContent = response.data
      for(let restaurant of jsonContent){
        let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long)
      for(let rating of restaurant.ratings){
          let ratingToAdd = new Rating(rating.stars, rating.comment, rating.author)
          restaurantToAdd.ratings.push(ratingToAdd)
      }
      state.restaurants.push(restaurantToAdd)
        //this.restaurantList.push(restaurantToAdd)        
      }
    }) 
}
}

const getters = {
    restaurants: state => state.restaurants,
    restaurantsCount: state => state.restaurants.length
}

const actions = {
    addRestaurant: (store, restaurant) => {
        store.commit('ADD_RESTAURANT', restaurant)
    },
    addRestaurants: (store, restaurants) => {
        store.commit('ADD_RESTAURANTS', restaurants)
    },
    loadJsonRestaurant: (store) => {
        store.commit('LOAD_JSON_RESTAURANTS')
    }
}

let store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions,
    strict: false
})

global.store = store

export default store