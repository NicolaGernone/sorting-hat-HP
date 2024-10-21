<template>
  <div class="chat-container">
    <div class="messages" ref="chatMessages" v-if="!houseResult">
      <MessageComponent v-for="(msg, index) in chatHistory" :key="index" :message="msg" />
      <OptionsComponent
        v-if="chatHistory[chatHistory.length - 1]?.isOptions"
        :options="chatHistory[chatHistory.length - 1].options"
        @select="selectAnswer"
      />
    </div>

    <div v-if="houseResult" class="final-result-container">
      <h2 class="final-result">{{ houseResult }}</h2>
      <div class="confetti"></div>
      <button @click="resetChat" class="reset-button">Restart Chat</button>
    </div>
  </div>
</template>

<script>
import chatServices from '@/services/chatServices'
import MessageComponent from '@/components/Message.vue'
import OptionsComponent from '@/components/Options.vue'
import '@/styles/chat.css'
import '@/styles/message.css';

export default {
  name: 'ChatComponent',
  components: {
    MessageComponent,
    OptionsComponent
  },
  mixins: [chatServices]
}
</script>
