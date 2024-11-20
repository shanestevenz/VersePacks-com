<template>
  <v-layout class="rounded rounded-md">


    <v-navigation-drawer class="drawer-list" v-model="drawer" :rail="rail" permanent @click="rail = false">
      <v-list-item prepend-icon="mdi-card-multiple-outline ml-2" title="Verse Card Printer" nav>
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-bookshelf" title="Verse Packs" value="packs"></v-list-item>
        <v-list-item prepend-icon="mdi-head-question" title="Quiz" value="quiz"></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2" v-show="!rail">
          <v-card class="bottom-item" title="Verse of the Day" :subtitle="votd_reference" :text="verseOfTheDay.text">

          </v-card>
        </div>
      </template>




    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">

      <Home></Home>

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
}

.bottom-item {
  margin-top: auto;
  /* Pushes this item to the bottom */
}
</style>