import { createApp } from 'vue'
import App from './App.vue'
import '../assets/styles/styles.scss'
import { router } from "./providers/router"
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')

