<template>
  <v-layout class="rounded rounded-md">


    <v-navigation-drawer flat class="drawer-list" v-model="drawer" :rail="rail" permanent @click="rail = false">
      <v-list-item prepend-icon="mdi-book-open-variant ml-2" nav>
        <v-list-item-title class="websiteTitle">VersePacks</v-list-item-title>
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <RouterLink class="text-black text-left" to="/"> <v-list-item prepend-icon="mdi-home-outline" title="Home"
            value="home"></v-list-item></RouterLink>
        <RouterLink class="text-black text-left" to="/"> <v-list-item prepend-icon="mdi-bookshelf" title="Verse Packs"
          :disabled="true" value="packs"></v-list-item>
        </RouterLink>
        <RouterLink class="text-black text-left" to="/"> <v-list-item prepend-icon="mdi-head-question-outline" title="Quiz"
            value="quiz" :disabled="true"></v-list-item>
        </RouterLink>
        <RouterLink class="text-black text-left" to="/"> <v-list-item prepend-icon="mdi-bug-outline" title="Report bug" value="report"
          :disabled="true"></v-list-item>
        </RouterLink>
        <RouterLink class="text-black text-left" to="/"> <v-list-item prepend-icon="mdi-arrow-right" title="More" value="more"
            :disabled="true"></v-list-item>
        </RouterLink>
      </v-list>

      <template v-slot:append>
        <div class="pa-2" v-show="!rail">
          <v-card class="bottom-item " flat title="Verse of the Day" :subtitle="votd_reference" :text="verseOfTheDay.text">
            
          </v-card>
        </div>
      </template>




    </v-navigation-drawer>

    <v-main class="" style="">
      <router-view />

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
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  letter-spacing: normal !important;
  line-height: 2rem !important;

  background: linear-gradient(to left, 
      indigo, blue);
  
      -webkit-background-clip: text;
  color: transparent;
}
</style>