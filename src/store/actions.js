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
    
            for(let restaurant of jsonContent){

              let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long)
            for(let rating of restaurant.ratings){
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
  for(let restaurant of store.state.restaurantsJson.filter(restaurant => restaurant.averageRating >= Number(store.state.starFrom) && restaurant.averageRating <= Number(store.state.starTo))){
    

  let myLatlng = new store.state.google.maps.LatLng(restaurant.lat, restaurant.long)
  if(store.state.screenBound.contains(myLatlng)){
      //restaurant.id = listOfRestaurants.length
    listOfRestaurants.push(restaurant)
  }
          
  }
  //this.clearRestaurants()
  store.commit('CLEAR_RESTAURANTS')
  //this.addRestaurants(listOfRestaurants)
  store.commit('ADD_RESTAURANTS', listOfRestaurants)
}

export const setRestaurantsAPI = (store) => {
    let listOfRestaurants = []
        
    axios.get("http://localhost/eat-nearby/src/data/restaurant-list.json").then(response => {
        let jsonContent = response.data

        for(let restaurant of jsonContent){
            let myLatlng = new store.state.google.maps.LatLng(restaurant.lat, restaurant.long)
            if(store.state.screenBound.contains(myLatlng)){
          let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long)
        for(let rating of restaurant.ratings){
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

    export const placeMarker = (store, location, map, restaurantToPlace) => {
        //let self = this
    let marker = new store.getters.google.maps.Marker({
        position: location, 
        map: map
    })
          store.getters.google.maps.event.addListener(marker, 'click', function() {
          //this.changeRestaurantFocus(restaurantToPlace)
          store.commit('CHANGE_RESTAURANT_FOCUS', restaurantToPlace)
          //let latLngCenter = new store.state.google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng())
       
        });
            //this.setMarker(marker)
            store.commit('SET_MARKER', marker)
            //this.addRestaurant(restaurantToPlace)
            store.commit('ADD_RESTAURANT', restaurantToPlace)
            
      }
    export const addEventBoundChanged = (store) => {      
            self = this
            let map = store.state.map
            map.addListener('bounds_changed', function(){
            let tempBoundsMap = map.getBounds()
            //self.setScreenBound(tempBoundsMap)
            store.commit('SET_SCREEN_BOUND', tempBoundsMap)
            //self.destroyAllMarkers()
            store.commit('DESTROY_ALL_MARKER', tempBoundsMap)
            store.dispatch('setRestaurants')
                
                   for(let restaurantForLocations of store.state.restaurants){
                     let markerExist = false
                    let location = {lat: restaurantForLocations.lat, lng: restaurantForLocations.long}
            let marker = new store.state.google.maps.Marker({position: location, map: map});
    
            for(let mark of store.state.markers){
              if(marker.getPosition().lat() === mark.getPosition().lat() && marker.getPosition().lng() === mark.getPosition().lng()){
                markerExist = true
              }
            }
                  store.state.google.maps.event.addListener(marker, 'click', function() {
              store.dispatch('changeRestaurantFocus', 
              {
                restaurant: store.getters.restaurant(marker.getPosition().lat(), marker.getPosition().lng())[0]
              })
              let latLngCenter = new store.state.google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng())
              map.setCenter(latLngCenter) 
              store.commit('SET_MAPS_CENTER', latLngCenter)       
            });
    
      if(markerExist === false){
            store.commit('SET_MARKER', marker)
      }
    }
          });
          
    }

    export const addEventClickMarker = (store) => {
        //let self = this
        let map = store.state.map
        store.state.google.maps.event.addListener(map, 'click', function(event) {
  let ratingToCreate = new Rating(3, "Popopo", "Dadju")
  let latLngTest = new store.state.google.maps.LatLng(parseFloat(event.latLng.lat()), parseFloat(event.latLng.lng()))
  let restaurantToCreate = new Restaurant("Couscous", "17 rue de la Paroisse, 77500", Number(event.latLng.lat()), Number(event.latLng.lng()))
  console.log(restaurantToCreate)
  restaurantToCreate.addRatings(ratingToCreate)
  //self.addRestaurantJson(restaurantToCreate)
  store.dispatch('addRestaurantJson', 
  {
    restaurant: restaurantToCreate
  })
   //self.placeMarker(event.latLng, map, restaurantToCreate)
   store.dispatch('placeMarker', 
   {
    location: latLngTest,
    map: map,
    restaurantToPlace: restaurantToCreate
   })
})
      }