import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "./routes"

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const lang = new URLSearchParams(window.location.search).get('lang');

  if (lang && to.query.lang !== lang) {
    next({ ...to, query: { ...to.query, lang } }); 
  } else {
    next();
  }
});