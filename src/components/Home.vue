<template>
  <div class="eat-nearby relative">
    <div class="mode-maps flex items-stretch" v-show="this.modeMaps">
      <div class="back-window" v-show="this.addingRestaurant"></div>
      <restaurant-list
        class="z-10 bg-white"
        :restaurantsList="this.restaurants"
        :selectedRestaurant="this.restaurantFocus"
        @focusActionned="onFocusActionned"
      />
      <br />
      <google-maps
        class="w-full"
        :locationsForMap="locationsForMap"
        :markerIdForAnimation="markerIdForAnimation"
        @mapClicked="onMapClicked"
        @markerClicked="onMarkerClicked"
        @boundChanged="onBoundChanged"
      />
      <modal class="z-50" v-show="this.addingRestaurant">
        <restaurant-form :coord="newRestaurantCoord" @formValidated="onFormValidated" />
      </modal>
      <div
        class="fixed bottom-0 z-20 bg-transparent mb-2 ml-16 mt-24 xs:mb-2 xs:ml-16 xs:mt-24 sm:mb-2 sm:ml-24 sm:mr-24 md:mb-2 md:ml-24 md:mr-24 lg:mb-2 lg:ml-40 lg:mr-24 xl:mb-2 xl:ml-56 xl:mr-32 text-center w-full"
      >
        <button
          @click="loadRestaurantPlaceApi"
          class="self-center font-bold bg-white shadow-lg border-gray-700 rounded-full focus:outline-none focus:shadow-outline hover:bg-gray-200 text-xs py-1 px-2"
        >Chercher ici</button>
      </div>
    </div>
    <div class="mode-restaurant" v-show="!this.modeMaps">
      <restaurant-vue :restaurantForVue="this.restaurantFocus" />
    </div>
  </div>
</template>

<script>
import RestaurantList from "./restaurant/RestaurantList.vue";
import RestaurantForm from "./restaurant/RestaurantForm.vue";
import RestaurantVue from "./restaurant/RestaurantVue.vue";
import GoogleMaps from "./GoogleMaps.vue";
import Modal from "./Modal.vue";
import Restaurant from "../entity/restaurant";
import Rating from "../entity/rating";
import Location from "../entity/location";
import store from "../store/index";
import Vuex from "vuex";
import { rawDataRestaurants, restaurantFocus } from "../store/getters";

export default {
  store: store,
  data() {
    return {
      newRestaurantCoord: "",
      newRestaurantToAdd: null,
      locationsForMap: [],
      markerIdForAnimation: null
    };
  },
  components: {
    RestaurantList,
    GoogleMaps,
    Modal,
    RestaurantForm,
    RestaurantVue
  },
  methods: {
    ...Vuex.mapActions([
      "addRestaurant",
      "addLocation",
      "addRestaurantJson",
      "addRestaurantsJson",
      "setRestaurants",
      "setLocations",
      "loadJsonRestaurant",
      "changeRestaurantFocus",
      "changeRestaurantFocusById",
      "setAddingRestaurant",
      "setModeMaps",
      "destroyAllMarkers",
      "getRestaurantSearchAPI",
      "addRawDataRestaurants",
      "clearRawDataRestaurant",
      "getRestaurantDetails",
      "getPhotoUrl",
      "getPhotoList"
    ]),
    onMapClicked(latLng) {
      let self = this;
      self.newRestaurantCoord = latLng;
      self.setAddingRestaurant();
    },
    onMarkerClicked(id) {
      let self = this;
      self.changeRestaurantFocusById(id).then(restaurant => {
        self.getPhotoUrl(restaurant).then(test => {
          self.rawDataRestaurants[restaurant.id].photos = test;
        });
      });
    },
    onBoundChanged() {
      let self = this;
      self.refreshRestaurants();
    },
    onFormValidated(restaurantData) {
      let self = this;
      let location = new Location(
        self.restaurantsJsonCount,
        restaurantData.lat,
        restaurantData.lng
      );
      let ratingToCreate = new Rating(3, "Popopo", "Dadju");

      let restaurantToCreate = new Restaurant(
        self.rawDataRestaurants.length,
        restaurantData.name,
        restaurantData.address,
        Number(restaurantData.lat),
        Number(restaurantData.lng),
        restaurantData.city,
        restaurantData.zip_code,
        1,
        0,
        [],
        0,
        []
      );
      restaurantToCreate.addRatings(ratingToCreate);
      restaurantToCreate.clearRatings();
      self.addRestaurantJson(restaurantToCreate);
      self.addRestaurant(restaurantToCreate);
      self.setAddingRestaurant();
    },
    onFocusActionned() {
      this.setModeMaps();
    },
    refreshRestaurants() {
      this.setRestaurants();
      this.setLocations();
    },
    loadRestaurantPlaceApi() {
      let self = this;
      setTimeout(function() {
        self.getRestaurantSearchAPI().then(listRestaurants => {
          self.clearRawDataRestaurant();
          self.addRawDataRestaurants(listRestaurants);
        });

        setTimeout(function() {
          let listRestaurants = self.rawDataRestaurants;
          for (let i = 0; i < self.rawDataRestaurants.length; i++) {
            self.getPhotoUrl(self.rawDataRestaurants[i]).then(test => {
              self.rawDataRestaurants[i].photoPresentation = test[0];
            });
          }
          self.refreshRestaurants();
        }, 3000);
      }, 2000);
    }
  },
  computed: {
    ...Vuex.mapGetters([
      "restaurantsJson",
      "restaurants",
      "locations",
      "restaurantJson",
      "restaurantFocus",
      "starFrom",
      "starTo",
      "locations",
      "restaurantById",
      "addingRestaurant",
      "modeMaps",
      "google",
      "service",
      "rawDataRestaurants",
      "screenBound",
      "previousRestaurantFocus"
    ])
  },
  watch: {
    starTo: function(val) {
      this.refreshRestaurants();
      this.locationsForMap = this.locations;
    },
    starFrom: function(val) {
      this.refreshRestaurants();
      this.locationsForMap = this.locations;
    },
    locations: function(val) {
      this.locationsForMap = this.locations;
    },
    restaurantFocus: function(val) {
      let self = this;
      if (self.restaurantFocus !== null && self.restaurantFocus !== undefined) {
        self.markerIdForAnimation = self.restaurantFocus.id;
        self.getPhotoUrl(self.restaurantFocus).then(test => {
          if (test !== null && test !== undefined && test.length !== 0) {
            self.rawDataRestaurants[self.restaurantFocus.id].photos = test;
          }
        });
      } else {
        self.markerIdForAnimation = self.previousRestaurantFocus.id;
      }
    }
  },
  mounted() {
    let self = this;
    setTimeout(function() {
      self.loadRestaurantPlaceApi();
    }, 3000);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.back-window {
  position: absolute;
  z-index: 40;
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