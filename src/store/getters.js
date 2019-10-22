
    export const restaurants = state => state.restaurants
    export const restaurantsJson = state => state.restaurantsJson
    export const restaurant = state => (lat, lng) => state.restaurants.filter(restaurant => ((restaurant.lat === Number(lat.toFixed(6)) || restaurant.lat === Number(lat.toFixed(7)) || (restaurant.lat === Number(lat))) && ((restaurant.long === Number(lng.toFixed(6))) || (restaurant.lat === Number(lat.toFixed(7))) || (restaurant.lat === Number(lat)))))
    export const locationByCoords = state => (lat, lng) => state.locations.filter(location => ((location.position.lat === Number(lat.toFixed(6)) || location.position.lat === Number(lat.toFixed(7)) || (location.position.lat === Number(lat))) && ((location.position.lng === Number(lng.toFixed(6))) || (location.position.lng === Number(lng.toFixed(7))) || (location.position.lng === Number(lng)))))[0]
    export const restaurantById = state => (id) => state.restaurants.filter(restaurant => restaurant.id === id)[0]
    export const restaurantsJsonById = state => (id) => state.restaurantsJson.filter(restaurant => restaurant.id === id)[0]
    export const restaurantJson = state => (lat, lng) => state.restaurantsJson.filter(restaurant => ((restaurant.lat === Number(lat.toFixed(6)) || restaurant.lat === Number(lat.toFixed(7)) || (restaurant.lat === Number(lat))) && ((restaurant.long === Number(lng.toFixed(6))) || (restaurant.lat === Number(lat.toFixed(7))) || (restaurant.lat === Number(lat)))))
    export const restaurantFocus = state => state.restaurantFocus
    export const locations = state => state.locations
    export const location = state => (id) => state.locations.filter(location => location.id === id)[0]
    export const screenBound = state => state.screenBound
    export const google = state => state.google
    export const map = state => state.map
    export const markers = state => state.markers
    export const counterRestaurants = state => state.counterRestaurants
    export const mapsCenter = state => state.mapsCenter
    export const starFrom = state => state.starFrom
    export const starTo = state => state.starTo
    export const restaurantsCount = state => state.restaurants.length
    export const restaurantsJsonCount = state => state.restaurantsJson.length
    export const restaurantsByRating = (state) => (toStar, fromStar) => state.restaurants.filter(restaurant => restaurant !== undefined && restaurant.averageRating >= toStar && restaurant.averageRating <= fromStar)
    export const restaurantsJsonByRating = (state) => (toStar, fromStar) => state.restaurantsJson.filter(restaurant => restaurant.averageRating >= toStar && restaurant.averageRating <= fromStar)
    export const addingRestaurant = state => state.addingRestaurant
    export const modeMaps = state => state.modeMaps
