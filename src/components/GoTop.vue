<template>
  <div>
    <div :class="{ btnFlag }" class="goTop" @click="goTop"></div>
  </div>
</template>

<script>
export default {
  name: 'goTop',
  data () {
    return {
      btnFlag: true
    }
  },
  methods: {
    goTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    document.body.onscroll = () => {
      if (document.documentElement.scrollTop > 200) {
        this.btnFlag = true
      } else {
        this.btnFlag = false
      }
    }
  }
}
</script>
