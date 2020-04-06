<template>
  <div class="home">
    <img alt="Giphy Icon" src="../assets/giphy-branding/GIPHY Logo 75px.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
