
    export const restaurants = state => state.restaurants
    export const restaurantsJson = state => state.restaurantsJson
    export const restaurantsVisibles = state => state.restaurants.filter(restaurant => restaurant.visible === true)
    export const restaurant = state => (lat, lng) => state.restaurants.filter(restaurant => ((restaurant.lat === Number(lat.toFixed(6)) || restaurant.lat === Number(lat.toFixed(7)) || (restaurant.lat === Number(lat))) && ((restaurant.long === Number(lng.toFixed(6))) || (restaurant.lat === Number(lat.toFixed(7))) || (restaurant.lat === Number(lat)))))
    export const restaurantJson = state => (lat, lng) => state.restaurantsJson.filter(restaurant => ((restaurant.lat === Number(lat.toFixed(6)) || restaurant.lat === Number(lat.toFixed(7)) || (restaurant.lat === Number(lat))) && ((restaurant.long === Number(lng.toFixed(6))) || (restaurant.lat === Number(lat.toFixed(7))) || (restaurant.lat === Number(lat)))))
    export const restaurantFocus = state => state.restaurantFocus
    export const screenBound = state => state.screenBound
    export const google = state => state.google
    export const markers = state => state.markers
    export const counterRestaurants = state => state.counterRestaurants
    export const mapsCenter = state => state.mapsCenter
    export const starFrom = state => state.starFrom
    export const starTo = state => state.starTo
    export const restaurantsCount = state => state.restaurants.length
    export const restaurantsJsonCount = state => state.restaurantsJson.length
    export const restaurantsByRating = (state) => (toStar, fromStar) => state.restaurants.filter(restaurant => restaurant.averageRating >= toStar && restaurant.averageRating <= fromStar)
    export const restaurantsJsonByRating = (state) => (toStar, fromStar) => state.restaurantsJson.filter(restaurant => restaurant.averageRating >= toStar && restaurant.averageRating <= fromStar)

