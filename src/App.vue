<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <ProductDisplay />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ProductDisplay from './components/ProductDisplay.vue';

export default {
  name: 'App',
  components: {
    ProductDisplay
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: -15px; */
}
</style>
