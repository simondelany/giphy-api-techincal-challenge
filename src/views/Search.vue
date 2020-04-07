<template>
  <div class="search">
    <gif-grid
      title="Search"
      msg="Search for GIFs on GIPHY!"
      contentType="searchResults"
    />
  </div>
</template>

<script>
import GifGrid from "@/components/GifGrid.vue";

export default {
  name: "Search",
  components: {
    GifGrid
  }
};
</script>
