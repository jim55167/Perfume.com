<template>
  <div id="app">
    <AlertMessage></AlertMessage>
    <router-view></router-view>
  </div>
</template>

<script>
import AlertMessage from './components/AlertMessage'
export default {
  name: 'App',
  components: {
    AlertMessage
  }
}
</script>

<style lang="scss">
@import "./assets/all.scss";
</style>
