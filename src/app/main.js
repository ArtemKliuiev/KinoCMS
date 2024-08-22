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
import { useUrlQuery } from "@/components/composable";
import { uk, ru } from 'vuetify/locale'

const { getQueryParam } = useUrlQuery()

const queryParamLang = getQueryParam('language')

const messages = Object.assign(languages)

const i18n = createI18n({
  legacy: false,
  locale: queryParamLang || defaultLocale,
  fallbackLocale: 'ru',
  messages
})

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
  locale: {
    locale: queryParamLang || defaultLocale,
    fallback: 'uk',
    messages: { uk, ru },
  },
})


createApp(App)
  .use(i18n)
  .use(router)
  .use(vuetify)
  .mount('#app')

