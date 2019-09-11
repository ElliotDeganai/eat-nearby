import Vuex from 'vuex'
//import axios from '../../node_modules/@bundled-es-modules/axios/axios'
import axios from 'axios'
import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';


const state = {
    restaurants: [],
    restaurantFocus: null
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
    CHANGE_RESTAURANT_FOCUS: (state, restaurant) => {
        state.restaurantFocus = restaurant
    },
    CLEAR_RESTAURANT_FOCUS: state => {state.restaurantFocus = null}
}

const getters = {
    restaurants: state => state.restaurants,
    restaurant: state => (lat, lng) => state.restaurants.filter(restaurant => ((restaurant.lat === Number(lat.toFixed(6)) || restaurant.lat === Number(lat.toFixed(7))) && (restaurant.long === Number(lng.toFixed(6))) || (restaurant.lat === Number(lat.toFixed(7))))),
    restaurantFocus: state => state.restaurantFocus,
    restaurantsCount: state => state.restaurants.length,
    restaurantsByRating: (state) => (toStar, fromStar) => state.restaurants.filter(restaurant => restaurant.averageRating >= toStar && restaurant.averageRating <= fromStar),

}

const actions = {
    addRestaurant: (store, restaurant) => {
        store.commit('ADD_RESTAURANT', restaurant)
    },
    addRestaurants: (store, restaurants) => {
        store.commit('ADD_RESTAURANTS', restaurants)
    },
    loadJsonRestaurant: (store) => {
        let listOfRestaurants = []
        axios.get("http://localhost/eat-nearby/src/restaurant-list.json").then(response => {
            let jsonContent = response.data
            for(let restaurant of jsonContent){
              let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long)
            for(let rating of restaurant.ratings){
                let ratingToAdd = new Rating(rating.stars, rating.comment, rating.author)
                restaurantToAdd.addRatings(ratingToAdd)
            }
            listOfRestaurants.push(restaurantToAdd)        
            }
            store.commit('ADD_RESTAURANTS', listOfRestaurants)
    })},

    changeRestaurantFocus: (store, restaurant) => {
        store.commit('CHANGE_RESTAURANT_FOCUS', restaurant)
    },
    clearRestaurantFocus: (store) => {
        store.commit('CLEAR_RESTAURANT_FOCUS')
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