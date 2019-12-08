<template>
  <div class="flex flex-col items-center bg-gray-200 px-8 pt-6 pb-8 mb-4 shadow-md rounded">
    <div class="form-name mb-3 w-full">
      <label
        class="tracking-wide font-bold mb-2 text-base pt-3 sm:text-base sm:p-2 sm:pt-3 sm:pr-0 md:text-lg md:p-2 md:pt-3 lg:p-2 lg:text-lg"
        for="name"
      >Le nom du restaurant:</label>
      <div>
        <input
          v-model="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mb-2"
          type="text"
          id="name"
          placeholder="Le nom du restaurant..."
        />
      </div>
    </div>
    <div class="form-address mb-3 w-full">
      <label
        class="tracking-wide font-bold mb-2 text-base pt-3 sm:text-base sm:p-2 sm:pt-3 sm:pr-0 md:text-lg md:p-2 md:pt-3 lg:p-2 lg:text-lg"
        for="address"
      >L'adresse du restaurant:</label>
      <div class>
        <input
          v-model="address"
          class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mb-2"
          type="text"
          id="address"
          placeholder="L'adresse du restaurant..."
        />
      </div>
    </div>
    <div class="form-city mb-3 w-full">
      <label
        class="tracking-wide font-bold mb-2 text-base pt-3 sm:text-base sm:p-2 sm:pt-3 sm:pr-0 md:text-lg md:p-2 md:pt-3 lg:p-2 lg:text-lg"
        for="city"
      >La ville du restaurant:</label>
      <div>
        <input
          v-model="city"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mb-2"
          type="text"
          id="city"
          placeholder="La ville du restaurant..."
        />
      </div>
    </div>
    <div class="form-zip-code mb-3 w-full">
      <label
        class="tracking-wide font-bold mb-2 text-base pt-3 sm:text-base sm:p-2 sm:pt-3 sm:pr-0 md:text-lg md:p-2 md:pt-3 lg:p-2 lg:text-lg"
        for="zip-code"
      >Le code postal:</label>
      <div>
        <input
          v-model="zip_code"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mb-2"
          type="text"
          id="zip-code"
          placeholder="Le code postal du restaurant..."
        />
      </div>
    </div>
    <div class="flex items-center space-between mt-4">
      <button
        class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        v-on:click="addNewRestaurant"
      >Valider</button>
      <button
        class="ml-2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        v-on:click="setAddingRestaurant"
      >Annuler</button>
    </div>
  </div>
</template>

<script>
import Restaurant from "../../entity/restaurant";
import Rating from "../../entity/rating";
import store from "../../store/index";
import Vuex from "vuex";

export default {
  store: store,
  props: ["coord"],
  data() {
    return {
      name: "",
      address: "",
      city: "",
      zip_code: ""
    };
  },
  methods: {
    ...Vuex.mapActions(["setAddingRestaurant"]),
    addNewRestaurant() {
      let self = this;
      if (
        self.name === "" ||
        self.address === "" ||
        self.city === "" ||
        self.zip_code === ""
      ) {
        return;
      }
      let restaurantData = {
        name: self.name,
        address: self.address,
        city: self.city,
        zip_code: self.zip_code,
        lat: self.coord.lat(),
        lng: self.coord.lng()
      };
      self.name = "";
      self.address = "";
      self.city = "";
      self.zip_code = "";
      self.$emit("formValidated", restaurantData);
    }
  },
  mounted() {}
};
</script>
<style>
.form-add-restaurant {
  position: relative;
  margin: auto 0;
}
</style>
