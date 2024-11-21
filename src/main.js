import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css";



const bible_IDS= {
  "KJV":"de4e12af7f28f599-01",
  "ASV": "685d1470fe4d5c3b-01",
}


const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
          
        },
      },
  })
const app = createApp(App)

/* Set up Vuetify */
app.use(vuetify)


// Init GLOBALS
app.config.globalProperties.$GEN_API_KEY = 'd2c1d7320338f567e85f345d41b855a1';
app.config.globalProperties.$ESV_API_KEY = '34eb7977fe7a1386ce1765b308eba77cddcb3df1';
app.config.globalProperties.$NLT_API_KEY = '';
app.config.globalProperties.$N_API_KEY = '';


app.mount('#app')