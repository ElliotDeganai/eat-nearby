import axios from 'axios'
import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';


export const addRestaurant = (store, restaurant) => {
        store.commit('ADD_RESTAURANT', restaurant)
    }
    export const addRestaurants = (store, restaurants) => {
        store.commit('ADD_RESTAURANTS', restaurants)
    }
    export const loadJsonRestaurant = (store) => {
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
    })}

    export const changeRestaurantFocus = (store, restaurant) => {
        store.commit('CHANGE_RESTAURANT_FOCUS', restaurant)
    }
    export const setScreenBound = (store, area) => {
        store.commit('SET_SCREEN_BOUND', area)
    }
    export const setGoogle = (store, google) => {
        store.commit('SET_GOOGLE', google)
    }
    export const setMapsCenter = (store, center) => {
        store.commit('SET_MAPS_CENTER', center)
    }
    export const setStarFrom = (store, star) => {
        store.commit('SET_STAR_FROM', star)
    }
    export const setStarTo = (store, star) => {
        store.commit('SET_STAR_TO', star)
    }
    export const clearRestaurantFocus = (store) => {
        store.commit('CLEAR_RESTAURANT_FOCUS')
    }
    export const clearRestaurants = (store) => {
        store.commit('CLEAR_RESTAURANTS')
    }