<template>
  <div class="app-container">
    <HomeView />
  </div>
</template>

<script>
import HomeView from './views/HomeView.vue';

export default {
  components: {
    HomeView,
  },
};
</script>

<style scoped>
.app-container {
  @apply h-screen flex justify-center items-center bg-gray-100;
}
</style>
