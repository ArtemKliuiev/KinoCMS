<script setup>
import { collection, getDocs, query, where, startAfter, endAt, limit, orderBy  } from "firebase/firestore";
import { db, piniaStorage } from "@/components/mixins";
import { watchEffect, onMounted, ref, watch } from 'vue';
import { MainSlider, MovieCard, MovieCardSkeleton } from "@/components/reusable";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const storage = piniaStorage()
const curData = new Date()
const filter = ref("<")
const startLimit = ref(0)
const movies = ref([])
const lastMovie = ref(null)
const addBtn = ref(false)

const options = ref([
  { text: 'Украинский', value: 'ua' },
  { text: 'Английский', value: 'en' },
]);

onMounted(() => {
  getMovies()
})

watch(filter, () => {
  getMovies()
})

watch(startLimit, () => {
  getMovies(false)
})

async function getMovies(start = true){
  const queryParamAllMovies = query(
    collection(db, "movies"),
    where("date", filter.value, curData.getTime()),  
  );

  let queryParam;

  if(start){
    movies.value = [];
    console.log('clean')

    queryParam = query(
      collection(db, "movies"),
      where("date", filter.value, curData.getTime()),  
      orderBy("uid"), 
      limit(8)
    );
  }else{
    queryParam = query(
      collection(db, "movies"),
      where("date", filter.value, curData.getTime()),  
      orderBy("uid"),  
      startAfter(lastMovie.value), 
      limit(4)
    );
  }
    
  const getMovies = await getDocs(queryParam);
  const getAllMovies = await getDocs(queryParamAllMovies);

  getMovies.docs.forEach((doc, index) => {
    movies.value.push(doc.data())

    if(index === getMovies.docs.length - 1){
      lastMovie.value = doc.data().uid
    }
  });

  addBtn.value = getAllMovies.docs.length > movies.value.length
  console.log(getAllMovies.docs.length, movies.value.length)

  storage.switchPreloader(false);
}


</script>

<template>
  <div class="poster-page">
    <div class="poster-page__select">
      <v-select
        v-model="filter"
        :items="[
          { 
            title: t('pages.poster.select.titleOne'),
            value: '<' 
          },
          { 
            title: t('pages.poster.select.titleTwo'),
            value: '>' 
          }
        ]"
        item-title="title"
        item-value="value"
        variant="solo"
      ></v-select>
    </div>

    <div class="poster-page__cards">
      <MovieCard v-for="item in movies" :key="item" :data="item"/>

      <MovieCardSkeleton v-if="movies.length === 0"/>
      <MovieCardSkeleton v-if="movies.length === 0"/>
      <MovieCardSkeleton v-if="movies.length === 0"/>
      <MovieCardSkeleton v-if="movies.length === 0"/>
      <MovieCardSkeleton v-if="movies.length === 0"/>
      <MovieCardSkeleton v-if="movies.length === 0"/>
      <MovieCardSkeleton v-if="movies.length === 0"/>
      <MovieCardSkeleton v-if="movies.length === 0"/>
    </div>

    <div class="poster-page__btn">
      <v-btn v-if="addBtn && movies.length !== 0" @click="startLimit += 4" block>{{ t('pages.poster.btn') }} </v-btn>
    </div>


  </div>

</template>

<style lang="scss" scoped>
@import './PosterPage.scss';
</style>