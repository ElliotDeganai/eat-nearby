<template>
  <div class="eat-nearby">
    <div class="mode-maps flex items-stretch" v-show="this.modeMaps">
      <div class="back-window" v-show="this.addingRestaurant"></div>
      <restaurant-list
        :restaurantsList="this.restaurants"
        :selectedRestaurant="this.restaurantFocus"
        @focusActionned="onFocusActionned"
      />
      <br />
      <google-maps
        :locationsForMap="locationsForMap"
        @mapClicked="onMapClicked"
        @markerClicked="onMarkerClicked"
        @boundChanged="onBoundChanged"
      />
      <modal class="" v-show="this.addingRestaurant">
        <restaurant-form :coord="newRestaurantCoord" @formValidated="onFormValidated" />
      </modal>
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
//import VModal from 'vue-js-modal';

export default {
  store: store,
  data() {
    return {
      newRestaurantCoord: "",
      newRestaurantToAdd: null,
      locationsForMap: []
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
      "setRestaurants",
      "setLocations",
      "loadJsonRestaurant",
      "changeRestaurantFocus",
      "changeRestaurantFocusById",
      "setAddingRestaurant",
      "setModeMaps",
      "destroyAllMarkers"
    ]),
    onMapClicked(latLng) {
      let self = this;
      self.newRestaurantCoord = latLng;
      self.setAddingRestaurant();
    },
    onMarkerClicked(id) {
      let self = this;
      self.changeRestaurantFocusById(id);
    },
    onBoundChanged() {
      let self = this;
      self.setRestaurants();
      self.setLocations();
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
        restaurantData.name,
        restaurantData.address,
        Number(restaurantData.lat),
        Number(restaurantData.lng),
        restaurantData.city,
        restaurantData.zip_code
      );
      restaurantToCreate.addRatings(ratingToCreate);
      self.addRestaurantJson(restaurantToCreate);
      self.addLocation(location);
      //self.addRestaurant(restaurantToCreate);
      self.setAddingRestaurant();
    },
    onFocusActionned() {
      self.setModeMaps();
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
      "modeMaps"
    ])
  },
  watch: {
    starTo: function(val) {
      this.setRestaurants();
      this.setLocations();
      this.locationsForMap = this.locations;
    },
    starFrom: function(val) {
      this.setRestaurants();
      this.setLocations();
      this.locationsForMap = this.locations;
    },
    locations: function(val) {
      this.locationsForMap = this.locations;
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
  mounted() {
    /*     let self = this
    self.setRestaurantsAPI() */
    this.loadJsonRestaurant();
    this.setRestaurants();
    this.locationsForMap = this.locations;
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