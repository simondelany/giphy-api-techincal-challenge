<template>
  <div class="gif-grid">
    <header>
      <h1>{{ title }}</h1>
      <search-bar v-if="contentType === 'searchResults'"
        />
      <p v-else>{{ msg }}</p>
    </header>
    <div class="image-grid" 
        :id="`grid-${contentType}`"
        v-on:scroll="scrollHandler">
        <gif-card v-for="(img, index) of images" v-bind:key="index" :data="img" />
        <div class="end-marker" 
            @click="nextBatch">
            <div v-show="loading || busy" class="loading">Loading...</div>
            <div v-show="!loading && !busy"
                class="more"
                id="more">
                <span>{{ images.length }}</span>Results
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import GifCard from "@/components/GifCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import store from "../store";

@Component({
  components: {
    GifCard,
    SearchBar
  }
})
export default class GifGrid extends Vue {
  private busy: boolean;

  constructor() {
    super();
    this.busy = false;
  }

  @Prop() private title!: string;
  @Prop() private msg!: string;
  @Prop() private contentType!: string;

  get images(): any[] {
    let images: any[] = [];
    switch (this.contentType) {
      case "mostPopular":
        images = store.state.mostPopular;
        /*
        // uncomment to enable auto refetch of cleaned data

        if (!images.length) {
          store.dispatch('fetchMostPopular');
        }
        */
        break;
      case "searchResults":
        images = store.state.searchResults;
        break;
      case "random":
        images = store.state.random;
        break;
    }
    return images;
  }

  get loading(): boolean {
    return store.getters.checkLoading(this.contentType);
  }


  private nextBatch() {
    this.busy = true;
    setTimeout(() => {
      this.busy = false;
    }, 1000);
    // as we consume the current next batch of results
    // then we should start fetching a subsequent batch now
    store.dispatch("fetchNextRandomBatch");
  }

  private scrollHandler = (e) => {
      const container: HTMLElement = e.target;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
          this.nextBatch();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/components/gifgrid.scss";
</style>
