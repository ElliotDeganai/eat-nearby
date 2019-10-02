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
      locations: [],

      //markers: []
    }
  },
      methods: {
        ...Vuex.mapActions([
            'addRestaurant',
            'destroyRestaurant',
            'addRestaurantJson',
            'addRestaurants',
            'setRestaurants',
            'setRestaurantsAPI',
            'addRestaurantsJson',
            'loadJsonRestaurant',
            'changeRestaurantFocus',
            'clearRestaurantFocus',
            'clearRestaurants',
            'clearRestaurantsJson',
            'setStarFrom',
            'setStarTo',
            'incrementCounterRestaurants',
            'setScreenBound',
            'clearMarkers',
            'setMarkers',
            'setMarker',
            'setGoogle',
            'setMap',
            'setMapsCenter',
            'destroyAllMarkers',
            'destroyMarkersOutbound',
            'destroyMarker',
            'placeMarker',
            'addEventBoundChanged',
            'addEventClickMarker'
        ]),
        getRestaurantByPosition(lat, lng){
          let restaurant = this.restaurant(lat, lng)
          if(restaurant !== undefined && restaurant !== null){
            return restaurant
          }else{
            return null
          }
        },
      eventClickMarker(){
        let self = this
        let map = this.map
        self.google.maps.event.addListener(map, 'click', function(event) {
  let ratingToCreate = new Rating(3, "Popopo", "Dadju")
  let latLngTest = new self.google.maps.LatLng(event.latLng.lat(), event.latLng.lng())
  let restaurantToCreate = new Restaurant("Couscous", "17 rue de la Paroisse, 77500", Number(latLngTest.lat()), Number(latLngTest.lng()))
  console.log(restaurantToCreate)
  restaurantToCreate.addRatings(ratingToCreate)
  self.addRestaurantJson(restaurantToCreate)
   self.placeMarker(latLngTest, map, restaurantToCreate);
})
      },
/*         placeMarker(location, map, restaurantToPlace) {
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
            
      } ,  */

      },
      computed: {
        ...Vuex.mapGetters([
            'restaurants',
            'restaurantsJson',
            'restaurant',
            'restaurantJson',
            'restaurantsCount',
            'restaurantsJsonCount',
            'restaurantsByRating',
            'restaurantsJsonByRating',
            'restaurantFocus',
            'starFrom',
            'starTo',
            'counterRestaurants',
            'screenBound',
            'google',
            'map',
            'markers',
            'mapsCenter',
        ]),
      },
  async mounted() {
         let self = this
    //self.removeAllMarkers()
    self.destroyAllMarkers()
              
    try {
      const google = await gmapsInit();

            self.setGoogle(google)
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el, {disableDoubleClickZoom: false});
      self.setMap(map)

    //self.removeAllMarkers()
    self.destroyAllMarkers()

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
//self.setAPIRestaurants()
self.loadJsonRestaurant()
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

      //self.EventBoundChanged(self.map)
      self.addEventBoundChanged()
      console.log(self.markers)
      });

    self.eventClickMarker()
    //self.addEventClickMarker()
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