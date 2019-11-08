import axios from 'axios'
import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';
import Location from '../entity/location';


export const addRestaurant = (store, restaurant) => {
    store.commit('ADD_RESTAURANT', restaurant)
    let location = new Location(restaurant.id, restaurant.lat, restaurant.long)
    store.commit('ADD_LOCATION',location)
}
export const destroyRestaurant = (store, restaurant) => {
    store.commit('DESTROY_RESTAURANT', restaurant)
}
export const replaceRestaurant = (store, newRestaurant) => {
    store.commit('DESTROY_RESTAURANT_JSON', newRestaurant.id)
    store.commit('ADD_RESTAURANT_JSON', newRestaurant)
}
export const addRestaurantJson = (store, restaurant) => {
    if(restaurant.id === 0){
        restaurant.id = store.state.restaurantsJson.length
    }
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
    for(let restaurant of restaurants){
        let location = new Location(restaurant.id, restaurant.lat, restaurant.long)
        store.commit('ADD_LOCATION',location)
    }
}
export const addRestaurantsJson = (store, restaurants) => {
    store.commit('ADD_RESTAURANTS_JSON', restaurants)
}
export const loadJsonRestaurant = (store) => {
    let listOfRestaurants = []

    axios.get("/data/restaurant-list.json").then(response => {
        let jsonContent = response.data

        for (let restaurant of jsonContent) {

            let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long, restaurant.city, restaurant.zip_code)
            for (let rating of restaurant.ratings) {
                let ratingToAdd = new Rating(rating.stars, rating.comment, rating.author)
                restaurantToAdd.addRatings(ratingToAdd)
            }
            listOfRestaurants.push(restaurantToAdd)


        }
        //this.clearRestaurantsJson()
        store.commit('CLEAR_RESTAURANTS_JSON')
        //this.addRestaurantsJson(listOfRestaurants)
        store.commit('ADD_RESTAURANTS_JSON', listOfRestaurants)
    })
    return listOfRestaurants
}

export const setRestaurants = (store) => {

    let listOfRestaurants = []
    for (let restaurant of store.state.restaurantsJson.filter(restaurant => restaurant.averageRating >= Number(store.state.starFrom) && restaurant.averageRating <= Number(store.state.starTo))) {


        let myLatlng = new store.state.google.maps.LatLng(restaurant.lat, restaurant.long)
        if (store.state.screenBound.contains(myLatlng)) {
            //restaurant.id = listOfRestaurants.length
            listOfRestaurants.push(restaurant)
        }

    }
    //this.clearRestaurants()
    store.commit('CLEAR_RESTAURANTS')
    //store.commit('CLEAR_LOCATIONS')
    //this.addRestaurants(listOfRestaurants)
    store.commit('ADD_RESTAURANTS', listOfRestaurants)
/*     for(let restaurant of listOfRestaurants){
        let location = new Location(restaurant.id, restaurant.lat, restaurant.long)
        store.commit('ADD_LOCATION',location)
    } */
}

export const setLocations = (store) => {

    let listOfLocations = []
    for (let restaurant of store.state.restaurantsJson.filter(restaurant => restaurant.averageRating >= Number(store.state.starFrom) && restaurant.averageRating <= Number(store.state.starTo))) {
        let location = new Location(restaurant.id, restaurant.lat, restaurant.long)

        let myLatlng = new store.state.google.maps.LatLng(restaurant.lat, restaurant.long)
        if (store.state.screenBound.contains(myLatlng)) {
            //restaurant.id = listOfRestaurants.length
            listOfLocations.push(location)
        }
    }
    //this.clearRestaurants()
    //store.commit('CLEAR_RESTAURANTS')
    store.commit('CLEAR_LOCATIONS')
    //this.addRestaurants(listOfRestaurants)
    store.commit('ADD_LOCATIONS', listOfLocations)
}

export const setRestaurantsAPI = (store) => {
    let listOfRestaurants = []

    axios.get("http://localhost/eat-nearby/src/data/restaurant-list.json").then(response => {
        let jsonContent = response.data

        for (let restaurant of jsonContent) {
            let myLatlng = new store.state.google.maps.LatLng(restaurant.lat, restaurant.long)
            if (store.state.screenBound.contains(myLatlng)) {
                let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long)
                for (let rating of restaurant.ratings) {
                    let ratingToAdd = new Rating(rating.stars, rating.comment, rating.author)
                    restaurantToAdd.addRatings(ratingToAdd)
                }
                listOfRestaurants.push(restaurantToAdd)
            }

        }
        //this.clearRestaurantsJson()
        store.commit('CLEAR_RESTAURANTS_JSON')
        //this.addRestaurantsJson(listOfRestaurants)
        store.commit('ADD_RESTAURANTS_JSON', listOfRestaurants)
    })
    return listOfRestaurants
}

export const changeRestaurantFocus = (store, restaurant) => {
    store.commit('CHANGE_RESTAURANT_FOCUS', restaurant)
}
export const changeRestaurantFocusById = (store, id) => {
    let restaurantFocus = store.state.restaurants.filter(restaurant => restaurant.id === id)[0]
    //console.log(restaurantFocus)
    store.commit('CHANGE_RESTAURANT_FOCUS', restaurantFocus)
}
export const addLocation = (store, location) => {
    store.commit('ADD_LOCATION', location)
}
export const addLocations = (store, locations) => {
    store.commit('ADD_LOCATIONS', locations)
}
export const setScreenBound = (store, area) => {
    store.commit('SET_SCREEN_BOUND', area)
}
export const setGoogle = (store, google) => {
    store.commit('SET_GOOGLE', google)
}
export const setMap = (store, map) => {
    store.commit('SET_MAP', map)
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
    store.commit('CLEAR_LOCATIONS')
}
export const clearLocations = (store) => {
    store.commit('CLEAR_LOCATIONS')
}
export const clearRestaurantsJson = (store) => {
    store.commit('CLEAR_RESTAURANTS_JSON')
}
export const clearMarkers = (store) => {
    store.commit('CLEAR_MARKERS')
}
export const destroyMarkersOutbound = (store) => {
    let self = this
    for (let i = 0; i < store.state.markers.length; i++) {
        let myLatlng = new store.state.google.maps.LatLng(store.state.markers[i].getPosition().lat(), store.state.markers[i].getPosition().lng())
        
        if (store.state.screenBound.contains(myLatlng) === false){
            store.commit('DESTROY_MARKER', i)
        }
    }
}
export const destroyAllMarkers = (store) => {
        store.commit('DESTROY_ALL_MARKER')
}
export const destroyMarker = (store, index) => {
    store.commit('DESTROY_MARKER', index)
}
export const setAddingRestaurant = (store) => {
    store.commit('SET_ADDING_RESTAURANT')
}
export const setModeMaps = (store) => {
    store.commit('SET_MODE_MAPS')
}