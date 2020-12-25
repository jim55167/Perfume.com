<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <FrontNavbar></FrontNavbar>
      <div class="login">
        <div class="login-box">
          <div class="login-img">
            <img src="~@/assets/login/login.jpg">
          </div>
          <form class="wrap" @submit.prevent="signin">
            <h3>Log in</h3>
            <div class="form">
              <label for="inputEmail">帳號</label>
              <input class="form-control mb-3" type="email" id="inputEmail" placeholder="email@example.com" v-model="user.username" required autofocus />
              <label for="inputPassword">密碼</label>
              <div class="password-wrap">
                <input class="form-control mb-3" :type="pwdType" id="inputPassword" placeholder="Password" v-model="user.password" required @on-change="userPassword"/>
                <img :src='seen?openEyes:closeEyes' alt="" @click="changeType">
              </div>
              <div class="reply-in">
                <button type="submit" class="submit-in" >
                  <i class="fas fa-circle-notch fa-spin" v-if="isLoading" style="margin-right:6px;"></i>登入
                </button>
              </div>           
            </div>
          </form>
        </div>
      </div>
    <FrontFooter></FrontFooter>
  </div>
</template>

<script>

import FrontNavbar from "./FrontNavbar";
import FrontFooter from "./FrontFooter";

export default {
  name: 'Login',
  data () {
    return {
      user: {
          username: '',
          password: '',
      },
      seen:'',
      pwdType: 'password',
      openEyes: require('@/assets/login/open.png'),
      closeEyes: require('@/assets/login/close.png'),
      userPassword:'',
    };
  },
  methods: {
      signin() {
        const api = `${process.env.APIPATH}/admin/signin`;
        this.$store.dispatch('updateLoading',true);
        // API 伺服器路徑
        //所申請的 APIPath
        this.$http.post(api, this.user).then((response) => {
        this.$store.dispatch('updateLoading',false);
        if(response.data.success){
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          this.$router.push('/home').catch(err => {err});
        }
      });
    },

    changeType() {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
      this.seen = !this.seen;
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  components: {
    FrontNavbar,
    FrontFooter,
  },
}
</script>
