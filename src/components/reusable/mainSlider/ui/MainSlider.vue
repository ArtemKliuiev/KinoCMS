<script setup>
import { BasePicture } from "@/components/base/index.js";

const props = defineProps(['banners', 'show'])

</script>

<template>
  <div class="main-slider">
    <v-carousel v-if="false" cycle :interval="5000" hide-delimiter-background width="100%" height="100%">
      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
    </v-carousel>

    <div v-else class="main-slider__not-show">
      <BasePicture src="../../../../assets/images/DALL·E-2024-09-04-17.24 (1).jpg" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "MainSlider";
</style>