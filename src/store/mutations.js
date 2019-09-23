import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';


export const ADD_RESTAURANT = (state, restaurant) => {
        state.restaurants.push(restaurant)
    }

    export const DESTROY_RESTAURANT = (state, restaurantToDelete) => {
        state.restaurants = state.restaurants.filter(restaurant => restaurant !== restaurantToDelete)
    }
    export const ADD_RESTAURANT_JSON = (state, restaurant) => {
        state.restaurantsJson.push(restaurant)
    }
    export const INCREMENT_COUNTER = (state) => {
        state.counterRestaurants++
    }
    export const ADD_RESTAURANTS = (state, restaurants) => {
        for(let restaurant of restaurants){
            state.restaurants.push(restaurant)
        }
    }
    export const ADD_RESTAURANTS_JSON = (state, restaurants) => {
        for(let restaurant of restaurants){
            //let myLatlng = new google.maps.LatLng(restaurant.lat, restaurant.long)
            //if(state.screenBound.contains(myLatlng)){
            state.restaurantsJson.push(restaurant)
            //}
        }
    }
    export const ADD_RATING = (state, index, rating) => {
        state.restaurants[index].addRating(rating)
    }
    export const CHANGE_RESTAURANT_FOCUS = (state, restaurant) => {
        state.restaurantFocus = restaurant
    }
    export const SET_SCREEN_BOUND = (state, area) => {
        state.screenBound = area
    }
    export const SET_STAR_FROM = (state, star) => {
        state.starFrom = star
    }
    export const SET_STAR_TO = (state, star) => {
        state.starTo = star
    }
    export const CLEAR_RESTAURANT_FOCUS = state => {state.restaurantFocus = null}
    export const CLEAR_RESTAURANTS = state => {state.restaurants = []}
    export const CLEAR_RESTAURANTS_JSON = state => {state.restaurantsJson = []}
    export const CLEAR_MARKERS = state => {
        for(var i = 0; i < state.markers.length; i++){
            //console.log(state.markers[i])
            state.markers[i].setMap(null)
            state.markers[i] = null
            //console.log(state.markers[i])
        }
        state.markers = []
    }
    export const SET_GOOGLE = (state, google) => {
        state.google = google
    }
    export const SET_MARKERS = (state, markers) => {
        for(let marker of markers){
            state.markers.push(marker)
        }
    }
    export const SET_MARKER = (state, marker) => {
            state.markers.push(marker)
    }
    export const DESTROY_MARKER = (state, index) => {
        state.markers[index].setMap(null)
        state.markers[index] = null
        state.markers.splice(index, 1)
}
    export const SET_MAPS_CENTER = (state, center) => {
        state.mapsCenter = center
    }
