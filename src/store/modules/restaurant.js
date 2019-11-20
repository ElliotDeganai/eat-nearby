  
import axios from 'axios'
import Restaurant from '../../entity/restaurant';
import Rating from '../../entity/rating';

// initial state
// shape: [{ id, quantity }]
const state = {
    restaurants: [],
    restaurantsJson: [],
    restaurantFocus: null,
    counterRestaurants: 0,
}

// getters
const getters = {
    restaurants: state => state.restaurants,
    restaurantsJson: state => state.restaurantsJson,
    restaurant: state => (lat, lng) => state.restaurants.filter(restaurant => ((restaurant.lat === Number(lat.toFixed(6)) || restaurant.lat === Number(lat.toFixed(7)) || (restaurant.lat === Number(lat))) && ((restaurant.long === Number(lng.toFixed(6))) || (restaurant.lat === Number(lat.toFixed(7))) || (restaurant.lat === Number(lat))))),
    restaurantById: state => (id) => state.restaurants.filter(restaurant => restaurant.id === id)[0],
    restaurantsJsonById: state => (id) => state.restaurantsJson.filter(restaurant => restaurant.id === id)[0],
    restaurantJson: state => (lat, lng) => state.restaurantsJson.filter(restaurant => ((restaurant.lat === Number(lat.toFixed(6)) || restaurant.lat === Number(lat.toFixed(7)) || (restaurant.lat === Number(lat))) && ((restaurant.long === Number(lng.toFixed(6))) || (restaurant.lat === Number(lat.toFixed(7))) || (restaurant.lat === Number(lat))))),
    restaurantFocus: state => state.restaurantFocus,
    restaurantsCount: state => state.restaurants.length,
    restaurantsJsonCount: state => state.restaurantsJson.length,
    restaurantsByRating: (state) => (toStar, fromStar) => state.restaurants.filter(restaurant => restaurant !== undefined && restaurant.averageRating >= toStar && restaurant.averageRating <= fromStar),
    restaurantsJsonByRating: (state) => (toStar, fromStar) => state.restaurantsJson.filter(restaurant => restaurant.averageRating >= toStar && restaurant.averageRating <= fromStar),
}

