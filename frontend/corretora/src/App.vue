<template>
  <div id="app">
    <img src="./assets/logo.png">
    <FormularioEntradaDados/>
  </div>
</template>

<script>
import FormularioEntradaDados from './components/FormularioEntradaDados'

export default {
  name: 'App',
  components: {
    FormularioEntradaDados
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
  margin-top: 60px;
}
</style>
