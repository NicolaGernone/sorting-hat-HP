<template>
    <div class="chat-container">
      <div class="messages">
        <UserMessage
          v-for="(msg, index) in chatHistory"
          :key="index"
          :message="msg"
        />
      </div>
      <div class="input-container">
        <input v-model="userAnswer" @keyup.enter="sendMessage" placeholder="Escribe tu respuesta" />
        <button @click="sendMessage">Enviar</button>
      </div>
    </div>
  </template>
  
  <script>
  import UserMessage from './Message.vue';
  import questions from '../data/questions.json';
  
  export default {
    name: 'ChatComponent',
    components: {
        UserMessage,
    },
    data() {
      return {
        chatHistory: [],
        currentQuestion: 0,
        userAnswer: '',
        scores: { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 },
      };
    },
    methods: {
      sendMessage() {
        if (this.userAnswer.trim()) {
          this.chatHistory.push({ text: this.userAnswer, user: true });
          this.processAnswer(this.userAnswer);
          this.userAnswer = '';
        }
      },
      processAnswer(answer) {
        const question = questions[this.currentQuestion];
        const selectedOption = question.answers.find(a => a.title === answer);
        if (selectedOption) {
          for (const house in selectedOption.scores) {
            this.scores[house] += selectedOption.scores[house];
          }
          this.showNextQuestion();
        } else {
          this.chatHistory.push({ text: "Por favor, elige una opción válida", user: false });
        }
      },
      showNextQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion < questions.length) {
          this.chatHistory.push({ text: questions[this.currentQuestion].title, user: false });
        } else {
          this.showFinalResult();
        }
      },
      showFinalResult() {
        const sortedHouse = Object.keys(this.scores).reduce((a, b) => (this.scores[a] > this.scores[b] ? a : b));
        this.chatHistory.push({ text: `Tu casa es: ${sortedHouse}`, user: false });
      },
    },
    mounted() {
      this.chatHistory.push({ text: questions[0].title, user: false });
    },
  };
  </script>
  
  <style scoped>
  .chat-container {
    @apply flex flex-col h-full max-w-lg mx-auto bg-white rounded shadow-lg p-4;
  }
  .messages {
    @apply flex-grow overflow-y-auto mb-4;
  }
  .input-container {
    @apply flex space-x-2;
  }
  input {
    @apply flex-grow border border-gray-300 rounded px-3 py-2;
  }
  button {
    @apply bg-blue-500 text-white rounded px-3 py-2;
  }
  button:hover {
    @apply bg-blue-600;
  }
  </style>
  