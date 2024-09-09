import { defineStore } from 'pinia'
import { ref } from 'vue'

export const piniaStorage = defineStore('counter', () => {
    const preloader = ref(true)

    function switchPreloader(switchInfo = true){

        if(switchInfo){
            preloader.value = true

            setTimeout(() => {
                preloader.value = false
            }, 1000)
        }else{
            preloader.value = false
        }

        console.log(123)
        return preloader.value
        
    }
  
    return { switchPreloader, preloader }
})