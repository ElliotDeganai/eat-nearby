<template>
  <div class="gmaps" @click="eventClickMarker" @bounds_changed="eventBoundChanger"></div>
</template>

<script>
import gmapsInit from "../utils/gmaps";
import store from "../store/index";
import Restaurant from "../entity/restaurant";
import Rating from "../entity/rating";
import Location from "../entity/location";
import MyMarker from "../entity/myMarker";
import Vuex from "vuex";
import axios from "axios";

/* import { setTimeout } from "timers";
import { markers } from "../store/getters"; */

export default {
  store: store,
  name: "gmaps",
  props: ['locationsForMap'],
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
      coordForMap: []
    }
  },
  methods: {
    ...Vuex.mapActions([
      "addRestaurant",
      "destroyRestaurant",
      "addRestaurantJson",
      "addRestaurants",
      "setRestaurants",
      "setLocations",
      "setRestaurantsAPI",
      "addRestaurantsJson",
      "loadJsonRestaurant",
      "changeRestaurantFocus",
      "clearRestaurantFocus",
      "clearRestaurants",
      "clearRestaurantsJson",
      "setStarFrom",
      "setStarTo",
      "incrementCounterRestaurants",
      "setScreenBound",
      "clearMarkers",
      "setMarkers",
      "setMarker",
      "setGoogle",
      "setMap",
      "setMapsCenter",
      "destroyAllMarkers",
      "destroyMarkersOutbound",
      "destroyMarker",
      "placeMarker",
      "addEventBoundChanged",
      "addEventClickMarker",
      "addLocation"
    ]),
    eventClickMarker() {
      let self = this;
      let map = this.map;
      //let location = null
      self.google.maps.event.addListener(map, "click", function(event) {
        let latLng = new self.google.maps.LatLng(
          event.latLng.lat(),
          event.latLng.lng()
        );
        let location = new Location(self.restaurantsJsonCount, event.latLng.lat(), event.latLng.lng())
        if(self.addingRestaurant === false){
        self.addLocation(location)
        self.placeMarker(latLng, location.id);
        //console.log(self.addingRestaurant)
        
          self.$emit('mapClicked', latLng) 
        }
         
      });
      
      
    },
    placeMarker(location, id, addMarker = true) {
        let self = this
        let map = this.map
    let marker = new self.google.maps.Marker({
        position: location, 
        map: map
    })
          self.google.maps.event.addListener(marker, 'click', function() {
                let latLngCenter = new self.google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng())
                map.setCenter(latLngCenter)
                self.setMapsCenter(latLngCenter)
             self.$emit('markerClicked', id)
        });
        //self.$store.commit('SET_MARKER', marker)
        let myMarker = new MyMarker(id, marker)
            if (addMarker === true) {
                self.setMarker(myMarker)
            } 
        //self.setMarker(marker)  
      }, 
      
  eventBoundChanger(){
    self = this
    let map = self.map
    map.addListener('bounds_changed', function () {
        let tempBoundsMap = map.getBounds()
        self.setScreenBound(tempBoundsMap)
        //store.commit('SET_SCREEN_BOUND', tempBoundsMap)
        self.destroyAllMarkers()
        //self.destroyMarkersOutbound()
        //store.commit('DESTROY_ALL_MARKER', tempBoundsMap)
        //self.setRestaurants()
        self.setLocations()
        

        for (let coord of self.coordForMap) {
            let markerExist = false
            let location = { lat: coord.position.lat, lng: coord.position.lng }
            //let marker = new self.google.maps.Marker({ position: location, map: map });

            if(self.markers.length !== 0){
            for (let mark of self.markers) {
                if (mark.id === coord.id) {
                    markerExist = true
                }
            }
            }
            let latLngCenter = new self.google.maps.LatLng(location.lat , location.lng)
            if(markerExist === true){
              self.placeMarker(latLngCenter, coord.id, false)
            }else{
              self.placeMarker(latLngCenter, coord.id)
            }
            
              
/*             if (markerExist === false) {
                self.setMarker(marker)
            }  */
        }
        self.$emit('boundChanged')
    });
},
  getLocationByCoords(coords, lat, lng){
     return coords.filter(location => ((location.position.lat === Number(lat.toFixed(6)) || location.position.lat === Number(lat.toFixed(7)) || (location.position.lat === Number(lat))) && ((location.position.lng === Number(lng.toFixed(6))) || (location.position.lng === Number(lng.toFixed(7))) || (location.position.lng === Number(lng)))))[0]
  },
  addClickMarkerEvent(){

  }
  },
  computed: {
    ...Vuex.mapGetters([
      "restaurants",
      "locations",
      "restaurantsJson",
      "restaurant",
      "restaurantJson",
      "restaurantsCount",
      "restaurantsJsonCount",
      "restaurantsByRating",
      "restaurantsJsonByRating",
      "restaurantFocus",
      "starFrom",
      "starTo",
      "counterRestaurants",
      "screenBound",
      "google",
      "map",
      "markers",
      "mapsCenter",
      "locationByCoords",
      "addingRestaurant"
    ])
  },
        watch : {
        restaurants:function(val) {
          let self = this
          self.coordForMap = []
          self.coordForMap = self.locationsForMap
          self.destroyAllMarkers();
          for(let coord of self.locations){
            let location = { lat: coord.position.lat, lng: coord.position.lng }
            self.placeMarker(location, coord.id)
      }
        },
/*         locationsForMap:function(val) {
          this.destroyAllMarkers();
          this.coordForMap = []
          for(let coord of this.locationsForMap){
            this.coordForMap.push(location)
            self.placeMarker(location, id)
          }
      } */
        }

        ,
  async mounted() {
    let self = this;
    //self.removeAllMarkers()
    //self.destroyAllMarkers();
    //self.destroyMarkersOutbound()



    try {
      const google = await gmapsInit();

      self.setGoogle(google);
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el, {
        disableDoubleClickZoom: false
      });
      self.setMap(map);

    

      //self.removeAllMarkers()
      //self.destroyAllMarkers();
      //self.destroyMarkersOutbound()

      var uluru = { lat: -25.344, lng: 131.036 };

      let infoWindow = new google.maps.InfoWindow();

      geocoder.geocode({ address: "Paris" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }
        map.fitBounds(results[0].geometry.viewport);
        let boundsMap = map.getBounds();
        self.setScreenBound(boundsMap);
        //self.loadJsonRestaurant()
        if (self.restaurantsJson.length === 0) {
          //self.setAPIRestaurants()
          self.loadJsonRestaurant();
        }



        infoWindow = new google.maps.InfoWindow();

        infoWindow = new google.maps.InfoWindow();

        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          if (self.mapsCenter === null) {
            self.setMapsCenter(pos);
          }

          var image =
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
          var markerPosition = new google.maps.Marker({
            position: pos,
            map: map,
            icon: image
          });
          //infoWindow.setPosition(pos);
          //infoWindow.setContent("Here you are!");
          map.setCenter(self.mapsCenter);
        });

    if(self.markers.length !== 0){
      for(let markObj of self.markers){
        
            let location = { lat: markObj.marker.getPosition().lat(), lng: markObj.marker.getPosition().lng() }
            let coord = self.getLocationByCoords(self.coordForMap, location.lat, location.lng)
            self.placeMarker(location, coord.id, false)
      }
    } 


        //self.EventBoundChanged(self.map)
        //self.addEventBoundChanged();
        self.eventBoundChanger()
      });

      //self.eventClickMarker();
      self.eventClickMarker()
      //self.addEventClickMarker()

    } catch (error) {
      console.error(error);
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