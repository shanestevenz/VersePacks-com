<script setup>
import Layout_SideBar from './views/Layout-SideBar.vue'
import Layout_TopBar from './views/Layout-TopBar.vue'
</script>

<template>
   <Layout_TopBar></Layout_TopBar>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
