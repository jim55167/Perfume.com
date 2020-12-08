import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false,
        products:[],
        categories:[],
        cart: {
            carts: [],
          },
    },
    actions:{
        updateLoading(context, status){//context是vuex固定參數
            context.commit('LOADING', status);
        },
        getAllProducts(context){
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            context.commit('LOADING', true);
            axios.get(url).then((response) => {
              context.commit('PRODUCTS', response.data.products);
              context.commit('CATEGORIES',response.data.products);
              console.log('取得產品列表:', response);
              context.commit('LOADING', false);
            });
        },
        updateCart(context, {cartItem_id, product_id, qty}) {
          const delete_api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${cartItem_id}`;
          const add_api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
          const cart = {
            product_id: product_id,
            qty
          };
          context.commit('LOADING', true);
          axios.delete(delete_api).then(response => {
            if (response.data.success) {
              axios.post(add_api, {data: cart}).then(response => {
                if (response.data.success) {
                  context.dispatch('getCart');
                }
              });        
            }           
          });
          console.log(cartItem_id, product_id);
        },
        getCart(context) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            context.commit('LOADING', true);
            axios.get(url).then(response => {
              if (response.data.data.carts){
                context.commit('CART', response.data.data);
              }
              context.commit('LOADING', false);
              console.log('取得購物車', response.data.data);
            });
          },
          removeCart(context, id) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            context.commit('LOADING', true);  
            axios.delete(api).then(response => {  
                context.commit('LOADING', false);
                context.dispatch('getCart');
                console.log('刪除購物車項目', response);
            });
          },
          addtoCart(context, {id, qty}) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            context.commit('LOADING', true);
            const cart = {
              product_id: id,
              qty
            };
            axios.post(url, { data: cart }).then(response => {
              context.commit('LOADING', false);
              context.dispatch('getCart');
              context.$emit('cartQty',qty);
              console.log('加入購物車:', response);
            });
          },
    },
    mutations: {
        LOADING(state, status) {
            state.isLoading = status;
        },
        PRODUCTS(state, payload){
            state.products = payload;
        },
        CART(state, payload){
            state.cart = payload;
        },
        CATEGORIES(state, payload) {
          const categories = new Set();
          payload.forEach((item) => {
            categories.add(item.category);
            // console.log(categories)
          });
          state.categories = Array.from(categories);
        },
    }
})