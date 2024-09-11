<script setup>
import {BaseButtonText, BasePicture} from "@/components/base/index.js";
import {computed, ref} from "vue";
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const props = defineProps(['data'])


</script>

<template>
<div class="movie-card">
    <div class="movie-card__image">
      <BasePicture :src="data.images[0]"/>
    </div>

    <h3 class="movie-card__title">
      {{ data.name[locale] }}
    </h3>

    <div class="movie-card__chips">
      <v-chip variant="flat" color="#388e3c">{{ data.age }} +</v-chip>
      <v-chip v-if="data.type === '3d'" variant="flat" color="#1976d2">3D</v-chip>
    </div>
</div>
</template>

<style scoped lang="scss">
@import "MovieCard";
</style>