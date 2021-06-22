<template>
  <header>
    <Navbar />
  </header>
  <main class="bg-texture">
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.bg-texture{
  background-image: url(https://ak.picdn.net/shutterstock/videos/1014989767/thumb/1.jpg);
  background-size: contain;
}
</style>
