<template>
    <v-card class="pa-3 my-3 border card-container" flat width="300px" min-height="125px" style="background-color: #f3f4f6;">
      <div class="card-content">
        <!-- Icon, Title, and Description -->
        <v-icon :size="40" :icon="icon"></v-icon>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
  
      <!-- Expanded Content -->
      <transition name="expand">
        <div v-if="expanded" class="expanded-text">
            <slot />
        </div>
      </transition>
  
      <!-- Toggle Button -->
      <div class="card-footer">
        <v-btn variant="text" color="primary" class="ma-0 pa-0 text-button" @click="toggleExpanded">
            <v-icon
              size="24"
              class="arrow-icon"
              :class="{ rotated: expanded }"
            >
              mdi-chevron-down
            </v-icon>
          </v-btn>
      </div>
    </v-card>
  </template>
  
  <script>
  export default {
    name: "VersePackCard",
  
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
      additionalText: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        expanded: false,
      };
    },
    methods: {
      toggleExpanded() {
        this.expanded = !this.expanded;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Card Layout */
  .card-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%; /* Ensures full height */
    position: relative;
    overflow: hidden;
  }
  
  /* Content Section */
  .card-content {
    flex-grow: 1; /* Allows the content to take available space */
  }
  
  /* Footer Section */
  .card-footer {
    position: relative;
    bottom: 0;
    text-align: center;
    margin-top: auto;
  }
  
  /* Smooth Transition for Expanded Section */
  .expand-enter-active,
  .expand-leave-active {
    transition: max-height 1s ease, opacity 1s ease;
  }
  
  .expand-enter-from,
  .expand-leave-to {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
  }
  
  .expand-enter-to,
  .expand-leave-from {
    max-height: 450px;
    /* Adjust as needed */
    opacity: 1;
  }
  
  .expanded-text {
    margin-top: 10px;
    color: #555;
  }
  /* Rotating Arrow Icon */
.arrow-icon {
    transition: transform 0.3s ease;
  }
  
  .arrow-icon.rotated {
    transform: rotate(180deg);
  }
  </style>
  