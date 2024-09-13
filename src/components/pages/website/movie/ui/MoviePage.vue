<script setup>
import { useRoute } from 'vue-router'
import { doc, getDoc } from "firebase/firestore";
import { db, piniaStorage } from "@/components/mixins";
import {onMounted, ref} from "vue";
import {BasePicture} from "@/components/base/index.js";
import {useI18n} from "vue-i18n";

const route = useRoute()
const { t, locale } = useI18n()
const storage = piniaStorage()
const movieData = ref({})

onMounted(() => {
  getData()
})

async function getData(){
  const docRef = doc(db, "movies", route.params.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    movieData.value = docSnap.data()
    console.log(movieData.value)
  } else {
    console.log("No such document!");
  }

  storage.switchPreloader(false)
}

const r =''


</script>

<template>
  <section v-if="movieData.name" class="movie-page">
    <div class="movie-page__main">
      <div class="movie-page__picture">
        <BasePicture :src="movieData.images[0]"/>
      </div>

      <div class="movie-page__main-info">
        <h1 class="movie-page__title">{{ movieData.name[locale] }}</h1>

        <v-card>
          <ul>
            <li>
              <span>{{ t('pages.movie.type') }}:</span>

              <span>{{ movieData.type }}</span>
            </li>
            <li>
              <span>{{ t('pages.movie.date') }}:</span>

              <span>{{  new Date(movieData.date).toLocaleDateString() }}</span>
            </li>
            <li>
              <span>{{ t('pages.movie.genre') }}:</span>

              <span>{{ t(`movieCategories.${movieData.genre}`) }}</span>
            </li>
            <li>
              <span>{{ t('pages.movie.age') }}:</span>

              <span>{{ movieData.age }}+</span>
            </li>
          </ul>
        </v-card>

      </div>
    </div>


  </section>


</template>

<style lang="scss" scoped>
@import './MoviePage.scss';
</style>