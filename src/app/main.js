import { createApp } from 'vue'
import App from './App.vue'
import '../assets/styles/styles.scss'
import { router } from "./router"
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';
import { createI18n, useI18n } from 'vue-i18n'
import { languages, defaultLocale } from "../I18n"

const LocalStorageLang = localStorage.getItem('lang')

const messages = Object.assign(languages)

const i18n = createI18n({
  legacy: false,
  locale: LocalStorageLang || defaultLocale,
  fallbackLocale: 'ua',
  messages
})

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
})

createApp(App)
  .use(i18n)
  .use(router)
  .use(vuetify)
  .mount('#app')

