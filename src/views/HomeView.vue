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
