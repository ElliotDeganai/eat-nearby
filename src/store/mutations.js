export const ADD_RESTAURANT = (state, restaurant) => {
        state.restaurants.push(restaurant)
    }
    export const ADD_RESTAURANTS = (state, restaurants) => {
        for(let restaurant of restaurants){
            //let myLatlng = new google.maps.LatLng(restaurant.lat, restaurant.long)
            //if(state.screenBound.contains(myLatlng)){
            state.restaurants.push(restaurant)
            //}
        }
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
    export const SET_GOOGLE = (state, google) => {
        state.google = google
    }
    export const SET_MAPS_CENTER = (state, center) => {
        state.mapsCenter = center
    }
