

// initial state
// shape: [{ id, quantity }]
const state = {
    starFrom: 1,
    starTo: 5,
    addingRestaurant: false,
    modeMaps: true
}

// getters
const getters = {
  starFrom: state => state.starFrom,
  starTo: state => state.starTo,
  addingRestaurant: state => state.addingRestaurant,
  modeMaps: state => state.modeMaps,
}

// actions
const actions = {

setStarFrom: (store, star) => {
    store.commit('SET_STAR_FROM', star)
},
setStarTo: (store, star) => {
    store.commit('SET_STAR_TO', star)
},
setAddingRestaurant: (store) => {
    store.commit('SET_ADDING_RESTAURANT')
},
setModeMaps: (store) => {
    store.commit('SET_MODE_MAPS')
},
}

// mutations
const mutations = {
SET_STAR_FROM: (state, star) => {
    state.starFrom= star
},
SET_STAR_TO: (state, star) => {
    state.starTo= star
},

SET_ADDING_RESTAURANT: (state) => {
    state.addingRestaurant= !state.addingRestaurant
},
SET_MODE_MAPS: (state) => {
    state.modeMaps= !state.modeMaps
},
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}