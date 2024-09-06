import { defineStore } from 'pinia'
import { ref } from 'vue'

export const piniaStorage = defineStore('counter', () => {
    const preloader = ref(true)
  
    return { preloader }
})