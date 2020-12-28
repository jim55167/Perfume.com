<template>
  <div class="justify-content-center">
    <Loading :active.sync="isLoading"></Loading>
    <div class="container mt-4" v-if="cartHasItem">
      <div class="cart-wrap">
        <div class="shopping-step mb-4">
          <div class="step" :class="{ 'active-step' : activedPage == 'FrontCartItems' }">
            <h5>1.確認訂單</h5>
          </div>
          <div class="step" :class="{ 'active-step' : activedPage == 'FrontOrder' }">
            <h5>2.填寫訂購資料</h5>
          </div>
          <div class="step" :class="{ 'active-step' : activedPage == 'FrontCheckout' }">
            <h5>3.金流付款</h5>
          </div>
        </div>

        <router-view></router-view>
      </div>
    </div>

    <div class="emptyCart-wrap" v-if="!cartHasItem">
      <h4>購物車空空的！</h4>
      <router-link class="btn btn-primary shopping-link" to="/home">SHOPPING NOW!</router-link>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      couponCode: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      activePage: this.$route.name
    };
  },

  methods: {
    getCart() {
      this.$store.dispatch('getCart');
    },
  },

  computed: {
    cart(){
      return this.$store.state.cart;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    activedPage() {
      return this.$route.name;
    },

    cartHasItem() {
      if (this.cart.carts == undefined) {
        return;
      } else {
        if (this.cart.carts.length == 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  },

  created() {
    this.getCart();
  }
};
</script>