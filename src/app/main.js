import { createApp } from 'vue'
import App from './App.vue'
import '../assets/styles/styles.scss'
import { router } from "./router"
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';
import {useLocalStorage} from "@/components/composable/index.js";
import { createPinia } from 'pinia'
import { i18n } from "@/I18n";
import { uk, ru } from 'vuetify/locale'

const { getLocalStorage } = useLocalStorage()

const langParam = getLocalStorage('locale')

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
  locale: {
    locale: langParam || 'uk',
    fallback: 'ru',
    messages: { uk, ru },
  },
})

const pinia = createPinia()

createApp(App)
  .use(i18n)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount('#app')
