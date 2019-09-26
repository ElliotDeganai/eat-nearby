<template>
  
  <div class="gmaps">

  </div>


</template>

<script>
import gmapsInit from "../utils/gmaps"
import store from '../store/index'
import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';
import Vuex from 'vuex'
import axios from 'axios'
import { setTimeout } from 'timers';
import { markers } from '../store/getters';

export default {
  store: store,
  name: "gmaps",
  data() {
    return {
      testLocations: [
        {
          position: {
            lat: 48.8865035,
            lng: 2.3442197
          }
        },
        {
          position: {
            lat: 48.8737815,
            lng: 2.3501649
          }
        }
        // ...
      ],
      //markers: []
    }
  },
      methods: {
        ...Vuex.mapActions('restaurant', [
            'addRestaurant',
            'destroyRestaurant',
            'addRestaurantJson',
            'addRestaurants',
            'addRestaurantsJson',
            'loadJsonRestaurant',
            'changeRestaurantFocus',
            'clearRestaurantFocus',
            'clearRestaurants',
            'clearRestaurantsJson',
            'setStarFrom',
            'setStarTo',
            'incrementCounterRestaurants'
        ]),
        ...Vuex.mapActions('map', [
            'setScreenBound',
            'clearMarkers',
            'setMarkers',
            'setMarker',
            'setGoogle',
            'setMapsCenter',
            'destroyAllMarkers',
            'destroyMarkersOutbound',
            'destroyMarker'
        ]),
        getRestaurantByPosition(lat, lng){
          let restaurant = this.restaurant(lat, lng)
          if(restaurant !== undefined && restaurant !== null){
            return restaurant
          }else{
            return null
          }
        },
        setAPIRestaurants(){
         
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
            this.clearRestaurantsJson()
            this.addRestaurantsJson(listOfRestaurants)
        })
        return listOfRestaurants
      },
      setRestaurants(){
         
                  let listOfRestaurants = []
            for(let restaurant of this.restaurantsJsonByRating(Number(self.starFrom), Number(self.starTo))){

            let myLatlng = new this.google.maps.LatLng(restaurant.lat, restaurant.long)
            if(this.screenBound.contains(myLatlng)){
              listOfRestaurants.push(restaurant)
            }
                    
            }
            this.clearRestaurants()
            this.addRestaurants(listOfRestaurants)
      },
      EventBoundChanged(map){       
        let self = this
        map.addListener('bounds_changed', function(){
        let tempBoundsMap = map.getBounds()
        self.setScreenBound(tempBoundsMap)
        self.removeAllMarkers()
        //self.removeMarkersOutbounds()
        //self.destroyMarkersOutbound()
        self.setRestaurants()
            
               for(let restaurantForLocations of self.restaurants){
                 let markerExist = false
                //console.log(restaurantForLocations)
                let location = {lat: restaurantForLocations.lat, lng: restaurantForLocations.long}
        let marker = new self.google.maps.Marker({position: location, map: map});

        for(let mark of self.markers){
          if(marker.getPosition().lat() === mark.getPosition().lat() && marker.getPosition().lng() === mark.getPosition().lng()){
            markerExist = true
          }
        }
        //console.log(self.markers.includes(marker))
  
              self.google.maps.event.addListener(marker, 'click', function() {
          self.changeRestaurantFocus(self.restaurant(marker.getPosition().lat(), marker.getPosition().lng()))
          let latLngCenter = new self.google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng())
          map.setCenter(latLngCenter)  
          self.setMapsCenter(latLngCenter)        
        });

  if(markerExist === false){
        self.setMarker(marker)
  }
  //console.log(map.markers)
}
      });
      },

       removeAllMarkers() {
         let self = this
        for (var i = 0; i < self.markers.length; i++ ) {
          self.destroyMarker(i)
        }
          //self.markers = [];
      }, 
       removeMarkersOutbounds() {
        let self = this
        for (var i = 0; i < self.markers.length; i++ ) {
          let myLatlng = new self.google.maps.LatLng(self.markers[i].getPosition().lat(), self.markers[i].getPosition().lng())
          let restaurantToRemove = self.getRestaurantByPosition(self.markers[i].getPosition().lat(), self.markers[i].getPosition().lng())
          if((self.screenBound.contains(myLatlng) === false) || restaurantToRemove.averageRating < self.starFrom || restaurantToRemove.averageRating > self.starTo){
           self.destroyMarker(i)
           self.destroyRestaurant(restaurantToRemove)
          }
        }
          //markers = [];
      } ,
      placeMarker(location, map, restaurantToPlace) {
        let self = this
    let marker = new self.google.maps.Marker({
        position: location, 
        map: map
    })
          self.google.maps.event.addListener(marker, 'click', function() {
          self.changeRestaurantFocus(restaurantToPlace)
          let latLngCenter = new self.google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng())
       
        });
            self.setMarker(marker)
            self.addRestaurant(restaurantToPlace)
            
      },
      openFormRestaurant(marker, map){
                let contentString = `<div id="content">`+
            `<div id="siteNotice">`+
            `</div>`+
            `<h1 id="firstHeading" class="firstHeading">Uluru</h1>`+
            `<div id="bodyContent">`+
            `<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ` +
            `sandstone rock formation in the southern part of the `+
            `Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) `+
            `south west of the nearest large town, Alice Springs; 450&#160;km `+
            `(280&#160;mi) by road. Kata Tjuta and Uluru are the two major `+
            `features of the Uluru - Kata Tjuta National Park. Uluru is `+
            `sacred to the Pitjantjatjara and Yankunytjatjara, the `+
            `Aboriginal people of the area. It has many springs, waterholes, `+
            `rock caves and ancient paintings. Uluru is listed as a World `+
            `Heritage Site.</p>`+
            `<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">`+
            `https://en.wikipedia.org/w/index.php?title=Uluru</a> `+
            `(last visited June 22, 2009).</p>`+
            `</div>`+
            `</div>`;

        var infowindow = new this.google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });


      }
      },
      computed: {
        ...Vuex.mapGetters('restaurant', [
            'restaurants',
            'restaurantsJson',
            'restaurantsVisibles',
            'restaurant',
            'restaurantJson',
            'restaurantsCount',
            'restaurantsJsonCount',
            'restaurantsByRating',
            'restaurantsJsonByRating',
            'restaurantFocus',
            'starFrom',
            'starTo',
            'counterRestaurants'
        ]),
        ...Vuex.mapGetters('map', [
            'screenBound',
            'google',
            'markers',
            'mapsCenter',
        ]),
      },
  async mounted() {
         let self = this
    self.removeAllMarkers()
              
    try {
      const google = await gmapsInit();

            self.setGoogle(google)
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el, {disableDoubleClickZoom: false});

    self.removeAllMarkers()

      var uluru = {lat: -25.344, lng: 131.036}
    
      let infoWindow = new google.maps.InfoWindow();

      geocoder.geocode({ address: "Paris" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }
        map.fitBounds(results[0].geometry.viewport);
        let boundsMap = map.getBounds()
self.setScreenBound(boundsMap)
//self.loadJsonRestaurant()
if(self.restaurantsJson.length === 0){
self.setAPIRestaurants()
}

        infoWindow = new google.maps.InfoWindow();

        infoWindow = new google.maps.InfoWindow();

          navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };  

          if(self.mapsCenter === null){
            self.setMapsCenter(pos)
          }

          var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
          var markerPosition = new google.maps.Marker({position: pos, map: map, icon: image});
           infoWindow.setPosition(pos);
          infoWindow.setContent("Here you are!");
          map.setCenter(self.mapsCenter);
        });

      self.EventBoundChanged(map)
      console.log(self.markers)
      });

self.google.maps.event.addListener(map, 'click', function(event) {
  let ratingToCreate = new Rating(3, "Popopo", "Dadju")
  let restaurantToCreate = new Restaurant("Couscous", "17 rue de la Paroisse, 77500", event.latLng.lat(), event.latLng.lng())
  restaurantToCreate.addRatings(ratingToCreate)
  self.addRestaurantJson(restaurantToCreate)
   self.placeMarker(event.latLng, map, restaurantToCreate);
})
    } catch (error) {
      //console.error(error);
    }
  }
};
</script>

<style>
.gmaps {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>