import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    loadingItem: '',
    products: [],
    categories: [],
    cart: {
      carts: []
    },
    lightBox: false
  },
  mutations: {
    LOADING (state, payload) {
      state.isLoading = payload
    },
    LIGHTBOX (state, payload) {
      state.lightBox = payload
    },
    PRODUCTS (state, payload) {
      state.products = payload
    },
    CART (state, payload) {
      state.cart = payload
    },
    CATEGORIES (state, payload) {
      const categories = new Set()
      payload.forEach(item => {
        categories.add(item.category)
      })
      state.categories = Array.from(categories)
    },
    LOADINGITEM (state, payload) {
      state.loadingItem = payload
    }
  },
  actions: {
    updateLoading (context, payload) {
      context.commit('LOADING', payload)
    },
    isLightBox (context, payload) {
      context.commit('LIGHTBOX', payload)
    },
    getAllProducts (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true)
      axios.get(url).then(response => {
        context.commit('PRODUCTS', response.data.products)
        context.commit('CATEGORIES', response.data.products)
        context.commit('LOADING', false)
      })
    },
    updateCart (context, { id, productId, qty }) {
      const deleteapi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      const addapi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: productId,
        qty
      }
      context.commit('LOADING', true)
      axios.delete(deleteapi).then(response => {
        if (response.data.success) {
          axios.post(addapi, { data: cart }).then(response => {
            if (response.data.success) {
              context.dispatch('getCart')
            }
          })
        }
      })
    },
    getCart (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true)
      axios.get(url).then(response => {
        if (response.data.data.carts) {
          context.commit('CART', response.data.data)
        }
        context.commit('LOADING', false)
      })
    },
    removeCart (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true)
      axios.delete(api).then(response => {
        context.commit('LOADING', false)
        context.dispatch('getCart')
      })
    },
    addToCart (context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADINGITEM', id)
      const cart = {
        product_id: id,
        qty
      }
      axios.post(url, { data: cart }).then(response => {
        context.dispatch('getCart')
        context.commit('LOADINGITEM', '')
        context.commit('LOADING', false)
      })
    }
  },
  modules: {
  }
})
