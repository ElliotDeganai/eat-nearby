import axios from 'axios'
import Restaurant from '../entity/restaurant';
import Rating from '../entity/rating';
import Location from '../entity/location';


export const addRestaurant = (store, restaurant) => {
    store.commit('ADD_RESTAURANT', restaurant)
    let location = new Location(restaurant.id, restaurant.lat, restaurant.long)
    store.commit('ADD_LOCATION', location)
}
export const destroyRestaurant = (store, restaurant) => {
    store.commit('DESTROY_RESTAURANT', restaurant)
}
export const replaceRestaurant = (store, newRestaurant) => {
    store.commit('DESTROY_RESTAURANT_JSON', newRestaurant.id)
    store.commit('ADD_RESTAURANT_JSON', newRestaurant)
}
export const addRestaurantJson = (store, restaurant) => {
    if (restaurant.id === 0) {
        restaurant.id = store.state.restaurantsJson.length
    }
    store.commit('ADD_RESTAURANT_JSON', restaurant)
}
export const incrementCounterRestaurants = (store) => {
    store.commit('INCREMENT_COUNTER')
}
export const addComment = (store, rating) => {
    let restaurant = store.state.restaurantFocus[0]
    let indexRestaurant = store.state.restaurants.findIndex((restaurantArray) => {
        restaurantArray.name === restaurant.name
    })
    store.commit('ADD_RATING', indexRestaurant, rating)
}
export const addRestaurants = (store, restaurants) => {
    store.commit('ADD_RESTAURANTS', restaurants)
    for (let restaurant of restaurants) {
        let location = new Location(restaurant.id, restaurant.lat, restaurant.long)
        store.commit('ADD_LOCATION', location)
    }
}
export const addRestaurantsJson = (store, restaurants) => {
    store.commit('ADD_RESTAURANTS_JSON', restaurants)
}
export const addRawDataRestaurants = (store, restaurants) => {
    store.commit('ADD_RAW_DATA_RESTAURANTS', restaurants)
}
export const addRawDataRestaurant = (store, restaurant) => {
    store.commit('ADD_RAW_DATA_RESTAURANT', restaurant)
}
export const clearRawDataRestaurant = (store) => {
    store.commit('CLEAR_RAW_DATA_RESTAURANT')
}
export const loadJsonRestaurant = (store) => {

    let listOfRestaurants = []

    axios.get("/data/restaurant-list.json").then(response => {
        let jsonContent = response.data

        for (let restaurant of jsonContent) {

            let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long, restaurant.city, restaurant.zip_code)
            for (let rating of restaurant.ratings) {
                let ratingToAdd = new Rating(rating.stars, rating.comment, rating.author)
                restaurantToAdd.addRatings(ratingToAdd)
            }
            listOfRestaurants.push(restaurantToAdd)


        }
        store.commit('CLEAR_RESTAURANTS_JSON')
        store.commit('ADD_RESTAURANTS_JSON', listOfRestaurants)
    });
    return listOfRestaurants
}

export const loadPlacesRestaurant = (store) => {

    let self = this;
    let listOfRestaurants = [];
    let request = {
        bounds: store.state.screenBound,
        type: ['restaurant']
    };
    let service = new store.state.google.maps.places.PlacesService(store.state.map);
    service.nearbySearch(request,
        function callback(results, status) {
            if (status == store.state.google.maps.places.PlacesServiceStatus.OK) {

                for (var i = 0; i < results.length; i++) {
                    let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long, restaurant.city, restaurant.zip_code)
                    for (let rating of restaurant.ratings) {
                        let ratingToAdd = new Rating(rating.stars, rating.comment, rating.author)
                        restaurantToAdd.addRatings(ratingToAdd)
                    }
                    listOfRestaurants.push(restaurantToAdd)
                }
            }
        });
    store.commit('CLEAR_RESTAURANTS_JSON')
    store.commit('ADD_RESTAURANTS_JSON', listOfRestaurants);
    return listOfRestaurants;
}

