<template>
  <div class="gmaps"></div>
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

export default {
  store: store,
  name: "gmaps",
  props: ["locationsForMap", "markerIdForAnimation"],
  data() {
    return {
      coordForMap: [],
      idAnimation: null
    };
  },
  methods: {
    ...Vuex.mapActions([
      "setScreenBound",
      "clearMarkers",
      "setMarkers",
      "setMarker",
      "setGoogle",
      "setMap",
      "setService",
      "setMapsCenter",
      "destroyAllMarkers",
      "getRestaurantSearchAPI",
      "clearRawDataRestaurant",
      "addRawDataRestaurants",
      ,
      "setRestaurants"
    ]),
    eventClickMarker() {
      let self = this;
      let map = this.map;
      self.google.maps.event.addListener(map, "click", function(event) {
        let latLng = new self.google.maps.LatLng(
          event.latLng.lat(),
          event.latLng.lng()
        );
        self.$emit("mapClicked", latLng);
      });
    },
    placeMarker(location, id, addMarker = true) {
      let self = this;
      let map = this.map;
      let marker = new self.google.maps.Marker({
        position: location,
        map: map
      });
      self.google.maps.event.addListener(marker, "click", function() {
        let latLngCenter = new self.google.maps.LatLng(
          marker.getPosition().lat(),
          marker.getPosition().lng()
        );
        self.$emit("markerClicked", id);
      });
      let myMarker = new MyMarker(id, marker);
      if (addMarker === true) {
        self.setMarker(myMarker);
      }
    },
    toggleBounce(marker) {
      let self = this;
      if (
        marker.getAnimation() !== null &&
        marker.getAnimation() !== undefined
      ) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(self.google.maps.Animation.BOUNCE);
      }
    },
    eventBoundChanger() {
      self = this;

      let map = self.map;
      map.addListener("bounds_changed", function() {
        let tempBoundsMap = map.getBounds();
        self.setScreenBound(tempBoundsMap);
        self.destroyAllMarkers();
        for (let coord of self.coordForMap) {
          let markerExist = false;
          let location = { lat: coord.position.lat, lng: coord.position.lng };
          if (self.markers.length !== 0) {
            for (let mark of self.markers) {
              if (mark.id === coord.id) {
                markerExist = true;
              }
            }
          }
          let latLngCenter = new self.google.maps.LatLng(
            location.lat,
            location.lng
          );
          if (markerExist === true) {
            self.placeMarker(latLngCenter, coord.id, false);
          } else {
            self.placeMarker(latLngCenter, coord.id);
          }
        }
        self.$emit("boundChanged");
      });
    },
    getLocationByCoords(coords, lat, lng) {
      return coords.filter(
        location =>
          (location.position.lat === Number(lat.toFixed(6)) ||
            location.position.lat === Number(lat.toFixed(7)) ||
            location.position.lat === Number(lat)) &&
          (location.position.lng === Number(lng.toFixed(6)) ||
            location.position.lng === Number(lng.toFixed(7)) ||
            location.position.lng === Number(lng))
      )[0];
    },
    getMarkerById(id) {
      let self = this;
      return self.markers.filter(marker => marker.id === id)[0];
    },
    async initMap() {
      let self = this;
      let restaurants = [];
      try {
        const google = await gmapsInit();

        self.setGoogle(window.google);
        const geocoder = new window.google.maps.Geocoder();
        const map = new window.google.maps.Map(this.$el, {
          disableDoubleClickZoom: false
        });
        self.setMap(map);
        let service = new google.maps.places.PlacesService(self.map);
        self.setService(service);

        var uluru = { lat: -25.344, lng: 131.036 };

        let infoWindow = new window.google.maps.InfoWindow();

        geocoder.geocode({ address: "Paris" }, (results, status) => {
          if (status !== "OK" || !results[0]) {
            throw new Error(status);
          }
          map.fitBounds(results[0].geometry.viewport);
          let boundsMap = map.getBounds();
          self.setScreenBound(boundsMap);

          infoWindow = new window.google.maps.InfoWindow();

          infoWindow = new window.google.maps.InfoWindow();

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
            var markerPosition = new window.google.maps.Marker({
              position: pos,
              map: map,
              icon: image
            });
            map.setCenter(self.mapsCenter);
          });
          self.eventBoundChanger();
        });
        self.eventClickMarker();
      } catch (error) {
        console.error(error);
      }
    }
  },

  computed: {
    ...Vuex.mapGetters([
      "screenBound",
      "google",
      "map",
      "service",
      "markers",
      "mapsCenter",
      "rawDataRestaurants",
      "restaurantFocus",
      "previousRestaurantFocus"
    ])
  },
  watch: {
    locationsForMap: function(val) {
      let self = this;
      self.coordForMap = [];
      self.coordForMap = self.locationsForMap;
      self.destroyAllMarkers();
      for (let coord of self.coordForMap) {
        let location = { lat: coord.position.lat, lng: coord.position.lng };
        self.placeMarker(location, coord.id);
      }
    },
    restaurantFocus: function(val) {
      let self = this;
      let previousMark = null;
      if (self.previousRestaurantFocus !== null) {
        previousMark = self.getMarkerById(self.previousRestaurantFocus.id);
      }

      self.idAnimation = self.markerIdForAnimation;
      if (self.idAnimation !== null && self.idAnimation !== undefined) {
        let mark = self.getMarkerById(self.idAnimation);
        self.toggleBounce(mark.marker);
      }

      if (previousMark !== null) {
        if (
          previousMark.marker.getAnimation() !== null &&
          previousMark.marker.getAnimation() !== undefined
        ) {
          previousMark.marker.setAnimation(null);
        }
      }
    }
  },

  mounted() {
    this.initMap();
  }
};
</script>

<style>
.gmaps {
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>