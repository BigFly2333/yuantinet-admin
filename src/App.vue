<template>
  <div id="app">
    <router-link to="/">index</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/questions">questions</router-link>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/base.scss'

export default {
  name: 'App',
  beforeCreate () {
    // this.$store.dispatch('Tokencheck').then(() => {

    // }).catch(error => {
    //   this.$message.error(error)
    // })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  width: 100%
}
</style>
