<template>
  <div class="random">
    <gif-grid
      title="Random"
      msg="Here's a random collection of GIFs from GIPHY!"
      contentType="random"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../store";
import GifGrid from "../components/GifGrid.vue";

@Component({
  components: {
    GifGrid
  }
})
export default class Random extends Vue {
  constructor() {
    super();
    store.dispatch("fetchRandomCache").catch(e => {
      console.warn(e);
    });
  }
}
</script>