export const setRestaurants = (store) => {
    let listOfRestaurantsToAdd = [];
    for (let rawRestaurant of store.state.rawDataRestaurants.filter(restaurant => restaurant.averageRating >= Number(store.state.starFrom) && restaurant.averageRating <= Number(store.state.starTo))) {
        let myLatlng = new store.state.google.maps.LatLng(rawRestaurant.lat, rawRestaurant.long);
        if (store.state.screenBound.contains(myLatlng)) {
            listOfRestaurantsToAdd.push(rawRestaurant);
        }

    }
    for (let restaurantJson of store.state.restaurantsJson.filter(restaurant => restaurant.averageRating >= Number(store.state.starFrom) && restaurant.averageRating <= Number(store.state.starTo))) {
        let myLatlng = new store.state.google.maps.LatLng(restaurantJson.lat, restaurantJson.long);
        if (store.state.screenBound.contains(myLatlng)) {
            listOfRestaurantsToAdd.push(restaurantJson);
        }

    }
    store.commit('CLEAR_RESTAURANTS');
    store.commit('ADD_RESTAURANTS', listOfRestaurantsToAdd);

}

export const setLocations = (store) => {
    let listOfLocations = []
    for (let rawRestaurant of store.state.rawDataRestaurants.filter(restaurant => restaurant.averageRating >= Number(store.state.starFrom) && restaurant.averageRating <= Number(store.state.starTo))) {
        let myLatlng = new store.state.google.maps.LatLng(rawRestaurant.lat, rawRestaurant.long)
        if (store.state.screenBound.contains(myLatlng)) {
            let location = new Location(rawRestaurant.id, rawRestaurant.lat, rawRestaurant.long)
            listOfLocations.push(location)
        }
    }
    for (let restaurantJson of store.state.restaurantsJson.filter(restaurant => restaurant.averageRating >= Number(store.state.starFrom) && restaurant.averageRating <= Number(store.state.starTo))) {
        let myLatlng = new store.state.google.maps.LatLng(restaurantJson.lat, restaurantJson.long);
        if (store.state.screenBound.contains(myLatlng)) {
            let location = new Location(restaurantJson.id, restaurantJson.lat, restaurantJson.long)
            listOfLocations.push(location)
        }

    }
    store.commit('CLEAR_LOCATIONS')
    store.commit('ADD_LOCATIONS', listOfLocations)
}

export const setRestaurantsAPI = (store) => {
    let listOfRestaurants = []

    axios.get("http://localhost/eat-nearby/src/data/restaurant-list.json").then(response => {
        let jsonContent = response.data

        for (let restaurant of jsonContent) {
            let myLatlng = new store.state.google.maps.LatLng(restaurant.lat, restaurant.long)
            if (store.state.screenBound.contains(myLatlng)) {
                let restaurantToAdd = new Restaurant(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long)
                for (let rating of restaurant.ratings) {
                    let ratingToAdd = new Rating(rating.stars, rating.comment, rating.author)
                    restaurantToAdd.addRatings(ratingToAdd)
                }
                listOfRestaurants.push(restaurantToAdd)
            }

        }
        store.commit('CLEAR_RESTAURANTS_JSON');
        store.commit('ADD_RESTAURANTS_JSON', listOfRestaurants);
    })
    return listOfRestaurants;
}

