<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/most-popular">Most Popular</router-link> |
      <router-link to="/search">Search</router-link> |
      <router-link to="/random">Random</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view id="view"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import store from './store';

export default Vue.extend({
  created() {
    store.dispatch('fetchMostPopular');
  }
})

</script>

<style lang="scss">

body {
  height: 90vh;
}

#app {
  font-family: monospace, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: inherit;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#view {
  height: 100%;
  border-style: solid;
  background-color: #120b19;
  display: block;
}



img[alt="Giphy Icon"] {
  margin: 1em;
}

</style>
