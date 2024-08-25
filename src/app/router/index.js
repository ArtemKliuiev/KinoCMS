import { createRouter, createWebHistory } from 'vue-router'
import { useScrollLock, useCheckAdmin } from "@/components/composable";
import { getUser } from "@/components/mixins/index.js";
import { routes } from "./routes"

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
    if(to.matched[0].path === '/admin'){
        const isAdmin = await useCheckAdmin()

        if(isAdmin){
            next()
        }else {
            next(from)
        }
    }else if (to.name === 'profile'){
        const user = await getUser()

        if(user !== null){
            console.log('ок')
            next()
        }else {
            console.log('huy')
            next('/')
        }
    }
    else {
        next()
    }
});

router.afterEach((to, from) => {
   useScrollLock(false)
})