export const changeRestaurantFocus = (store, restaurant) => {
    store.commit('CHANGE_PREVIOUS_RESTAURANT_FOCUS', store.state.restaurantFocus);
    store.commit('CHANGE_RESTAURANT_FOCUS', restaurant);
}
export const getRestaurantDetails = (store, id) => {
    var requestDetail = { placeId: id, fields: ['reviews', 'photos', 'address_components'] };
    let restaurantFocus = store.state.restaurants.filter(restaurant => restaurant.id === id)[0]
    store.state.service.getDetails(requestDetail,
        function callback(result, status) {
            if (status == store.state.google.maps.places.PlacesServiceStatus.OK) {
                console.log(result)
                for (let review of result.reviews) {
                    let rating = new Rating(review.rating, review.text, review.author_name);
                    restaurantFocus.ratings.push(rating);
                }
                restaurantFocus.zip_code = result.address_components[2].long_name;
                restaurantFocus.city = result.address_components[6].long_name;
                restaurantFocus.photos = result.photos;
            }
        });
    return restaurantFocus;
}
export const changeRestaurantFocusById = (store, id) => {
    let restaurantFocus = store.state.restaurants.filter(restaurant => restaurant.id === id)[0];
    if (restaurantFocus.zip_code === null) {
        var requestDetail = { placeId: restaurantFocus.placeId, fields: ['reviews', 'photos', 'address_components'] };
        store.state.service.getDetails(requestDetail,
            function callback(result, status) {
                if (status == store.state.google.maps.places.PlacesServiceStatus.OK) {
                    for (let review of result.reviews) {
                        let rating = new Rating(review.rating, review.text, review.author_name);
                        restaurantFocus.ratings.push(rating);
                    }
                    restaurantFocus.zip_code = result.address_components[2].long_name;
                    restaurantFocus.city = result.address_components[6].long_name;
                    restaurantFocus.photos = result.photos;
                }
            });
    }
    store.commit('CHANGE_PREVIOUS_RESTAURANT_FOCUS', store.state.restaurantFocus);
    store.commit('CHANGE_RESTAURANT_FOCUS', restaurantFocus);
    return restaurantFocus;
}
export const addLocation = (store, location) => {
    store.commit('ADD_LOCATION', location)
}
export const addLocations = (store, locations) => {
    store.commit('ADD_LOCATIONS', locations)
}
export const setScreenBound = (store, area) => {
    store.commit('SET_SCREEN_BOUND', area)
}
export const setGoogle = (store, google) => {
    store.commit('SET_GOOGLE', google)
}
export const setMap = (store, map) => {
    store.commit('SET_MAP', map)
}
export const setService = (store, service) => {
    store.commit('SET_SERVICE', service)
}
export const setMarkers = (store, markers) => {
    store.commit('SET_MARKERS', markers)
}
export const setMarker = (store, marker) => {
    store.commit('SET_MARKER', marker)
}
export const setMapsCenter = (store, center) => {
    store.commit('SET_MAPS_CENTER', center)
}
export const setStarFrom = (store, star) => {
    store.commit('SET_STAR_FROM', star)
}
export const setStarTo = (store, star) => {
    store.commit('SET_STAR_TO', star)
}
export const clearRestaurantFocus = (store) => {
    store.commit('CHANGE_PREVIOUS_RESTAURANT_FOCUS', store.state.restaurantFocus)
    store.commit('CLEAR_RESTAURANT_FOCUS')
}
export const clearRestaurants = (store) => {
    store.commit('CLEAR_RESTAURANTS')
    store.commit('CLEAR_LOCATIONS')
}
export const clearLocations = (store) => {
    store.commit('CLEAR_LOCATIONS')
}
export const clearRestaurantsJson = (store) => {
    store.commit('CLEAR_RESTAURANTS_JSON')
}
export const clearMarkers = (store) => {
    store.commit('CLEAR_MARKERS')
}
export const destroyMarkersOutbound = (store) => {
    let self = this
    for (let i = 0; i < store.state.markers.length; i++) {
        let myLatlng = new store.state.google.maps.LatLng(store.state.markers[i].getPosition().lat(), store.state.markers[i].getPosition().lng())

        if (store.state.screenBound.contains(myLatlng) === false) {
            store.commit('DESTROY_MARKER', i)
        }
    }
}
export const destroyAllMarkers = (store) => {
    store.commit('DESTROY_ALL_MARKER')
}
export const destroyMarker = (store, index) => {
    store.commit('DESTROY_MARKER', index)
}
export const setAddingRestaurant = (store) => {
    store.commit('SET_ADDING_RESTAURANT')
}
export const setModeMaps = (store) => {
    store.commit('SET_MODE_MAPS')
}

export const getRestaurantSearchAPI = (store) => {
    store.commit('CLEAR_RAW_DATA_RESTAURANT');
    let listOfRestaurantsToAdd = [];
    let list = [];
    let request = {
        bounds: store.state.screenBound,
        type: ['restaurant']
    };

    store.state.service.nearbySearch(request,
        function callback(results, status) {

            if (status == store.state.google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    let restaurant = new Restaurant(i, results[i].name, results[i].vicinity, results[i].geometry.location.lat(), results[i].geometry.location.lng(), null, null, results[i].rating, results[i].user_ratings_total, [], results[i].place_id, results[i].photos, null)
                    listOfRestaurantsToAdd.push(restaurant)


                }
                store.commit('CLEAR_RAW_DATA_RESTAURANT');
                store.commit('ADD_RAW_DATA_RESTAURANTS', listOfRestaurantsToAdd);
            }
        }
    );
    return listOfRestaurantsToAdd;
}

export const getPhotoUrl = (store, restaurant) => {
    let listPhoto = [];
    let photos = restaurant.photos;
    for (let i = 0; i < photos.length; i++) {
        listPhoto.push(photos[i].getUrl());
    }
    return listPhoto;
}
export const getPhotoList = (restaurant) => {
    return restaurant.photos;
}
