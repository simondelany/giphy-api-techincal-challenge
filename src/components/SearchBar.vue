<template>
  <div class="search-bar">
    <form class="search-bar__form" v-on:submit="triggerSearch">
      <div class="block">
        <input
          id="search-bar"
          :value="query"
          list="suggestions"
          type="text"
          autocomplete="off"
          @input="updateQuery"
        />
        <button type="submit">
          <img src="https://giphy.com/static/img/search-icon.svg" />
        </button>
      </div>
      <datalist
        v-show="suggestedQueries && suggestedQueries.length"
        id="suggestions"
      >
        <option
          v-for="(suggestion, index) of suggestedQueries"
          v-bind:key="index"
          :value="suggestion.name"
        />
      </datalist>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../store";

@Component
export default class SearchBar extends Vue {
  get query() {
    return store.getters.getQuery();
  }

  get suggestedQueries() {
    return store.getters.getSuggested();
  }

  private updateQuery = e => {
    store.commit("setQuery", e.target.value);
    store.dispatch("fetchSuggested");
  };

  private triggerSearch() {
    store.dispatch("fetchSearch");
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/components/searchbar.scss";
</style>
