import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import VersePacks from '../views/VersePacks.vue';
import Quiz from '../views/Quiz.vue';
import ReportBug from '../views/ReportBug.vue';
import More from '../views/More.vue';

const routes = [
  { path: '/', component: Home }, // Home page
  { path: '/VersePacks', component: VersePacks }, // VersePacks page
  { path: '/Quiz', component: Quiz }, // VersePacks page
  { path: '/Report', component: ReportBug }, // VersePacks page
  { path: '/More', component: More } // VersePacks page
];

const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes
});

export default router;
