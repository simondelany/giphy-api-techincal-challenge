<template>
  <div class="most-popular">
    
    <gif-grid title="Most Popular"
        msg="Here are some of the most popular GIFs available on GIPHY right now!"
        contentType="mostPopular"/>
  </div>
</template>

<script>
import GifGrid from "@/components/GifGrid.vue";

export default {
  name: "MostPopular",
  components: {
    GifGrid
  }
};
</script>
