<template>
  <div>
    <header class="navbar navbar-expand-lg navbar-light">
      <div class="navbar-items">
        <div class="navbar-logo">
          <router-link href="#" to="/home">
            <img alt="LOGO" src="~@/assets/logo/LOGO.png" />
          </router-link>
        </div>
        <div class="navbar-mobile-box">
          <router-link href="#" to="/shopping_cart/front_cart_items">
            <i class="fas fa-shopping-cart"></i>
            <span class="badge">{{ cart.carts.length }}</span>
          </router-link>
        </div>
          <ul class="navbar-nav" :class="{ 'menu-show': showMenu }">
            <li class="nav-item">
              <router-link class="home-link link-active" href="#" to="/front_products">
                <i class="fas fa-store-alt"></i>Product
              </router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="home-link link-active" v-if="is_login" @click.prevent="signOut" to="/home"><i class="fas fa-user"></i>log out</a>
              <router-link class="home-link link-active" to="/login" v-else><i class="fas fa-user"></i>log in</router-link>
            </li>
            <li class="nav-item">
              <router-link href="#" class="home-link link-active" to="/front_wishlist">
                <i class="fas fa-heart"></i>Wishlist
              </router-link>
            </li>
            <li class="nav-item mobile-shop">
              <router-link href="#" class="home-link link-active" to="/shopping_cart/front_cart_items">
                <i class="fas fa-shopping-cart"></i>Cart({{ cart.carts.length }})
              </router-link>
            </li>
            <li class="nav-item nav-setting">
              <router-link href="#" class="home-link" to="/admin/products">
                <i class="fas fa-users-cog"></i>Setting
              </router-link>
            </li>
          </ul>
        <a href="#" class="icon" @click.prevent="toggleClass"><img alt="選單" src="~@/assets/all/SHOWMENU.png"/></a>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showMenu: false,
      is_login: false
    }
  },
  methods: {
    checkLoginStatus () {
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
      this.$http.post(api).then((response) => {
        this.is_login = response.data.success
      })
    },
    signOut () {
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          this.is_login = false
          this.$router.push('/home').catch(err => err)
        }
      })
    },
    toggleClass () {
      this.showMenu = !this.showMenu
    },
    getCart () {
      this.$store.dispatch('getCart')
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    }
  },
  created () {
    this.checkLoginStatus()
    this.getCart()
  }
}
</script>
