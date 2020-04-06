<template>
  <div class="search">
    <img alt="Giphy Icon" src="../assets/giphy-branding/GIPHY Logo 75px.png" />
    <gif-grid title="Search"
        msg="Search for GIFs on GIPHY!"
        :images="[]"/>
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
