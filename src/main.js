import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import swiper, { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.css'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure
} from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})
localize('zh_TW', TW)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

extend('secret', {
  validate: (value) => value === 'example',
  message: 'This is not the magic word'
})

Vue.prototype.$bus = new Vue()
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)
Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper)
swiper.use([Navigation, Pagination, Autoplay])
Vue.use(Vuex)
axios.defaults.withCredentials = true
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
