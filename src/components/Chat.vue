<template>
  <div class="chat-container">
    <div class="messages" ref="chatMessages">
      <div
        v-for="(msg, index) in chatHistory"
        :key="index"
        :class="['message', msg.user ? 'user-message' : 'bot-message']"
      >
        {{ msg.text }}
      </div>

      <div v-if="currentQuestion < questions.length && !houseResult" class="options-container">
        <button
          v-for="(option, index) in questions[currentQuestion].answers"
          :key="index"
          @click="selectAnswer(option)"
          class="option-button"
        >
          {{ option.title }}
        </button>
      </div>
    </div>

    <div v-if="houseResult" class="final-result">
      <h2>You belong to {{ houseResult }}!</h2>
      <button @click="resetChat" class="reset-button">Restart Chat</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatComponent',
  data() {
    return {
      chatHistory: [],
      currentQuestion: 0,
      questions: [],
      scores: { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 },
      houseResult: null
    }
  },
  methods: {
    selectAnswer(selectedOption) {
      const houseMap = {
        g: 'Gryffindor',
        r: 'Ravenclaw',
        h: 'Hufflepuff',
        s: 'Slytherin'
      }

      for (const house in selectedOption.scores) {
        const fullHouseName = houseMap[house]
        this.scores[fullHouseName] += selectedOption.scores[house]
      }

      this.chatHistory.push({ text: selectedOption.title, user: true })
      this.scrollToBottom()

      setTimeout(() => {
        this.showNextQuestion()
      }, 1000)
    },

    showNextQuestion() {
      this.currentQuestion++
      if (this.currentQuestion < this.questions.length) {
        this.chatHistory.push({ text: this.questions[this.currentQuestion].title, user: false })
        this.scrollToBottom()
      } else {
        this.showFinalResult()
      }
    },

    showFinalResult() {
      const sortedHouse = Object.keys(this.scores).reduce((a, b) =>
        this.scores[a] > this.scores[b] ? a : b
      )
      this.houseResult = sortedHouse
      this.chatHistory.push({ text: `You belong to: ${sortedHouse}`, user: false })
      this.scrollToBottom()
    },

    resetChat() {
      this.chatHistory = []
      this.currentQuestion = 0
      this.scores = { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 }
      this.houseResult = null
      this.loadQuestions()
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages
        chatMessages.scrollTop = chatMessages.scrollHeight
      })
    },

    loadQuestions() {
      fetch('/assets/questions.json')
        .then((response) => response.json())
        .then((data) => {
          this.questions = data
          if (this.questions.length > 0) {
            this.chatHistory.push({ text: this.questions[0].title, user: false })
            this.scrollToBottom()
          }
        })
    }
  },
  mounted() {
    this.loadQuestions()
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 1200px;
  height: 80vh;
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
  margin-bottom: 20px;
  scrollbar-width: thin;
  scrollbar-color: #5e5e5e transparent;
}

.messages::-webkit-scrollbar {
  width: 8px;
}

.messages::-webkit-scrollbar-thumb {
  background-color: #5e5e5e;
  border-radius: 4px;
}

.message {
  max-width: 60%;
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 15px;
  font-family: 'Cinzel', serif;
  font-size: 1.2rem;
  position: relative;
  animation: slideIn 0.8s ease-out;
  word-wrap: break-word;
}

.user-message {
  background-color: #f7ef8a;
  color: #333;
  align-self: flex-end;
  animation: slideInRight 0.8s ease-out;
}

.bot-message {
  background-color: #d4d0c5;
  color: #4a4a4a;
  align-self: flex-start;
  animation: slideInLeft 0.8s ease-out;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.option-button {
  max-width: 60%;
  padding: 10px 15px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1.2rem;
  font-family: 'Cinzel', serif;
  animation: slideIn 0.8s ease-out;
  word-wrap: break-word;
}

.option-button:hover {
  background-color: #343a40;
}

.final-result {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #4a90e2;
}

.reset-button {
  padding: 10px 20px;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1.2rem;
  font-family: 'Cinzel', serif;
}

.reset-button:hover {
  background-color: #2779bd;
}

/* Animaciones para las burbujas de texto */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
