<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar class=" px-4 py-2">

      <template v-slot:prepend>
        <v-icon icon="mdi-book-open-variant" size="42"></v-icon>
      </template>

      <v-app-bar-title class="websiteTitle">VersePacks</v-app-bar-title>



      <!---
      <v-toolbar-items class="hidden-sm-and-down">

        <v-btn variant="text" to="/" class="NavBTN">
          <v-icon icon="mdi-home-outline"></v-icon>
          <h2 class="ml-1 navBar">Home</h2>
        </v-btn>

        
        <v-btn variant="text" to="/VersePacks" class="NavBTN">
          <v-icon icon="mdi-bookshelf"></v-icon>
          <h2 class="ml-1 navBar">Verse Packs</h2>
        </v-btn>

        <v-btn variant="text" to="/Quiz" class="NavBTN">
          <v-icon icon="mdi-head-question-outline"></v-icon>
          <h2 class="ml-1 navBar">Quiz</h2>
        </v-btn>

        <v-btn variant="text" to="/More" class="NavBTN">
          <v-icon icon="mdi-plus"></v-icon>
          <h2 class="ml-1 navBar">More</h2>
        </v-btn>

      </v-toolbar-items>
    -->
    </v-app-bar>



    <v-main class="" style="">
      <router-view />
      <v-footer color="#202938" class="pa-1 py-10" style="position: absolute; width:100%; left:0; ">
        <v-col class="ml-5 mt-0">
          <v-row>
            <v-col>
              <h2>VersePacks.com</h2>
              <p class="text-left mt-2 ">Create and print customizable Bible verse cards for person use, study groups, or
                ministry. </p>
            </v-col>
            <v-col>
              <h2 class="mb-4">Quick Links</h2>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-btn variant="text" to="/">
                    <h3 class=""> Home</h3>

                  </v-btn>
                </v-col>
                <!-- 
                <v-col cols="12" class="py-0">
                  <v-btn variant="text" to="/VersePacks">

                    <h3 class=""> Verse Packs</h3>
                  </v-btn>
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-btn variant="text" to="/Quiz">

                    <h3 class="">Quiz</h3>
                  </v-btn>
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-btn variant="text" to="/More">

                    <h3 class="">More</h3>
                  </v-btn>
                </v-col>

                 -->
              </v-row>

            </v-col>
           
            <v-col>
              <h2>Connect With Us</h2>
              <p>shane@akrostrategies.com</p>
            </v-col>

          </v-row>
          <v-divider class="mt-10" color=""></v-divider>
          <p class="text-center mt-6">@ 2025 VersePacks.com. All rights reserved </p>
        </v-col>
      </v-footer>
    </v-main>


  </v-layout>


</template>

<script setup>
import Home from './Home.vue'
</script>

<script>

export default {
  name: "Layout",
  components: {
    Home,

  },

  data() {
    return {
      drawer: true,
      rail: false,
      verseOfTheDay: Object,
      votd_reference: "ee"
    }
  },
  methods: {
    greet() {

    }
  },
  created() {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch('https://beta.ourmanna.com/api/v1/get?format=json&order=daily', options)
      .then(res => res.json())
      .then(res => { console.log(res); this.verseOfTheDay = res.verse.details; this.votd_reference = this.verseOfTheDay.reference + " (" + this.verseOfTheDay.version + ")" })
      .catch(err => console.error(err));


  }


};


</script>


<style scoped>
.drawer-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Ensures items are distributed properly */
  height: 100%;
  /* Ensures the drawer uses full height */
  background-color: #ffffff;
  color: black;
}

.bottom-item {
  margin-top: auto;
  /* Pushes this item to the bottom */
}

.websiteTitle {
  text-align: left;
  font-size: 2.0rem !important;
  font-weight: 700 !important;
  letter-spacing: normal !important;
  line-height: 2rem !important;

  background: linear-gradient(to left,
      indigo, blue);

  -webkit-background-clip: text;
  color: transparent;
}
</style>
