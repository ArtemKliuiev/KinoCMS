import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "./routes"

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// // navigation guards
// router.beforeEach(async (to, from, next) => {
//   const paramsLocale = to.params.locale

//   // use locale if paramsLocale is not in SUPPORT_LOCALES
//   if (!SUPPORT_LOCALES.includes(paramsLocale)) {
//     return next(`/${locale}`)
//   }

//   // load locale messages
//   if (!i18n.global.availableLocales.includes(paramsLocale)) {
//     await loadLocaleMessages(i18n, paramsLocale)
//   }

//   // set i18n language
//   setI18nLanguage(i18n, paramsLocale)

//   return next()
// })

// router.beforeEach((to, from, next) => {
//   const lang = new URLSearchParams(window.location.search).get('lang');

//   if (lang && to.query.lang !== lang) {
//     next({ ...to, query: {  lang } }); 
//   } else {
//     next();
//   }
// });