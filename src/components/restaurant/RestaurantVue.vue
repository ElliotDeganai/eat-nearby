<template>
  <div class="restaurant flex flex-wrap relative h-screen" v-if="!this.modeMaps">
    <div
      class="restaurant-details w-full sm:w-full md:w-1/2 lg:w-1/2 mb-4 border-solid border-r-4 border-gray-200"
    >
      <div v-if="this.restaurant.photos.length !== 0" class="carousel-restaurant flex flex-wrap">
        <div class="w-full relative">
          <div class="bg-blite opacity-25 absolute top-0 left-0 h-full w-full"></div>
          <img
            class="w-full h-32 sm:h-32 md:h-32 lg:h-64 xl:h-64 object-cover"
            :src="String(this.restaurant.photos[0].getUrl())"
          />
        </div>
        <div class="row flex w-full">
          <div class="item2 w-1/2">
            <div class>
              <img
                class="w-full h-32 sm:h-32 md:h-32 lg:h-64 xl:h-64 object-cover"
                :src="String(this.restaurant.photos[1].getUrl())"
              />
            </div>
          </div>
          <div class="item3 flex flex-wrap w-1/2">
            <div class="w-1/2">
              <img
                class="w-full h-16 sm:h-16 md:h-16 lg:h-32 xl:h-32 object-cover"
                :src="String(this.restaurant.photos[2].getUrl())"
              />
            </div>
            <div class="w-1/2">
              <img
                class="w-full h-16 sm:h-16 md:h-16 lg:h-32 xl:h-32 object-cover"
                :src="String(this.restaurant.photos[3].getUrl())"
              />
            </div>
            <div class="w-1/2">
              <img
                class="w-full h-16 sm:h-16 md:h-16 lg:h-32 xl:h-32 object-cover"
                :src="String(this.restaurant.photos[4].getUrl())"
              />
            </div>
            <div class="w-1/2">
              <img
                class="w-full h-16 sm:h-16 md:h-16 lg:h-32 xl:h-32 object-cover"
                :src="String(this.restaurant.photos[5].getUrl())"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-else class="carousel-restaurant flex flex-wrap">
        <div class="w-full relative">
          <div class="bg-blite opacity-25 absolute top-0 left-0 h-full w-full"></div>
          <img class="w-full object-cover" src="https://picsum.photos/400/100" />
        </div>
        <div class="row flex w-full">
          <div class="item2 w-1/2">
            <div class>
              <img class="w-full object-cover" src="https://picsum.photos/200/100" />
            </div>
          </div>
          <div class="item3 flex flex-wrap w-1/2">
            <div class="w-1/2">
              <img class="w-full object-cover" src="https://picsum.photos/100/50" />
            </div>
            <div class="w-1/2">
              <img class="w-full object-cover" src="https://picsum.photos/100/50" />
            </div>
            <div class="w-1/2">
              <img class="w-full object-cover" src="https://picsum.photos/100/50" />
            </div>
            <div class="w-1/2">
              <img class="w-full object-cover" src="https://picsum.photos/100/50" />
            </div>
          </div>
        </div>
      </div>

      <h1 class="title-restaurant text-2xl font-bold text-left px-4 py-4">{{ restaurant.name }}</h1>
      <div class="info-card px-4 text-left text-xs">
        <div>
          <div class="text-gray-600">{{ restaurant.address }}</div>
          <div class="text-gray-600">{{ restaurant.zip_code }} {{ restaurant.city }}</div>
          <rating-stars :rating="restaurant.averageRating" class="pt-4" />
        </div>
      </div>
      <p
        class="description-restaurant p-4 text-left text-sm"
      >"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </div>
    <div class="ratings w-full sm:w-full md:w-1/2 lg:w-1/2 text-left pr-4 relative">
      <div class="commentsSection max-h-screen">
        <h2 class="pl-8 pr-8 pt-8 pb-4 font-bold">Les avis</h2>

        <div
          class="pl-8 pr-8 pt-4 pb-4 border-t-2 border-b-2 newComment h-1/2"
          v-show="this.showCommentForm"
        >
          <h2 class="font-bold mb-4">Ajouter un nouveau commentaire</h2>
          <div class="mb-4 w-3/5">
            <label class="block text-gray-700 text-sm mb-2" for="newPseudo">Pseudo</label>
            <input
              v-model="newPseudo"
              type="text"
              placeholder="Entrez votre pseudo..."
              id="newPseudo"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm mb-2" for="newComment">Commentaire</label>
            <textarea
              v-model="newComment"
              type="textarea"
              id="newComment"
              placeholder="Entrez votre commentaire..."
              class="shadow w-full resize border rounded focus:outline-none focus:shadow-outline py-2 px-3 text-gray-700"
            ></textarea>
          </div>
          <div class>
            <select
              v-model="newRating"
              class="mb-4 block appearance-none bg-white border border-gray-400 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id
            >
              <option value>Note</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <button
              v-on:click.prevent="addComment()"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Ajouter</button>
          </div>
        </div>

        <div class="overflow-y-auto h-64">
          <ul class="flex flex-col-reverse">
            <li
              class="pl-8 pr-8 pt-4 pb-4 border-t"
              v-bind:key="rating.name"
              v-for="rating in restaurant.ratings"
            >
              <h4>{{ rating.author }}</h4>
              <p class="pt-2 pb-2">
                <rating-stars :rating="rating.star" />
              </p>
              <p class="text-xs pt-2 pb-2">{{ rating.comment }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="show-form-comment absolute top-0 right-0 mt-4 mr-4">
        <button
          class="flex text-sm border-solid border-2 hover:bg-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline rounded-full py-2 px-4"
          @click="this.setShowCommentForm"
        >
          <svg
            class="h-4 w-4 shadow-lg text-indigo-600"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
          </svg>
          <span class="pl-2">Rédiger un avis</span>
        </button>
      </div>
    </div>
    <div class="absolute">
      <button class="arrow-back flex text-white font-bold" @click="this.setModeMaps">
        <svg
          class="text-white block h-8 w-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path
            class="heroicon-ui text-white"
            d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
          />
        </svg>
        <span class="pl-2 pt-1 text-lg">Retour</span>
      </button>
    </div>
  </div>
</template>

<script>
import Restaurant from "../../entity/restaurant.js";
import Rating from "../../entity/rating";
import store from "../../store/index";
import Vuex from "vuex";
import RatingStars from "./../RatingStars.vue";

export default {
  store: store,
  props: ["restaurantForVue"],
  data() {
    return {
      restaurant: null,
      newPseudo: "",
      newComment: "",
      newRating: "",
      showCommentForm: false,
      photosToVue: [],
      ratingTest: 0
    };
  },
  methods: {
    ...Vuex.mapActions(["replaceRestaurant", "setModeMaps"]),
    addComment() {
      let restaurant = this.restaurant;
      if (
        this.newPseudo !== "" &&
        this.newComment !== "" &&
        this.newRating !== ""
      ) {
        let ratingToAdd = new Rating(
          Number(this.newRating),
          this.newComment,
          this.newPseudo
        );
        restaurant.addRatings(ratingToAdd);
        this.replaceRestaurant(restaurant);
      }
      this.newPseudo = "";
      this.newComment = "";
      this.newRating = "";
      this.setShowCommentForm();
    },
    setShowCommentForm() {
      this.showCommentForm = !this.showCommentForm;
    }
  },
  components: {
    RatingStars
  },
  computed: {
    ...Vuex.mapGetters(["modeMaps"])
  },
  watch: {
    restaurantForVue: function() {
      this.restaurant = this.restaurantForVue;
    }
  },
  mounted() {
    let self = this;
    self.restaurant = self.restaurantForVue;
  }
};
</script>

<style>
</style>