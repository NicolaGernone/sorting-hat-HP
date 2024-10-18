<template>
  <div :class="['message', message.user ? 'user-message' : 'bot-message']">
    {{ message.text }}
  </div>
</template>

<script>
import '@/styles/message.css';

export default {
  name: 'MessageComponent',
  props: {
    message: Object,
  },
};
</script>