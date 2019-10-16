import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';


export const ADD_RESTAURANT = (state, restaurant) => {
        state.restaurants.push(restaurant)
    }
    export const ADD_LOCATION = (state, location) => {
        state.locations.push(location)
    }

    export const DESTROY_RESTAURANT = (state, id) => {
        state.restaurants = state.restaurants.filter(restaurant => restaurant.id !== id)
    }
    export const DESTROY_RESTAURANT_JSON = (state, id) => {
        state.restaurantsJson = state.restaurantsJson.filter(restaurant => restaurant.id !== id)
    }
    export const ADD_RESTAURANT_JSON = (state, restaurant) => {
        state.restaurantsJson.push(restaurant)
    }
    export const INCREMENT_COUNTER = (state) => {
        state.counterRestaurants++
    }
    export const ADD_RESTAURANTS = (state, restaurants) => {
        for(let restaurant of restaurants){
            //restaurant.id = state.restaurants.length
            state.restaurants.push(restaurant)
        }
    }
    export const ADD_LOCATIONS = (state, locations) => {
        for(let location of locations){
            state.locations.push(location)
        }
    }
    export const ADD_RESTAURANTS_JSON = (state, restaurants) => {
        for(let restaurant of restaurants){
            restaurant.id = state.restaurantsJson.length
            state.restaurantsJson.push(restaurant)
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
    export const CLEAR_LOCATIONS = state => {state.locations = []}
    export const CLEAR_RESTAURANTS_JSON = state => {state.restaurantsJson = []}
    export const CLEAR_MARKERS = state => {
        for(var i = 0; i < state.markers.length; i++){
            state.markers[i].marker.setMap(null);
            state.markers[i].marker = null;
        }
        state.markers = []
        console.log('markers cleared')
    }
    export const SET_GOOGLE = (state, google) => {
        state.google = google
    }
    export const SET_MAP = (state, map) => {
        state.map = map
    }
    export const SET_MARKERS = (state, markers) => {
        for(let marker of markers){
            state.markers.push(marker)
        }
    }
    export const SET_MARKER = (state, marker) => {
            state.markers.push(marker)
            let log = "Marker " + marker.id + " added."
            console.log(log)
    }
    export const DESTROY_MARKER = (state, index) => {
        state.markers[index].setMap(null)
        //state.markers[index] = null
        state.markers.splice(index, 1)
}

export const DESTROY_ALL_MARKER = (state) => {
    for (var i = 0; i < store.state.markers.length; i++ ) {
        state.markers[i].marker.setMap(null)
        state.markers[i].marker = null
        //state.markers = state.markers.filter(marker => restaurant.id !== id)
        let log = "Marker " + state.markers[i].id + " removed."
        console.log(log)
    }
    state.markers = []
}
    export const SET_MAPS_CENTER = (state, center) => {
        state.mapsCenter = center
    }
    export const SET_ADDING_RESTAURANT = (state) => {
        state.addingRestaurant = !state.addingRestaurant
    }