// actions
const actions = {
    addRestaurant: (store, restaurant) => {
        store.commit('ADD_RESTAURANT', restaurant)
        let location= new Location(restaurant.id, restaurant.lat, restaurant.long)
        store.commit('ADD_LOCATION',location)
    },
    destroyRestaurant: (store, restaurant) => {
        store.commit('DESTROY_RESTAURANT', restaurant)
    },
    replaceRestaurant: (store, newRestaurant) => {
        store.commit('DESTROY_RESTAURANT_JSON', newRestaurant.id)
        store.commit('ADD_RESTAURANT_JSON', newRestaurant)
    },
    addRestaurantJson: (store, restaurant) => {
        if(restaurant.id === 0){
            restaurant.id= store.state.restaurantsJson.length
        }
        store.commit('ADD_RESTAURANT_JSON', restaurant)
    },
    incrementCounterRestaurants: (store) => {
        store.commit('INCREMENT_COUNTER')
    },
/*     addComment: (store, rating) => {
        let restaurant= store.state.restaurantFocus[0]
        console.log(restaurant)
        let indexRestaurant= store.state.restaurants.findIndex((restaurantArray) => {
            console.log(restaurantArray.name)
            console.log(restaurant.name)
            restaurantArray.name === restaurant.name
        })
        console.log(indexRestaurant)
        store.commit('ADD_RATING', indexRestaurant, rating)
    }, */
    addRestaurants: (store, restaurants) => {
        store.commit('ADD_RESTAURANTS', restaurants)
        for(let restaurant of restaurants){
            let location= new Location(restaurant.id, restaurant.lat, restaurant.long)
            store.commit('ADD_LOCATION',location)
        }
    },
    addRestaurantsJson: (store, restaurants) => {
        store.commit('ADD_RESTAURANTS_JSON', restaurants)
    },
    loadJsonRestaurant: (store) => {
        let listOfRestaurants= []
    
        axios.get("/data/restaurant-list.json").then(response => {
            let jsonContent= response.data
    
            for (let restaurant of jsonContent) {
    
                let restaurantToAdd= new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long, restaurant.city, restaurant.zip_code)
                for (let rating of restaurant.ratings) {
                    let ratingToAdd= new Rating(rating.stars, rating.comment, rating.author)
                    restaurantToAdd.addRatings(ratingToAdd)
                }
                listOfRestaurants.push(restaurantToAdd)
    
    
            }
            //this.clearRestaurantsJson()
            store.commit('CLEAR_RESTAURANTS_JSON')
            //this.addRestaurantsJson(listOfRestaurants)
            store.commit('ADD_RESTAURANTS_JSON', listOfRestaurants)
        },)
        return listOfRestaurants
    },
    
    getRestaurantSearchAPI: (store) => {
        let self= this;
      var request= {
        bounds: store.state.screenBound,
        type: ['restaurant']
      };
    
      let service= new google.maps.places.PlacesService(store.state.map);
      service.nearbySearch(request, 
    function callback(results, status) {
        //let self= this;
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i= 0; i < results.length; i++) {
          console.log(results[i]);
          //createMarker(results[i]);
        }
      } 
    },
      );
    },
    
    setRestaurants: (store) => {
    
        let listOfRestaurants= []
        for (let restaurant of store.state.restaurantsJson.filter(restaurant => restaurant.averageRating >= Number(store.state.starFrom) && restaurant.averageRating <= Number(store.state.starTo))) {
    
    
            let myLatlng= new store.state.google.maps.LatLng(restaurant.lat, restaurant.long)
            if (store.state.screenBound.contains(myLatlng)) {
                //restaurant.id= listOfRestaurants.length
                listOfRestaurants.push(restaurant)
            }
    
        }
        //this.clearRestaurants()
        store.commit('CLEAR_RESTAURANTS')
        //store.commit('CLEAR_LOCATIONS')
        //this.addRestaurants(listOfRestaurants)
        store.commit('ADD_RESTAURANTS', listOfRestaurants)
    /*     for(let restaurant of listOfRestaurants){
            let location= new Location(restaurant.id, restaurant.lat, restaurant.long)
            store.commit('ADD_LOCATION',location)
        }, */
    },
    
    setRestaurantsAPI: (store) => {
        let listOfRestaurants= []
    
        axios.get("http://localhost/eat-nearby/src/data/restaurant-list.json").then(response => {
            let jsonContent= response.data
    
            for (let restaurant of jsonContent) {
                let myLatlng= new store.state.google.maps.LatLng(restaurant.lat, restaurant.long)
                if (store.state.screenBound.contains(myLatlng)) {
                    let restaurantToAdd= new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long)
                    for (let rating of restaurant.ratings) {
                        let ratingToAdd= new Rating(rating.stars, rating.comment, rating.author)
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
    },
    
    changeRestaurantFocus: (store, restaurant) => {
        store.commit('CHANGE_RESTAURANT_FOCUS', restaurant)
    },
    changeRestaurantFocusById: (store, id) => {
        let restaurantFocus= store.state.restaurants.filter(restaurant => restaurant.id === id)[0]
        //console.log(restaurantFocus)
        store.commit('CHANGE_RESTAURANT_FOCUS', restaurantFocus)
    },
    clearRestaurantFocus: (store) => {
        store.commit('CLEAR_RESTAURANT_FOCUS')
    },
    clearRestaurants: (store) => {
        store.commit('CLEAR_RESTAURANTS')
        store.commit('CLEAR_LOCATIONS')
    },
    clearRestaurantsJson: (store) => {
        store.commit('CLEAR_RESTAURANTS_JSON')
    },
}

// mutations
const mutations = {
    ADD_RESTAURANT: (state, restaurant) => {
        state.restaurants.push(restaurant)
    },
    DESTROY_RESTAURANT: (state, id) => {
        state.restaurants= state.restaurants.filter(restaurant => restaurant.id !== id)
    },
    DESTROY_RESTAURANT_JSON: (state, id) => {
        state.restaurantsJson= state.restaurantsJson.filter(restaurant => restaurant.id !== id)
    },
    ADD_RESTAURANT_JSON: (state, restaurant) => {
        state.restaurantsJson.push(restaurant)
    },
    INCREMENT_COUNTER: (state) => {
        state.counterRestaurants++
    },
    ADD_RESTAURANTS: (state, restaurants) => {
        for(let restaurant of restaurants){
            //restaurant.id= state.restaurants.length
            state.restaurants.push(restaurant)
        }
    },
    ADD_RESTAURANTS_JSON: (state, restaurants) => {
        for(let restaurant of restaurants){
            restaurant.id= state.restaurantsJson.length
            state.restaurantsJson.push(restaurant)
        }
    },
    ADD_RATING: (state, index, rating) => {
        state.restaurants[index].addRating(rating)
    },
    CHANGE_RESTAURANT_FOCUS: (state, restaurant) => {
        state.restaurantFocus= restaurant
    },
    CLEAR_RESTAURANT_FOCUS: state => {state.restaurantFocus= null},
    CLEAR_RESTAURANTS: state => {state.restaurants= []},
    CLEAR_RESTAURANTS_JSON: state => {state.restaurantsJson= []},
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}