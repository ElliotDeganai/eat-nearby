import Vue from 'vue'
//import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex)

Vue.use(VueResource)
Vue.http.options.root = 'https://maps.googleapis.com/maps/api/streetview?key=AIzaSyAKy_eNWWf9MXRvRezeuA_WlHFTVproHl8'



Vue.use(VueRouter)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAKy_eNWWf9MXRvRezeuA_WlHFTVproHl8',
    libraries: 'places',
  },
  installComponents: true
}) 

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    components: require('./components/Home.vue'),
    name: 'root'
  }]
})

 new Vue({
  router,
  render: h => h(require('./App.vue').default),
}).$mount('#app');






