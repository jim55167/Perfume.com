<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <FrontNavbar></FrontNavbar>
      <div class="login">
        <div class="login-box">
          <div class="login-img">
            <img alt="Loading" src="~@/assets/login/login.jpg">
          </div>
          <form class="wrap" @submit.prevent="signin">
            <h3>Log in</h3>
            <div class="form">
              <label for="inputEmail">帳號</label>
              <input class="form-control mb-3" type="email" id="inputEmail" placeholder="email@example.com" v-model="user.username" required autofocus />
              <label for="inputPassword">密碼</label>
              <div class="password-wrap">
                <input class="form-control mb-3" :type="pwdType" id="inputPassword" placeholder="Password" v-model="user.password" required @on-change="userPassword"/>
                <img :src='seen?openEyes:closeEyes' alt="顯示/隱藏" @click.prevent="changeType">
              </div>
              <div class="reply-in">
                <input type="submit" value="登入">
              </div>
            </div>
          </form>
        </div>
      </div>
    <FrontFooter></FrontFooter>
  </div>
</template>

<script>
import FrontNavbar from '@/components/front/FrontNavbar'
import FrontFooter from '@/components/front/FrontFooter'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      seen: false,
      pwdType: 'password',
      openEyes: require('@/assets/login/open.png'),
      closeEyes: require('@/assets/login/close.png'),
      userPassword: ''
    }
  },
  methods: {
    signin () {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      this.$store.dispatch('updateLoading', true)
      this.$http.post(api, this.user).then((response) => {
        this.$store.dispatch('updateLoading', false)
        if (response.data.success) {
          const token = response.data.token
          const expired = response.data.expired
          document.cookie = `jim55167=${token};expires=${new Date(expired)};`
          this.$router.push('/home').catch(err => err)
        }
      })
    },
    changeType () {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
      this.seen = !this.seen
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  components: {
    FrontNavbar,
    FrontFooter
  }
}
</script>
