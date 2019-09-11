<template>

  <div class="gmaps">

  </div>


</template>

<script>
import gmapsInit from "../utils/gmaps"
import store from './RestaurantsStore'
import Vuex from 'vuex'
import { setTimeout } from 'timers';

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
      ]
    }
  },
      methods: {
        ...Vuex.mapActions([
            'addRestaurant',
            'addRestaurants',
            'loadJsonRestaurant',
            'changeRestaurantFocus',
            'clearRestaurantFocus'
        ]),
        getRestaurantByPosition(lat, lng){
          let restaurant = this.restaurant(lat, lng)
          if(restaurant !== undefined && restaurant !== null){
            return restaurant
          }else{
            return null
          }
        }

      },
      computed: {
         ...Vuex.mapGetters([
            'restaurants',
            'restaurant',
            'restaurantsCount',
            'restaurantsByRating',
            'restaurantFocus'
        ]),
      },
  async mounted() {
    
/* this.list = this.restaurants
this.locations = this.restaurantsPositions
      console.log(this.list)
      console.log(this.locations) */

    try {
   
   var self = this
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el, {disableDoubleClickZoom: false});
      
      var uluru = {lat: -25.344, lng: 131.036}
      console.log(uluru)
      console.log(this.list)
      console.log(this.locations)
    
      let infoWindow = new google.maps.InfoWindow();

      geocoder.geocode({ address: "Paris" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }

        //this.locations = RestaurantList.getListOfLocations(RestaurantList.list);

/*         this.locations.map(
          x => new google.maps.Marker({ ...x, map })
        ); */

        infoWindow = new google.maps.InfoWindow();

        infoWindow = new google.maps.InfoWindow();

        // Try HTML5 geolocation.

          navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };  

            //navigator.geolocation.getCurrentPosition(function(position) {
          //var pos = {lat: -25.344, lng: 131.036}; 

          //infoWindow.open(map);
          var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
          var markerPosition = new google.maps.Marker({position: pos, map: map, icon: image});
           infoWindow.setPosition(pos);
          infoWindow.setContent("Here you are!");
          map.setCenter(pos);
        });

        //map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
/*       console.log(JSON.parse(JSON.stringify(this.list)))
      console.log(JSON.parse(JSON.stringify(this.locations)))
      console.log(this.list) */


var timeout = setTimeout(function(){}, 2000)
console.log(map.getCenter())
console.log(map.getBounds())
let boundsMap = map.getBounds()
console.log(boundsMap)
console.log(boundsMap)
      //let coordList = JSON.parse(JSON.stringify(this.locations))
/*               for(let coord of coordList){
                console.log(coord)
        var marker = new google.maps.Marker({position: coord, map: map});
          marker.addListener('click', function() {
          console.log(marker);
          console.log(self.restaurant(marker.getPosition().lat, marker.getPosition().lng));
          self.changeRestaurantFocus(self.restaurant(marker.getPosition().lat, marker.getPosition().lng))
        });
      }  */
               for(let restaurantForLocations of this.restaurants){
                console.log(restaurantForLocations)
                var location = {lat: restaurantForLocations.lat, lng: restaurantForLocations.long}
        let marker = new google.maps.Marker({position: location, map: map});
          google.maps.event.addListener(marker, 'click', function() {
          console.log(marker.getPosition().lat());
          console.log(marker.getPosition().lng());
          console.log(marker);
          console.log(self.restaurant(marker.getPosition().lat(), marker.getPosition().lng()));
          self.changeRestaurantFocus(self.restaurant(marker.getPosition().lat(), marker.getPosition().lng()))
          console.log(boundsMap.contains(marker.getPosition()))
          
        });
        console.log(marker.getPosition())
        console.log(map.getCenter())
        console.log(boundsMap.contains(marker.getPosition()))
      }
      });
      console.log(map.getCenter())
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
}
</style>