<template>
    <div class="flex eat-nearby">
      <div><button @click="this.destroyAllMarkers">Remove Markers</button> </div>
      <div class="back-window" v-show="this.addingRestaurant"></div>
            <restaurant-list :restaurantsList="this.restaurants" :selectedRestaurant="this.restaurantFocus"/>
            <br>
            <google-maps :locationsForMap="locationsForMap" @mapClicked="onMapClicked" @markerClicked="onMarkerClicked" @boundChanged="onBoundChanged"/>
            <modal v-show="this.addingRestaurant">
              <restaurant-form :coord="newRestaurantCoord" @formValidated="onFormValidated"/>
            </modal>
    </div>
</template>

<script>
import RestaurantList from './RestaurantList.vue'
import RestaurantForm from './RestaurantForm.vue'
import GoogleMaps from './GoogleMaps.vue'
import Modal from './Modal.vue'
import Restaurant from "../entity/restaurant";
import Rating from "../entity/rating";
import Location from "../entity/location";
import store from '../store/index'
import Vuex from 'vuex'
//import VModal from 'vue-js-modal';

export default {
  store: store,
  data() {
    return {
      newRestaurantCoord: '',
      newRestaurantToAdd: null,
      locationsForMap: [],

    }
  },
  components: {
    RestaurantList, GoogleMaps, Modal, RestaurantForm
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
        'addEventClickMarker',
        'changeRestaurantFocusById',
        'setAddingRestaurant'
    ]),
    onMapClicked(latLng){
      let self = this
/*         let ratingToCreate = new Rating(3, "Popopo", "Dadju");

        let restaurantToCreate = new Restaurant(
          "Couscous",
          "17 rue de la Paroisse, 77500",
          Number(latLng.lat()),
          Number(latLng.lng())
        );
        restaurantToCreate.addRatings(ratingToCreate);
        self.addRestaurantJson(restaurantToCreate);
        self.addRestaurant(restaurantToCreate) */
        self.newRestaurantCoord = latLng
        self.setAddingRestaurant()
    },
    onMarkerClicked(id){
      let self = this
      self.changeRestaurantFocusById(id)

      

      //this.$store.commit('CHANGE_RESTAURANT_FOCUS', id);
    },
    onBoundChanged(){
      let self = this
      self.setRestaurants()
    },
    onFormValidated(restaurantData){
      let self = this
         let ratingToCreate = new Rating(3, "Popopo", "Dadju");

        let restaurantToCreate = new Restaurant(
          restaurantData.name,
          restaurantData.address,
          Number(restaurantData.lat),
          Number(restaurantData.lng)
        );
        restaurantToCreate.addRatings(ratingToCreate);
        self.addRestaurantJson(restaurantToCreate);
        self.addRestaurant(restaurantToCreate)
        self.setAddingRestaurant()
    },
    restoRemoved(){
      let self = this
      self.clearRestaurants()
    },
  },
  computed: {
    ...Vuex.mapGetters([
        'restaurantsJson',
        'restaurants',
        "locations",
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
        'locations',
        'restaurantById',
        'addingRestaurant'
    ]),
    },
        watch : {
        starTo:function(val) {
          this.setRestaurants()
          this.locationsForMap = this.locations
        },
        starFrom : function (val) {
          this.setRestaurants()
          this.locationsForMap = this.locations
        },
        locations:function(val){
          this.locationsForMap = this.locations
        }
/*     restaurants: {
      get() {
        return this.$store.state.restaurants
      },
      set() {
        this.setRestaurantsAPI()
      }
      }
    ,
    coords: {
      get() {
      },
      set() {
      }
    }*/
  }, 
  mounted(){
/*     let self = this
    self.setRestaurantsAPI() */
          this.setRestaurants()
          this.locationsForMap = this.locations

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.back-window{
  position: absolute;
  z-index: 5;
  background-color: black;
  opacity: 0.5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 110%;
}
</style>