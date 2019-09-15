import Vuex from 'vuex'
//import axios from '../../node_modules/@bundled-es-modules/axios/axios'
import axios from 'axios'
import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';
import gmapsInit from "../utils/gmaps"

const state = {
    restaurants: [],
    restaurantFocus: null,
    screenBound: null,
    google: null,
    starFrom: 1,
    starTo: 5
}

const mutations = {
    ADD_RESTAURANT: (state, restaurant) => {
        state.restaurants.push(restaurant)
    },
    ADD_RESTAURANTS: (state, restaurants) => {
        for(let restaurant of restaurants){
            //let myLatlng = new google.maps.LatLng(restaurant.lat, restaurant.long)
            //if(state.screenBound.contains(myLatlng)){
            state.restaurants.push(restaurant)
            //}
        }
    },
    CHANGE_RESTAURANT_FOCUS: (state, restaurant) => {
        state.restaurantFocus = restaurant
    },
    SET_SCREEN_BOUND: (state, area) => {
        state.screenBound = area
    },
    SET_STAR_FROM: (state, star) => {
        state.starFrom = star
    },
    SET_STAR_TO: (state, star) => {
        state.starTo = star
    },
    CLEAR_RESTAURANT_FOCUS: state => {state.restaurantFocus = null},
    CLEAR_RESTAURANTS: state => {state.restaurants = []},
    SET_GOOGLE: (state, google) => {
        state.google = google
    },
}

const getters = {
    restaurants: state => state.restaurants,
    restaurant: state => (lat, lng) => state.restaurants.filter(restaurant => ((restaurant.lat === Number(lat.toFixed(6)) || restaurant.lat === Number(lat.toFixed(7))) && (restaurant.long === Number(lng.toFixed(6))) || (restaurant.lat === Number(lat.toFixed(7))))),
    restaurantFocus: state => state.restaurantFocus,
    screenBound: state => state.screenBound,
    google: state => state.google,
    starFrom: state => state.starFrom,
    starTo: state => state.starTo,
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
        
        axios.get("http://localhost/eat-nearby/src/data/restaurant-list.json").then(response => {
            let jsonContent = response.data
            store.state.restaurants = []
            for(let restaurant of jsonContent){
              let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long)
            for(let rating of restaurant.ratings){
                let ratingToAdd = new Rating(rating.stars, rating.comment, rating.author)
                restaurantToAdd.addRatings(ratingToAdd)
            }
            if(this.screenBound.contains(myLatlng)){
                listOfRestaurants.push(restaurantToAdd)
              }}
            
            
            store.commit('ADD_RESTAURANTS', listOfRestaurants)
    })},

    changeRestaurantFocus: (store, restaurant) => {
        store.commit('CHANGE_RESTAURANT_FOCUS', restaurant)
    },
    setScreenBound: (store, area) => {
        store.commit('SET_SCREEN_BOUND', area)
    },
    setGoogle: (store, google) => {
        store.commit('SET_GOOGLE', google)
    },
    setStarFrom: (store, star) => {
        store.commit('SET_STAR_FROM', star)
    },
    setStarTo: (store, star) => {
        store.commit('SET_STAR_TO', star)
    },
    clearRestaurantFocus: (store) => {
        store.commit('CLEAR_RESTAURANT_FOCUS')
    },
    clearRestaurants: (store) => {
        store.commit('CLEAR_RESTAURANTS')
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