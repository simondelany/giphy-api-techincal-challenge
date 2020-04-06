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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

header {
  height: 20%;
  padding-top: 0.3em;
}

.gif-card {
    background-color: #ece7cb;
    box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.44);
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    display: flex;
    width: auto;
}

.image-grid {
    height: 70%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background-color: #312f2f;
    padding: 10px;
    width: 95%;
    margin: auto;
    grid-gap: 15px;
    box-shadow: -5px -5px #151515f2;
    grid-auto-rows: min-content;
}

.gif-grid {
    height: 100%;
    background-color: #1f1a1a;
    color: #d8d3b8;
}

#more span {
    margin-right: 0.4em;
}

.end-marker {
    color: #444340;
    box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    display: flex;
    width: auto;
    background-color: #73737314;

    * {
        margin: auto;
    }
}
</style>
