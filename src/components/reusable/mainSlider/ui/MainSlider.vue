<script setup>
import {BaseButtonText, BasePicture} from "@/components/base/index.js";
import {computed, ref} from "vue";

const props = defineProps(['banners', 'data'])
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

            <BasePicture :src="banner.imagePath"/>
          </div>
        </BaseButtonText>
      </v-carousel-item>
    </v-carousel>

    <div v-else class="main-slider__not-show">
      <BasePicture
          srcset="https://raw.githubusercontent.com/ArtemKliuiev/KinoCMS/main/public/DALL%C2%B7E-2024-09-04-17.24.webp"
          src="https://raw.githubusercontent.com/ArtemKliuiev/KinoCMS/main/public/DALL%C2%B7E-2024-09-04-17.24%20(1).jpg"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "MainSlider";
</style>