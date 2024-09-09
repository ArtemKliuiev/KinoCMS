<script setup>
import {BaseButtonText, BasePicture} from "@/components/base/index.js";
import {computed, ref} from "vue";
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
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
                <h3 class="main-slider__card-title"> {{ banner.title[locale] }} </h3>

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
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "MainSlider";
</style>