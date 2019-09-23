import axios from 'axios'
import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';


export const addRestaurant = (store, restaurant) => {
        store.commit('ADD_RESTAURANT', restaurant)
    }
    export const destroyRestaurant = (store, restaurant) => {
        store.commit('DESTROY_RESTAURANT', restaurant)
    }
    export const addRestaurantJson = (store, restaurant) => {
        store.commit('ADD_RESTAURANT_JSON', restaurant)
    }
    export const incrementCounterRestaurants = (store) => {
        store.commit('INCREMENT_COUNTER')
    }
    export const addComment = (store, rating) => {
        let restaurant = store.state.restaurantFocus[0]
        console.log(restaurant)
        let indexRestaurant = store.state.restaurants.findIndex((restaurantArray) => { 
            console.log(restaurantArray.name)
            console.log(restaurant.name)
            restaurantArray.name === restaurant.name 
        })
        console.log(indexRestaurant)
        store.commit('ADD_RATING', indexRestaurant, rating)
    }
    export const addRestaurants = (store, restaurants) => {
        store.commit('ADD_RESTAURANTS', restaurants)
    }
    export const addRestaurantsJson = (store, restaurants) => {
        store.commit('ADD_RESTAURANTS_JSON', restaurants)
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
            
            
            store.commit('ADD_RESTAURANTS_JSON', listOfRestaurants)
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
    export const setMarkers = (store, markers) => {
        store.commit('SET_MARKERS', markers)
    }
    export const setMarker = (store, marker) => {
        store.commit('SET_MARKER', marker)
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
    export const clearRestaurantsJson = (store) => {
        store.commit('CLEAR_RESTAURANTS_JSON')
    }
    export const clearMarkers = (store) => {
        store.commit('CLEAR_MARKERS')
    }
    export const destroyMarkersOutbound = (store) => {
        let self = this
        for (var i = 0; i < store.state.markers.length; i++ ) {
          let myLatlng = new store.state.google.maps.LatLng(store.state.markers[i].getPosition().lat(), store.state.markers[i].getPosition().lng())
          let restaurantToRemove = self.getRestaurantByPosition(store.state.markers[i].getPosition().lat(), store.state.markers[i].getPosition().lng())
          if((store.state.screenBound.contains(myLatlng) === false) || restaurantToRemove.averageRating < store.state.starFrom || restaurantToRemove.averageRating > store.state.starTo){
            store.commit('DESTROY_MARKER', i)
            self.destroyRestaurant(restaurantToRemove)
          }
        }
    }
    export const destroyAllMarkers = (store) => {
        //let store.state = this
        for (var i = 0; i < store.state.markers.length; i++ ) {
            store.commit('DESTROY_MARKER', i)
          }
            store.state.markers = [];
    }
    export const destroyMarker = (store, index) => {
            store.commit('DESTROY_MARKER', index)
    }
    