<template>
  <div>
    <Navbar></Navbar>
    <div class="container-fluid">
      <div class="row">
        <main role="main" class="col-md-9 col-lg-10 px-md-4" style="margin:60px auto;">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/back/Navbar'
export default {
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
  },
  components: {
    Navbar
  }
}
</script>
