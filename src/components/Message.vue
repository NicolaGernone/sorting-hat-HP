<template>
    <div :class="['message', message.user ? 'user-message' : 'bot-message']">
      <p>{{ message.text }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserMessage',
    props: ['message'],
  };
  </script>
  
  <style scoped>
  .message {
    @apply p-3 rounded mb-2 max-w-xs;
  }
  .user-message {
    @apply bg-green-100 self-end;
  }
  .bot-message {
    @apply bg-gray-200 self-start;
  }
  </style>
  