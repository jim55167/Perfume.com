<template>
  <div>
    <!-- <Loading :active.sync="isLoading"></Loading> -->
    <div class="login">
      <div class="login-box">
        <div class="login-img">
          <img src="~@/assets/login/login.jpg">
        </div>
        <form class="wrap" @submit.prevent="signin">
          <h3>Log in</h3>
          <div class="form">
            <label for="inputEmail">帳號</label>
            <input type="email" id="inputEmail" placeholder="email@example.com" v-model="user.username" required autofocus />
            <label for="inputPassword">密碼</label>
            <div class="password-wrap">
              <input :type="pwdType" id="inputPassword" placeholder="Password" v-model="user.password" required @on-change="userPassword"/>
              <img :src='seen?openeye:nopeneye' alt="" @click="changeType">
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
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
          username: '',
          password: '',
      },
      isLoading: false,
      seen:'',
      pwdType: 'password',
      openeye: require('@/assets/login/open.png'),
      nopeneye: require('@/assets/login/close.png'),
      userPassword:'',
    };
  },
  methods: {
      signin() {
        const api = `${process.env.APIPATH}/admin/signin`;
        this.isLoading = true;
        // this.$store.dispatch('updateLoading',true);
        // API 伺服器路徑
        //所申請的 APIPath
        this.$http.post(api, this.user).then((response) => {
        this.isLoading = false;
        // this.$store.dispatch('updateLoading',false);
        console.log(response.data);
        if(response.data.success){
          const token = response.data.token;
          const expired = response.data.expired;
          console.log(token, expired);
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
  // computed: {
  //   isLoading() {
  //     return this.$store.state.isLoading;
  //   }
  // }
}
</script>
