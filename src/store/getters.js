
    export const restaurants = state => state.restaurants
    export const restaurant = state => (lat, lng) => state.restaurants.filter(restaurant => ((restaurant.lat === Number(lat.toFixed(6)) || restaurant.lat === Number(lat.toFixed(7))) && (restaurant.long === Number(lng.toFixed(6))) || (restaurant.lat === Number(lat.toFixed(7)))))
    export const restaurantFocus = state => state.restaurantFocus
    export const screenBound = state => state.screenBound
    export const google = state => state.google
    export const mapsCenter = state => state.mapsCenter
    export const starFrom = state => state.starFrom
    export const starTo = state => state.starTo
    export const restaurantsCount = state => state.restaurants.length
    export const restaurantsByRating = (state) => (toStar, fromStar) => state.restaurants.filter(restaurant => restaurant.averageRating >= toStar && restaurant.averageRating <= fromStar)

