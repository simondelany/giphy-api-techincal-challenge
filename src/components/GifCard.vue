<template>
  <div class="gif-card">
    <img :alt="data.title" 
        :src="data.images.preview_gif.url"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GifGrid extends Vue {
  @Prop() private data!: any;
}
</script>

<style scoped lang="scss">
  img {
    margin: auto;
    width: 100%;
  }
</style>
