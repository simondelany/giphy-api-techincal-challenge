<template>
  <div id="app">
    <header>
      <div id="nav">
        <router-link to="/search">Search</router-link> |
        <router-link to="/most-popular">Most Popular</router-link> |
        <router-link to="/random">Random</router-link>
      </div>
    </header>
    <router-view id="view"/>
    <footer>
      <p>Powered by</p><img alt="Giphy Icon" src="./assets/giphy-branding/GIPHY Logo 75px.png" />
    </footer>
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
  @import "./styles/global.scss";
</style>
