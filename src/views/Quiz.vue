<template>
  <div>
    <v-container width="800px" class="flip-card">
      <v-card
        class="mt-6 pa-6 d-flex align-center justify-center text-center flip-card-inner"
        :class="{ flipped: showAnswer }"
        height="400px"
        width="800px"
        style="margin-left: auto; margin-right: auto"
      >
        <transition name="fade">
          <div class="flip-card-front" v-show="!showAnswer">
            <p class="text-h6">{{ currentCard.question }}</p>

            <v-btn @click="flipCard" class="mt-4" color="grey" variant="text"> Flip </v-btn>
          </div>
        </transition>
        <transition name="fade">
          <div class="flip-card-back" v-show="showAnswer">
            <p class="text-h6">{{ currentCard.answer }}</p>

            <v-btn @click="flipCard" class="mt-4" color="grey" variant="text"> Flip Back </v-btn>
          </div>
        </transition>
      </v-card>

      <div class="d-flex justify-space-between mt-6" style="width: 800px">
        <v-btn @click="prevCard" :disabled="currentCardIndex === 0" icon="mdi-arrow-left"></v-btn>
        <div class="d-flex">
          <v-btn @click="markCorrect" icon="mdi-check" color="success"></v-btn>
          <v-btn @click="markIncorrect" icon="mdi-close" color="error" class="ml-2"></v-btn>
          <v-btn @click="resetCard" icon="mdi-replay" class="ml-2"></v-btn>
        </div>
        <v-btn
          @click="nextCard"
          :disabled="currentCardIndex === cards.length - 1"
          icon="mdi-arrow-right"
        ></v-btn>
      </div>

      <v-progress-linear v-model="progressPercentage" color="primary" class="mt-4">
      </v-progress-linear>
      <p>{{ currentCardIndex + 1 }}/{{ cards.length }} Cards</p>
      <div class="d-flex justify-space-around mt-4">
        <div>Correct: {{ correctCount }}</div>
        <div>Incorrect: {{ incorrectCount }}</div>
        <div>Remaining: {{ cards.length - correctCount - incorrectCount }}</div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
        { question: "What is the chemical symbol for water?", answer: "H2O" },
        { question: "In what year did World War II begin?", answer: "1939" },
        { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
        { question: "What is the smallest country in the world?", answer: "Vatican City" },
        { question: "What is the currency of Japan?", answer: "Yen" },
        { question: "How many continents are there?", answer: "7" },
        { question: "What is the highest mountain in the world?", answer: "Mount Everest" },
        {
          question: "What is the speed of light?",
          answer: "Approximately 299,792,458 meters per second",
        },
      ],
      currentCardIndex: 0,
      showAnswer: false,
      correctCount: 0,
      incorrectCount: 0,
    };
  },
  computed: {
    currentCard() {
      return this.cards[this.currentCardIndex];
    },
    progressPercentage() {
      // Ensure we don't divide by 0 if there are no cards
      if (this.cards.length === 0) return 0;
      // Calculate progress as a percentage
      return ((this.currentCardIndex + 1) / this.cards.length) * 100;
    },
  },
  methods: {
    nextCard() {
      if (this.currentCardIndex < this.cards.length - 1) {
        this.currentCardIndex++;
        this.showAnswer = false;
      }
    },
    prevCard() {
      if (this.currentCardIndex > 0) {
        this.currentCardIndex--;
        this.showAnswer = false;
      }
    },
    markCorrect() {
      this.correctCount++;
      this.nextCard();
    },
    markIncorrect() {
      this.incorrectCount++;
      this.nextCard();
    },
    resetCard() {
      this.showAnswer = false;
    },
    flipCard() {
      this.showAnswer = !this.showAnswer;
    },
  },
};
</script>

<style scoped>
.flip-card {
  perspective: 1000px;
  /* Create a 3D space for the flip effect */
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;

  width: 100%;

  /* Prevent the text from being flipped */
}

.flip-card-back {
  transform: rotateY(180deg);

  /* Flip the back side of the card */
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
