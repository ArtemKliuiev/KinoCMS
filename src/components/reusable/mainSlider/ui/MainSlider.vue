<script setup>
import {BaseButtonText, BasePicture} from "@/components/base/index.js";
import {computed, ref} from "vue";

const props = defineProps(['banners', 'data', 'position'])
const isCycling = ref(true)

const interval = computed(() => {
  if(props.data.select){
      return parseInt(props.data.select.replace(/\D/g, ''), 10) * 1000
  }

  return 5000
})
</script>

<template>
  <div class="main-slider">
    <div v-if="props.data" class="main-slider__main">
      <v-carousel
        v-if="data.switch"
        @mouseenter="isCycling = false"
        @mouseleave="isCycling = true"
        :cycle="isCycling"
        :interval="interval"
        hide-delimiter-background
        width="100%"
        height="100%">
          <v-carousel-item v-for="banner in banners" :key="banner">
            <BaseButtonText :to="banner.url">
              <div class="main-slider__card">
                <h3 class="main-slider__card-title"> {{ banner.title }} </h3>

                <div class="main-slider__image">
                  <BasePicture :src="banner.imagePath"/>
                </div>

                <div class="main-slider__skeleton">
                  <v-skeleton-loader width="100%" height="100%" class="rounded-0"></v-skeleton-loader>
                </div>
              </div>
            </BaseButtonText>
          </v-carousel-item>
        </v-carousel>

        <div v-else class="main-slider__not-show">
          <BasePicture
              v-if="position === 'top'"
              srcset="https://raw.githubusercontent.com/ArtemKliuiev/KinoCMS/main/public/DALL%C2%B7E-2024-09-04-17.24.webp"
              src="https://raw.githubusercontent.com/ArtemKliuiev/KinoCMS/main/public/DALL%C2%B7E-2024-09-04-17.24%20(1).jpg"
          />

          <BasePicture
              v-if="position === 'bottom'"
              srcset="https://raw.githubusercontent.com/ArtemKliuiev/KinoCMS/main/public/DALL%C2%B7E%202024-09-04%2018.20.17%20-%20Create%20a%20wide%2C%20vector-style%20image%20with%20a%20theme%20of%20'%D0%90%D0%9A%D0%A6%D0%86%D0%87%20%D0%86%20%D0%9D%D0%9E%D0%92%D0%98%D0%9D%D0%98'%20for%20a%20website%2C%20in%20a%201_2%20aspect%20ratio%20(1%20height%2C%202%20width).%20The%20image%20should%20clearly%20.webp"
              src="https://raw.githubusercontent.com/ArtemKliuiev/KinoCMS/main/public/DALL%C2%B7E%202024-09-04%2018.20.17%20-%20Create%20a%20wide%2C%20vector-style%20image%20with%20a%20theme%20of%20'%D0%90%D0%9A%D0%A6%D0%86%D0%87%20%D0%86%20%D0%9D%D0%9E%D0%92%D0%98%D0%9D%D0%98'%20for%20a%20website%2C%20in%20a%201_2%20aspect%20ratio%20(1%20height%2C%202%20width).%20The%20image%20should%20clearly%20.jpg"
          />
        </div>
    </div>
      
    <v-skeleton-loader v-else width="100%" height="100%" class="rounded-0"></v-skeleton-loader>

  </div>
</template>

<style scoped lang="scss">
@import "MainSlider";
</style>