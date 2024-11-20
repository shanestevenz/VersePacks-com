import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css";

const API_KEY = "d2c1d7320338f567e85f345d41b855a1";
const ESV_API_KEY = "34eb7977fe7a1386ce1765b308eba77cddcb3df1"
const NLT_API_KEY = ""

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


app.mount('#app')