<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="navbar-items">
        <div class="navbar-logo">
          <router-link href="#" to="/home">
            <img src="~@/assets/logo/LOGO.png" />
          </router-link>
        </div>
        <div class="navbar-mobile-box">
          <router-link href="#" to="/shopping_cart/front_cart_items">
            <i class="fas fa-shopping-cart"></i>
            <span class="badge">{{cart.carts.length}}</span>               
          </router-link>
        </div>
          <ul class="navbar-nav" :class="{'menu-show': showMenu}">
            <li class="nav-item active">
              <router-link class="home-link" href="#" to="/front_products">
                <i class="fas fa-store-alt"></i>Product
              </router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="home-link" v-if="is_login" @click.prevent="signOut" to="/home"><i class="fas fa-user"></i>log out</a>
              <router-link class="home-link" to="/login" v-else><i class="fas fa-user"></i>log in</router-link>
            </li>
            <li class="nav-item">
              <router-link href="#" class="home-link" to="/front_wishlist">
                <i class="fas fa-heart"></i>Wishlist
              </router-link>
            </li>
            <li class="nav-item mobile-shop">
              <router-link href="#" class="home-link" to="/shopping_cart/front_cart_items">
                <i class="fas fa-shopping-cart"></i>
                <span class="badge">Cart<a>({{cart.carts.length}})</a></span>               
              </router-link>
            </li>
            <li class="nav-item nav-setting">
              <router-link href="#" class="home-link" to="/admin/products">
                <i class="fas fa-users-cog"></i>Setting
              </router-link>
            </li>
          </ul>
         <a href="#" class="showmenu" @click.prevent="toggleClass"><img src="~@/assets/all/SHOWMENU.png"/></a>
      </div>
    </nav>
  </div>
</template>

<script>

import $ from "jquery";

export default {
  data() {
    return {
      showMenu: false, 
      is_login: false,
    };
  },

  methods: {
    checkLoginStatus() {
      const api = `${process.env.APIPATH}/api/user/check`;
      this.$http.post(api).then((response) => {
        this.is_login = response.data.success;
        // console.log(this.is_login);
      });
    },

    signOut() {
      const api = `${process.env.APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          this.is_login = false;
          this.$router.push("/home").catch(err => {});
        }
      });
    },
    toggleClass() {
      this.showMenu = !this.showMenu;
    },
    getCart() {
      this.$store.dispatch('getCart');
    },
  },
  computed: {
    cart(){
    return this.$store.state.cart;
  },
  },
  created() {
    this.checkLoginStatus();
    this.getCart();
  },
};
</script>

