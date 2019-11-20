

// initial state
// shape: [{ id, quantity }]
const state = {
    screenBound: null,
    google: null,
    maps: null,
    mapsCenter: null,
    markers: []
}

// getters
const getters = {
    locationByCoords: state => (lat, lng) => state.locations.filter(location => ((location.position.lat === Number(lat.toFixed(6)) || location.position.lat === Number(lat.toFixed(7)) || (location.position.lat === Number(lat))) && ((location.position.lng === Number(lng.toFixed(6))) || (location.position.lng === Number(lng.toFixed(7))) || (location.position.lng === Number(lng)))))[0],
    locations: state => state.locations,
    location: state => (id) => state.locations.filter(location => location.id === id)[0],
    screenBound: state => state.screenBound,
    google: state => state.google,
    map: state => state.map,
    markers: state => state.markers,
    mapsCenter: state => state.mapsCenter,
}

// actions
const actions = {
    
    setLocations: (store) => {
    
        let listOfLocations= []
        for (let restaurant of store.state.restaurantsJson.filter(restaurant => restaurant.averageRating >= Number(store.state.starFrom) && restaurant.averageRating <= Number(store.state.starTo))) {
            let location= new Location(restaurant.id, restaurant.lat, restaurant.long)
    
            let myLatlng= new store.state.google.maps.LatLng(restaurant.lat, restaurant.long)
            if (store.state.screenBound.contains(myLatlng)) {
                //restaurant.id= listOfRestaurants.length
                listOfLocations.push(location)
            }
        }
        //this.clearRestaurants()
        //store.commit('CLEAR_RESTAURANTS')
        store.commit('CLEAR_LOCATIONS')
        //this.addRestaurants(listOfRestaurants)
        store.commit('ADD_LOCATIONS', listOfLocations)
    },
    addLocation: (store, location) => {
        store.commit('ADD_LOCATION', location)
    },
    addLocations: (store, locations) => {
        store.commit('ADD_LOCATIONS', locations)
    },
    setScreenBound: (store, area) => {
        store.commit('SET_SCREEN_BOUND', area)
    },
    setGoogle: (store, google) => {
        store.commit('SET_GOOGLE', google)
    },
    setMap: (store, map) => {
        store.commit('SET_MAP', map)
    },
    setMarkers: (store, markers) => {
        store.commit('SET_MARKERS', markers)
    },
    setMarker: (store, marker) => {
        store.commit('SET_MARKER', marker)
    },
    setMapsCenter: (store, center) => {
        store.commit('SET_MAPS_CENTER', center)
    },
    clearLocations: (store) => {
        store.commit('CLEAR_LOCATIONS')
    },
    clearMarkers: (store) => {
        store.commit('CLEAR_MARKERS')
    },
    destroyMarkersOutbound: (store) => {
        let self= this
        for (let i= 0; i < store.state.markers.length; i++) {
            let myLatlng= new store.state.google.maps.LatLng(store.state.markers[i].getPosition().lat(), store.state.markers[i].getPosition().lng())
            
            if (store.state.screenBound.contains(myLatlng) === false){
                store.commit('DESTROY_MARKER', i)
            }
        }
    },
    destroyAllMarkers: (store) => {
            store.commit('DESTROY_ALL_MARKER')
    },
    destroyMarker: (store, index) => {
        store.commit('DESTROY_MARKER', index)
    },
}

// mutations
const mutations = {
    ADD_LOCATION: (state, location) => {
        state.locations.push(location)
    },
    ADD_LOCATIONS: (state, locations) => {
        for(let location of locations){
            state.locations.push(location)
        }
    },
    SET_SCREEN_BOUND: (state, area) => {
        state.screenBound= area
    },
    CLEAR_LOCATIONS: state => {state.locations= []},
    CLEAR_MARKERS: state => {
        for(var i= 0; i < state.markers.length; i++){
            state.markers[i].marker.setMap(null);
            state.markers[i].marker= null;
        }
        state.markers= []
    },
    SET_GOOGLE: (state, google) => {
        state.google= google
    },
    SET_MAP: (state, map) => {
        state.map= map
    },
    SET_MARKERS: (state, markers) => {
        for(let marker of markers){
            state.markers.push(marker)
        }
    },
    SET_MARKER: (state, marker) => {
            state.markers.push(marker)
            let log= "Marker " + marker.id + " added."
    },
    DESTROY_MARKER: (state, index) => {
        state.markers[index].setMap(null)
        //state.markers[index]= null
        state.markers.splice(index, 1)
},

DESTROY_ALL_MARKER: (state) => {
    for (var i= 0; i < store.state.markers.length; i++ ) {
        state.markers[i].marker.setMap(null)
        state.markers[i].marker= null
        //state.markers= state.markers.filter(marker => restaurant.id !== id)
        let log= "Marker " + state.markers[i].id + " removed."
    }
    state.markers= []
},
    SET_MAPS_CENTER: (state, center) => {
        state.mapsCenter= center
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}