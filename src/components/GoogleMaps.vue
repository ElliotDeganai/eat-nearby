<template>

  <div class="gmaps">

  </div>


</template>

<script>
import gmapsInit from "../utils/gmaps"
import store from './RestaurantsStore'
import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';
import Vuex from 'vuex'
import axios from 'axios'
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
            'clearRestaurantFocus',
            'setScreenBound',
            'clearRestaurants',
            'setGoogle',
            'setStarFrom',
            'setStarTo'
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
        
        axios.get("http://localhost/eat-nearby/src/restaurant-list.json").then(response => {
            let jsonContent = response.data
            for(let restaurant of jsonContent){
              let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long)
            for(let rating of restaurant.ratings){
                let ratingToAdd = new Rating(rating.stars, rating.comment, rating.author)
                restaurantToAdd.addRatings(ratingToAdd)
            }
            let myLatlng = new this.google.maps.LatLng(restaurant.lat, restaurant.long)
            if(this.screenBound.contains(myLatlng)){
              listOfRestaurants.push(restaurantToAdd)
            }
                    
            }
            this.clearRestaurants()
            this.addRestaurants(listOfRestaurants)
        })
        return listOfRestaurants
      },
      setRestaurants(list){
        console.log(list)
        let listTemp = []
        for(let item of list){
          listTemp.push(item)
        }
        this.addRestaurants(listTemp)
      }
      },
      computed: {
         ...Vuex.mapGetters([
            'restaurants',
            'restaurant',
            'restaurantsCount',
            'restaurantsByRating',
            'restaurantFocus',
            'screenBound',
            'google',
            'starFrom',
            'starTo'
        ]),
      },
  async mounted() {
    
/* this.list = this.restaurants
this.locations = this.restaurantsPositions
      console.log(this.list)
      console.log(this.locations) */
         let self = this
         let markers = [];
  //console.log(self.setAPIRestaurants())
              

    try {
      const google = await gmapsInit();

            self.setGoogle(google)
      console.log(self.google)
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el, {disableDoubleClickZoom: false});

      var uluru = {lat: -25.344, lng: 131.036}
      console.log(uluru)
    
      let infoWindow = new google.maps.InfoWindow();

      geocoder.geocode({ address: "Paris" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }
        map.fitBounds(results[0].geometry.viewport);
        let boundsMap = map.getBounds()
console.log(map.getBounds())
self.setScreenBound(boundsMap)
//self.loadJsonRestaurant()
self.setAPIRestaurants()
console.log(self.restaurants)
//console.log(boundsMap)

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
        //map.fitBounds(results[0].geometry.viewport);
/*       console.log(JSON.parse(JSON.stringify(this.list)))
      console.log(JSON.parse(JSON.stringify(this.locations)))
      console.log(this.list) */



//var timeout = setTimeout(function(){}, 2000)
console.log(map.getCenter())
console.log(map.getBounds())

//let boundsMap = map.getBounds()
//this.setScreenBound(boundsMap)

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
      //self.loadJsonRestaurant()
                    
      map.addListener('bounds_changed', function(){
        let tempBoundsMap = map.getBounds()
        self.setScreenBound(tempBoundsMap)
        //self.loadJsonRestaurant()
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = []
        self.setAPIRestaurants()

            console.log(self.restaurantsByRating(self.starFrom, self.starTo))
            
               for(let restaurantForLocations of self.restaurantsByRating(self.starFrom, self.starTo)){
                console.log(restaurantForLocations)
                let location = {lat: restaurantForLocations.lat, lng: restaurantForLocations.long}
        let marker = new self.google.maps.Marker({position: location, map: map});
        
        markers.push(marker)
          google.maps.event.addListener(marker, 'click', function() {
          self.changeRestaurantFocus(self.restaurant(marker.getPosition().lat(), marker.getPosition().lng()))          
        });
}
console.log(markers)
        
      });



      //console.log(boundsMap.contains(marker.getPosition()))
      
      });

            console.log(self.restaurants)
               for(let restaurantForLocations of self.restaurants){
                console.log(restaurantForLocations)
                let location = {lat: restaurantForLocations.lat, lng: restaurantForLocations.long}
        let marker = new this.google.maps.Marker({position: location, map: map});
          google.maps.event.addListener(marker, 'click', function() {
          self.changeRestaurantFocus(self.restaurant(marker.getPosition().lat(), marker.getPosition().lng()))          
        });
}

      console.log(map.getCenter())
    } catch (error) {
      //console.error(error);
    }
    console.log(self.restaurants)
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