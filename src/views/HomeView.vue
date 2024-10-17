<template>
  <div class="home-container">
    <ChatComponent />
  </div>
</template>

<script>
import ChatComponent from '../components/Chat.vue'

export default {
  name: 'HomeView',
  components: {
    ChatComponent
  }
}
</script>

<style scoped>
.home-container {
  @apply w-full h-full flex justify-center items-center;
}
</style>
