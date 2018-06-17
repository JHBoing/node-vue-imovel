<template>
  <div id="app">
    <img src="./assets/logo.png">
    <img src="../../../nodejs_logo.png">
    <img src="../../../mongodb.png">
    <Index/>
  </div>
</template>

<script>
import Index from './components/Index'

export default {
  name: 'App',
  components: {
    Index,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
</style>
