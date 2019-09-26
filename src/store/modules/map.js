

// initial state
// shape: [{ id, quantity }]
const state = {
    screenBound: null,
    google: null,
    mapsCenter: null,
    markers: [],
}

// getters
const getters = {
    screenBound : state => state.screenBound,
    google : state => state.google,
    markers : state => state.markers,
    counterRestaurants : state => state.counterRestaurants,
    mapsCenter : state => state.mapsCenter
}

// actions
const actions = {
    setScreenBound : (store, area) => {
        store.commit('SET_SCREEN_BOUND', area)
    },
    setGoogle : (store, google) => {
        store.commit('SET_GOOGLE', google)
    },
    setMarkers : (store, markers) => {
        store.commit('SET_MARKERS', markers)
    },
    setMarker : (store, marker) => {
        store.commit('SET_MARKER', marker)
    },
    setMapsCenter : (store, center) => {
        store.commit('SET_MAPS_CENTER', center)
    },
    clearMarkers : (store) => {
        store.commit('CLEAR_MARKERS')
    },
    destroyMarkersOutbound : (store) => {
        let self = this
        for (var i = 0; i < store.state.markers.length; i++ ) {
          let myLatlng = new store.state.google.maps.LatLng(store.state.markers[i].getPosition().lat(), store.state.markers[i].getPosition().lng())
          let restaurantToRemove = self.getRestaurantByPosition(store.state.markers[i].getPosition().lat(), store.state.markers[i].getPosition().lng())
          if((store.state.screenBound.contains(myLatlng) === false) || restaurantToRemove.averageRating < store.state.starFrom || restaurantToRemove.averageRating > store.state.starTo){
            store.commit('DESTROY_MARKER', i)
            self.destroyRestaurant(restaurantToRemove)
          }
        }
    },
    destroyAllMarkers : (store) => {
        //let store.state = this
        for (var i = 0; i < store.state.markers.length; i++ ) {
            store.commit('DESTROY_MARKER', i)
          }
            store.state.markers = [];
    },
    destroyMarker : (store, index) => {
            store.commit('DESTROY_MARKER', index)
    }
}

// mutations
const mutations = {
    SET_SCREEN_BOUND : (state, area) => {
        state.screenBound = area
    },
    CLEAR_MARKERS : state => {
        for(var i = 0; i < state.markers.length; i++){
            //console.log(state.markers[i])
            state.markers[i].setMap(null)
            state.markers[i] = null
            //console.log(state.markers[i])
        }
        state.markers = []
    },
    SET_GOOGLE : (state, google) => {
        state.google = google
    },
    SET_MARKERS : (state, markers) => {
        for(let marker of markers){
            state.markers.push(marker)
        }
    },
    SET_MARKER : (state, marker) => {
            state.markers.push(marker)
    },
    DESTROY_MARKER : (state, index) => {
        state.markers[index].setMap(null)
        state.markers[index] = null
        state.markers.splice(index, 1)
    },
    SET_MAPS_CENTER : (state, center) => {
        state.mapsCenter = center
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}