<template>
  <div>
    <nav class="setting navbar-expand-lg navbar-light">
      <div class="setting-items">
        <div class="setting-logo">
          <router-link href="#" to="/home">
            <img src="~@/assets/logo/LOGO.png" />
          </router-link>
        </div>
          <ul class="setting-nav" style="margin-bottom:0;">
            <li class="nav-item active">
              <router-link href="#" to="/admin/products">
                <i class="fas fa-paste"></i>PRODUCT LIST
              </router-link>
            </li>
            <li class="nav-item">
              <router-link href="#" to="/admin/coupons"><i class="fas fa-tag"></i>COUPON LIST</router-link>
            </li>
            <li class="nav-item">
              <router-link href="#" to="/admin/orders"><i class="fas fa-money-check"></i>ORDER LIST</router-link>
            </li>            
            <li class="nav-item">
              <a href="#" v-if="is_login" @click.prevent="signOut" to="/home"><i class="fas fa-user"></i>log out</a>
              <router-link to="/login" v-else><i class="fas fa-user"></i>log in</router-link>
            </li>
            <li class="nav-item">
            <router-link to="/home" v-if="is_login">             
              <i class="fas fa-store-alt ml-1"></i>FRONT END
            </router-link>
          </li>
          </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_login: false
    };
  },

  methods: {
    checkLoginStatus() {
      const api = `${ process.env.APIPATH }/api/user/check`;
      this.$http.post(api).then(response => {
        this.is_login = response.data.success;
      });
    },

    signOut() {
      const api = `${ process.env.APIPATH }/logout`;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          this.is_login = false;
          this.$router.push("/home");
        }
      });
    }
  },

  created() {
    this.checkLoginStatus();
  }
};
</script>

