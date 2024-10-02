<template>
  <div class="app-container">
    <Home />
  </div>
</template>

<script>
import Home from './views/HomeView.vue';

export default {
  components: {
    Home,
  },
};
</script>

<style scoped>
.app-container {
  @apply h-screen flex justify-center items-center bg-gray-100;
}
</style>
