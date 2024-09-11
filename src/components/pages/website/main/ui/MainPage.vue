<script lang="ts" setup>
import { collection, getDocs, query, where  } from "firebase/firestore";
import { db, piniaStorage } from "@/components/mixins";
import { onMounted, ref } from 'vue';
import {MainSlider, MovieCard, MovieCardSkeleton} from "@/components/reusable";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const storage = piniaStorage()
const topBannersData = ref(false)
const topBanners = ref([])
const bottomBannersData = ref(false)
const bottomBanners = ref([])
const currentMovies = ref([])
const nextMovies = ref([])

onMounted(() => {
  storage.switchPreloader()
  getBanners()
  getMovies()
})

async function getBanners(){
  const collectionRef = collection(db, "data");
  const querySnapshot = await getDocs(collectionRef);

  const allData = {};
  querySnapshot.forEach((doc) => {
    allData[doc.id] = doc.data();
  });

  topBannersData.value = allData.dataBanners.top
  topBanners.value = allData.banners.top
  bottomBannersData.value = allData.dataBanners.bottom
  bottomBanners.value = allData.banners.bottom

  storage.switchPreloader(false)
}

async function getMovies(){
  const curData = new Date()
  const qCurMovies = query(collection(db, "movies"), where("date", "<", curData.getTime()));
  const qNextMovies = query(collection(db, "movies"), where("date", ">", curData.getTime()));

  const curSnapshot = await getDocs(qCurMovies);
  const nextSnapshot = await getDocs(qNextMovies);

  curSnapshot.forEach((doc) => {
    if(currentMovies.value.length < 8){
      currentMovies.value.push(doc.data())
    }
  });

  nextSnapshot.forEach((doc) => {
    if(nextMovies.value.length < 8){
      nextMovies.value.push(doc.data())
    }
  });

  console.log(currentMovies.value, nextMovies.value)
}


</script>

<template>
  <div class="main-page">
    <div class="main-page__banners">
      <MainSlider v-if="topBannersData.switch" :banners="topBanners" :data="topBannersData" position="top"/>
    </div>

    <div class="main-page__text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid eveniet hic laudantium molestiae numquam optio quasi sunt temporibus veniam! Ipsa neque quia quis. Amet architecto culpa dignissimos eligendi esse et ipsum neque, nobis quam reiciendis saepe velit voluptates? Aliquid aperiam atque autem beatae blanditiis consequatur consequuntur delectus dicta dolores ea eaque eius eligendi error et excepturi fugiat fugit harum id illo incidunt ipsum labore laudantium magnam maiores natus neque nobis optio possimus quia quod similique totam, vitae voluptatibus. Aliquid consequatur cupiditate dolore error id inventore magnam magni officia praesentium rem! Aliquid consequatur, cumque deserunt dolore enim eum hic, ipsam laudantium odio provident ratione saepe tempora voluptatem. Dolore itaque perspiciatis repellat! Ad assumenda cumque ea eaque fuga id illo ipsum pariatur perferendis possimus quae, quaerat, qui repellendus. Ad alias aliquam at consequatur consequuntur deleniti, deserunt distinctio dolor doloribus dolorum eligendi exercitationem incidunt inventore maxime nostrum, pariatur perferendis perspiciatis provident quaerat quo sed sint suscipit tempora ullam vel voluptas voluptate! Aliquam blanditiis cumque dolorem dolorum, explicabo fugiat in inventore, iste maiores molestias obcaecati quibusdam repellat sed soluta suscipit totam ut voluptate voluptatum! Cum dolorum ea laborum omnis, quos repellendus sapiente sequi? Amet debitis dolorem eaque impedit mollitia odit similique suscipit tempore vel?
    </div>

    <div class="main-page__phones">
      <h3>{{ t('pages.main.phone') }} </h3>

      <ul>
        <li>
          <a href="tel:0930458674">0930458674</a>
        </li>
        <li>
          <a href="tel:0930458674">0930458674</a>
        </li>
      </ul>

    </div>

    <h2>{{ t('pages.main.curTitle') }}</h2>

    <div class="main-page__cards">
      <MovieCard v-for="item in currentMovies" :key="item" :data="item"/>

      <MovieCardSkeleton v-if="currentMovies.length === 0"/>
      <MovieCardSkeleton v-if="currentMovies.length === 0"/>
      <MovieCardSkeleton v-if="currentMovies.length === 0"/>
      <MovieCardSkeleton v-if="currentMovies.length === 0"/>
      <MovieCardSkeleton v-if="currentMovies.length === 0"/>
      <MovieCardSkeleton v-if="currentMovies.length === 0"/>
      <MovieCardSkeleton v-if="currentMovies.length === 0"/>
      <MovieCardSkeleton v-if="currentMovies.length === 0"/>
    </div>

    <h2>{{ t('pages.main.nextTitle') }}</h2>

    <div class="main-page__cards">
      <MovieCard v-for="item in nextMovies" :key="item" :data="item"/>

      <MovieCardSkeleton v-if="nextMovies.length === 0"/>
      <MovieCardSkeleton v-if="nextMovies.length === 0"/>
      <MovieCardSkeleton v-if="nextMovies.length === 0"/>
      <MovieCardSkeleton v-if="nextMovies.length === 0"/>
      <MovieCardSkeleton v-if="nextMovies.length === 0"/>
      <MovieCardSkeleton v-if="nextMovies.length === 0"/>
      <MovieCardSkeleton v-if="nextMovies.length === 0"/>
      <MovieCardSkeleton v-if="nextMovies.length === 0"/>
    </div>

    <h2 class="main-page__bottom-title">{{ t('pages.main.newsTitle') }}</h2>

    <div class="main-page__banners">
      <MainSlider v-if="bottomBannersData.switch" :banners="bottomBanners" :data="bottomBannersData" position="bottom"/>
    </div>
  </div>

</template>

<style lang="scss" scoped>
@import './MainPage.scss';
</style>