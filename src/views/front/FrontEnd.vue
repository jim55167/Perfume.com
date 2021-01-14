<template>
  <div class="">
    <FrontNavbar></FrontNavbar>
    <div class="container-fluid px-0">
      <main style="margin-top:58px;">
        <router-view></router-view>
      </main>
    </div>
    <FrontFooter></FrontFooter>
  </div>
</template>

<script >
import FrontNavbar from '@/components/front/FrontNavbar'
import FrontFooter from '@/components/front/FrontFooter'
export default {
  data () {
    return {}
  },
  components: {
    FrontNavbar,
    FrontFooter
  }
}
</script>
