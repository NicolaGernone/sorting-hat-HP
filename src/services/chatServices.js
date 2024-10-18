import confetti from 'canvas-confetti';

export default {
  data() {
    return {
      chatHistory: [],
      currentQuestion: 0,
      questions: [],
      scores: { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 },
      houseResult: null,
    };
  },
  methods: {
    selectAnswer(selectedOption) {
      const houseMap = {
        g: 'Gryffindor',
        r: 'Ravenclaw',
        h: 'Hufflepuff',
        s: 'Slytherin',
      };

      for (const house in selectedOption.scores) {
        const fullHouseName = houseMap[house];
        this.scores[fullHouseName] += selectedOption.scores[house];
      }

      this.chatHistory[this.chatHistory.length - 1].isOptions = false;
      this.chatHistory.push({ text: selectedOption.title, user: true });
      this.scrollToBottom();

      setTimeout(() => {
        this.showNextQuestion();
      }, 1000);
    },

    showNextQuestion() {
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.chatHistory.push({
          text: this.questions[this.currentQuestion].title,
          user: false,
          isOptions: true,
          options: this.questions[this.currentQuestion].answers,
        });
        this.scrollToBottom();
      } else {
        this.showFinalResult();
      }
    },

    showFinalResult() {
      const sortedHouse = Object.keys(this.scores).reduce((a, b) =>
        this.scores[a] > this.scores[b] ? a : b
      );
      this.houseResult = `You belong to ${sortedHouse}`;
      this.triggerConfetti();
      this.scrollToBottom();
    },

    triggerConfetti() {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    },

    resetChat() {
      this.chatHistory = [];
      this.currentQuestion = 0;
      this.scores = { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 };
      this.houseResult = null;
      this.loadQuestions();
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    },

    loadQuestions() {
      fetch('/assets/questions.json')
        .then((response) => response.json())
        .then((data) => {
          this.questions = data;
          if (this.questions.length > 0) {
            this.chatHistory.push({
              text: this.questions[0].title,
              user: false,
              isOptions: true,
              options: this.questions[0].answers,
            });
            this.scrollToBottom();
          }
        });
    },
  },
  mounted() {
    this.loadQuestions();
  },
};