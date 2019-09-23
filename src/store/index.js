import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
    restaurants: [],
    restaurantsJson: [],
    restaurantFocus: null,
    screenBound: null,
    google: null,
    mapsCenter: null,
    markers: [],
    starFrom: 1,
    starTo: 5,
    counterRestaurants: 0
}


if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

let store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions,
    strict: false
})

global.store = store

export default store