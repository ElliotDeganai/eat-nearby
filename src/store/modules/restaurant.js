  
import axios from 'axios'
import Restaurant from '../../entity/restaurant';
import Rating from '../../entity/rating';

// initial state
// shape: [{ id, quantity }]
const state = {
    restaurants: [],
    restaurantsJson: [],
    restaurantFocus: null,
    starFrom: 1,
    starTo: 5,
    counterRestaurants: 0
}

// getters
const getters = {
    restaurants : state => state.restaurants,
    restaurantsJson : state => state.restaurantsJson,
    restaurantsVisibles : state => state.restaurants.filter(restaurant => restaurant.visible === true),
    restaurant : state => (lat, lng) => state.restaurants.filter(restaurant => ((restaurant.lat === Number(lat.toFixed(6)) || restaurant.lat === Number(lat.toFixed(7)) || (restaurant.lat === Number(lat))) && ((restaurant.long === Number(lng.toFixed(6))) || (restaurant.lat === Number(lat.toFixed(7))) || (restaurant.lat === Number(lat))))),
    restaurantJson : state => (lat, lng) => state.restaurantsJson.filter(restaurant => ((restaurant.lat === Number(lat.toFixed(6)) || restaurant.lat === Number(lat.toFixed(7)) || (restaurant.lat === Number(lat))) && ((restaurant.long === Number(lng.toFixed(6))) || (restaurant.lat === Number(lat.toFixed(7))) || (restaurant.lat === Number(lat))))),
    restaurantFocus : state => state.restaurantFocus,
    starFrom : state => state.starFrom,
    starTo : state => state.starTo,
    restaurantsCount : state => state.restaurants.length,
    restaurantsJsonCount : state => state.restaurantsJson.length,
    restaurantsByRating : (state) => (toStar, fromStar) => state.restaurants.filter(restaurant => restaurant.averageRating >= toStar && restaurant.averageRating <= fromStar),
    restaurantsJsonByRating : (state) => (toStar, fromStar) => state.restaurantsJson.filter(restaurant => restaurant.averageRating >= toStar && restaurant.averageRating <= fromStar)
}

// actions
const actions = {
        addRestaurant : (store, restaurant) => {
            store.commit('ADD_RESTAURANT', restaurant)
        },
        destroyRestaurant : (store, restaurant) => {
            store.commit('DESTROY_RESTAURANT', restaurant)
        },
        addRestaurantJson : (store, restaurant) => {
            store.commit('ADD_RESTAURANT_JSON', restaurant)
        },
        incrementCounterRestaurants : (store) => {
            store.commit('INCREMENT_COUNTER')
        },
        addComment : (store, rating) => {
            let restaurant = store.state.restaurantFocus[0]
            console.log(restaurant)
            let indexRestaurant = store.state.restaurants.findIndex((restaurantArray) => { 
                console.log(restaurantArray.name)
                console.log(restaurant.name)
                restaurantArray.name === restaurant.name 
            })
            console.log(indexRestaurant)
            store.commit('ADD_RATING', indexRestaurant, rating)
        },
        addRestaurants : (store, restaurants) => {
            store.commit('ADD_RESTAURANTS', restaurants)
        },
        addRestaurantsJson : (store, restaurants) => {
            store.commit('ADD_RESTAURANTS_JSON', restaurants)
        },
        loadJsonRestaurant : (store) => {
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
        })},
        changeRestaurantFocus : (store, restaurant) => {
            store.commit('CHANGE_RESTAURANT_FOCUS', restaurant)
        },
        setStarFrom : (store, star) => {
            store.commit('SET_STAR_FROM', star)
        },
        setStarTo : (store, star) => {
            store.commit('SET_STAR_TO', star)
        },
        clearRestaurantFocus : (store) => {
            store.commit('CLEAR_RESTAURANT_FOCUS')
        },
        clearRestaurants : (store) => {
            store.commit('CLEAR_RESTAURANTS')
        },
        clearRestaurantsJson : (store) => {
            store.commit('CLEAR_RESTAURANTS_JSON')
        }
}

// mutations
const mutations = {
    ADD_RESTAURANT : (state, restaurant) => {
        state.restaurants.push(restaurant)
    },

    DESTROY_RESTAURANT : (state, restaurantToDelete) => {
        state.restaurants = state.restaurants.filter(restaurant => restaurant !== restaurantToDelete)
    },
    ADD_RESTAURANT_JSON : (state, restaurant) => {
        state.restaurantsJson.push(restaurant)
    },
    INCREMENT_COUNTER : (state) => {
        state.counterRestaurants++
    },
    ADD_RESTAURANTS : (state, restaurants) => {
        for(let restaurant of restaurants){
            state.restaurants.push(restaurant)
        }
    },
    ADD_RESTAURANTS_JSON : (state, restaurants) => {
        for(let restaurant of restaurants){
            state.restaurantsJson.push(restaurant)
        }
    },
    ADD_RATING : (state, index, rating) => {
        state.restaurants[index].addRating(rating)
    },
    CHANGE_RESTAURANT_FOCUS : (state, restaurant) => {
        state.restaurantFocus = restaurant
    },
    SET_SCREEN_BOUND : (state, area) => {
        state.screenBound = area
    },
    SET_STAR_FROM : (state, star) => {
        state.starFrom = star
    },
    SET_STAR_TO : (state, star) => {
        state.starTo = star
    },
    CLEAR_RESTAURANT_FOCUS : state => {state.restaurantFocus = null},
    CLEAR_RESTAURANTS : state => {state.restaurants = []},
    CLEAR_RESTAURANTS_JSON : state => {state.restaurantsJson = []}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}