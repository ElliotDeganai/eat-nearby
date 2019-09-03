<template>
  <div class="gmaps" />
</template>

<script>
import gmapsInit from "../utils/gmaps";
import RestaurantList from "../entity/restaurantList";

export default {
  name: "gmaps",
  data() {
    return {
      locations: [],
      list: RestaurantList,
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
    };
  },
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);
      let infoWindow = new google.maps.InfoWindow();

      geocoder.geocode({ address: "Paris" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }

        this.locations = RestaurantList.getListOfLocations(RestaurantList.list);

        this.locations.map(
          x => new google.maps.Marker({ ...x, map })
        );

        infoWindow = new google.maps.InfoWindow();

        infoWindow = new google.maps.InfoWindow();

        // Try HTML5 geolocation.

        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        });

        //map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });
    } catch (error) {
      //console.error(error);
    }
  }
};
</script>

<style>
.gmaps {
  width: 100%;
  height: 400px;
}
</style>