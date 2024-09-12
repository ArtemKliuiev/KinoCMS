import { defineStore } from 'pinia'
import { ref } from 'vue'

export const piniaStorage = defineStore('preload', () => {
    const preloader = ref(true)

    function switchPreloader(switchInfo = true){
        if(switchInfo){
            preloader.value = true

            setTimeout(() => {
                preloader.value = false
            }, 10000)
        }else{
            preloader.value = false
        }

        return preloader.value
    }
  
    return { switchPreloader, preloader }
})