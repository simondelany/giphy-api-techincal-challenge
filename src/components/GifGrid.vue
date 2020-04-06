<template>
  <div class="gif-grid">
    <header>
      <h1>{{ title }}</h1>
      <p>{{ msg }}</p>
    </header>
    <div class="image-grid" :id="`grid-${contentType}`">
        <gif-card v-for="(img, index) of images" v-bind:key="index" :data="img" />
        <div class="end-marker">
            <div v-show="loading || busy" class="loading">Loading...</div>
            <div v-show="!loading && !busy"
                class="more"
                @click="nextBatch"
                id="more">
                <span>{{ images.length }}</span>Load More
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import GifCard from "@/components/GifCard.vue";
import store from "../store";

@Component({
  components: {
    GifCard
  }
})
export default class GifGrid extends Vue {
  private batchSize: number;
  private batchEndIndex: number;
  private maxVisible: number;
  private busy: boolean;

  constructor() {
    super();

    this.batchSize = 10;
    this.maxVisible = 50;
    this.batchEndIndex = this.batchSize - 1;
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
        break;
      case "random":
        images = store.getters.getSliceRandom(
          this.getStartIndex(),
          this.batchEndIndex
        );
        break;
    }
    return images;
  }

  get loading(): boolean {
    return store.getters.checkLoading(this.contentType);
  }

  private getStartIndex() {
    let startIndex = this.batchEndIndex + 1 - this.maxVisible;
    if (startIndex < 0) {
      startIndex = 0;
    }
    return 0; //startIndex
  }

  private nextBatch() {
    this.busy = true;
    setTimeout(() => {
      this.busy = false;
    }, 1000);
    // as we consume the current next batch of results
    // then we should start fetching a subsequent batch now
    store.dispatch("fetchNextRandomBatch");

    // increment the batchEndIndex to shift our slice through the fetched data
    this.batchEndIndex += this.batchSize;
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
    height: 75%;
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
    height: 85%;
    background-color: #1f1a1a;
    color: #d8d3b8;
}

#more span {
    margin-right: 0.4em;
}
</style>
