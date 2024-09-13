<script setup>
import {BaseButtonText, BasePicture} from "@/components/base/index.js";
import { useI18n } from 'vue-i18n'
import {Tr} from "@/I18n/index.js";

const { locale } = useI18n()
const props = defineProps(['data'])
const localizedRoute = Tr.i18nRoute({ name: 'movie', params: { uid: props.data.uid}})
</script>

<template>
<div class="movie-card">
  <BaseButtonText :to="localizedRoute">
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
  </BaseButtonText>
</div>
</template>

<style scoped lang="scss">
@import "MovieCard";
</style>