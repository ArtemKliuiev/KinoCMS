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
const headers = [
  {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Dessert (100g serving)',
  },
  { key: 'calories', title: 'Calories' },
  { key: 'fat', title: 'Fat (g)' },
  { key: 'carbs', title: 'Carbs (g)' },
  { key: 'protein', title: 'Protein (g)' },
  { key: 'iron', title: 'Iron (%)' },
];

// { text: 'Фільм', value: 'name' },
// { text: 'Понеділок', value: 'monday' },
// { text: 'Вівторок', value: 'tuesday' },
// { text: 'Середа', value: 'wednesday' },
// { text: 'Четвер', value: 'thursday' },
// { text: 'П’ятниця', value: 'friday' },
// { text: 'Субота', value: 'saturday' },
// { text: 'Неділя', value: 'sunday' }

const items = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: 1,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: 1,
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: 7,
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: 8,
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: 16,
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: 0,
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: 2,
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: 45,
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: 22,
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: 6,
  },
];

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
    <div class="movie-page__trailer">
      <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/ZMGbRsip7l8?si=eQ45topSVQ3GStfX"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
      </iframe>
    </div>

    <div class="movie-page__schedule">
      <h3 class="movie-page__schedule-title"> {{ t('pages.movie.schedule.title') }} </h3>

      <div class="movie-page__schedule-select">
        <v-select
            :label="t('pages.movie.schedule.selectLabel')"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            variant="solo-filled"
            max-width="500"
        ></v-select>
      </div>

      <v-card>
        <v-data-table
            :headers="headers"
            :items="items"
        ></v-data-table>
      </v-card>
    </div>

    <div class="movie-page__info">
      <div class="movie-page__picture">
        <BasePicture :src="movieData.images[0]"/>
      </div>

      <div class="movie-page__main-info">
        <h1 class="movie-page__title">{{ movieData.name[locale] }}</h1>

        <v-card class="mb-3">
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

        <v-btn block>{{ t('pages.movie.btn') }}</v-btn>

      </div>
    </div>

    <v-card class="movie-page__description">
      <h3 class="movie-page__description-title">
        {{ t('pages.movie.description') }}
      </h3>

      <p class="movie-page__description-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos fuga fugit maxime totam voluptatem voluptatum.
        Laudantium quaerat quisquam voluptate! Ad amet consequuntur eos est et ex facere, in ipsam necessitatibus nemo possimus,
        provident quidem quis, rem veritatis vero voluptatem! Aut consequatur labore neque nesciunt ratione, reiciendis repellendus!
        Aliquid animi deserunt dolorem doloremque ducimus eaque earum et eveniet fugit id incidunt magnam minus mollitia officiis
        quia quod reiciendis repellendus rerum sed, sequi suscipit velit veniam voluptates. At consequatur dolor doloremque ducimus
        eligendi error exercitationem, fuga illo inventore iusto minus officia omnis qui quos reprehenderit vel veniam veritatis vero
        voluptas voluptatum. Culpa doloremque facilis fugit laudantium quo quod sapiente voluptates. Animi aperiam at cumque distinctio
        dolore dolores eos esse est excepturi fugiat fugit hic inventore ipsa iste iure laudantium, mollitia nam necessitatibus nostrum
        odit perferendis quos repudiandae sed tempora totam velit veniam voluptatem. Accusamus aliquam aliquid dolores et expedita hic,
        impedit, ipsa ipsam ipsum itaque iusto laudantium maiores molestiae nihil officia perferendis quis quod sapiente, similique ullam.
        Ad commodi consectetur, culpa dolores dolorum, est eveniet incidunt laboriosam maxime natus necessitatibus nemo placeat porro quasi
        quis rerum suscipit, ullam vel velit voluptatum. Amet, at corporis ducimus eaque excepturi repellat suscipit tenetur vitae voluptas
        voluptatum. Consequatur dolor eligendi est ipsum. Animi aperiam atque debitis dolore dolorem dolores doloribus earum est eum explicabo
        incidunt iusto laborum magni maiores nulla, possimus quae quos reiciendis repudiandae suscipit temporibus totam voluptate, voluptatibus.
        Asperiores aspernatur consequuntur dignissimos ducimus earum enim ex fuga hic impedit molestias perspiciatis quibusdam reiciendis rem,
        tenetur, voluptate? Alias aliquid asperiores blanditiis deserunt eligendi enim esse et, eum ex, excepturi illo libero minus numquam
        perspiciatis quo sit vero voluptas voluptates. Ducimus, ea ipsam. Aliquam assumenda aut blanditiis consequatur culpa dolorem ducimus,
        explicabo iure minima non pariatur praesentium quam quas qui quidem quisquam quod ullam ut? Accusamus, assumenda at delectus deserunt
        ducimus eius enim eum excepturi exercitationem explicabo hic id illo impedit incidunt inventore maiores maxime nihil nostrum quae qui
        quibusdam quos rem repudiandae sint tempora velit voluptate. Eligendi incidunt natus nihil pariatur provident? Architecto consequuntur
        distinctio dolor eius eos eum, iure quaerat quam quasi tempora vel, voluptate voluptatum! Ad dolor eius fugit in laborum, repellendus
        temporibus veniam!
      </p>
    </v-card>

    <div class="movie-page__slider">
      <v-carousel
        cycle
        height="100%"
        width="100%"
      >
        <v-carousel-item
            v-for="item in movieData.images"
            :src="item"
            cover
        ></v-carousel-item>
      </v-carousel>
    </div>
  </section>


</template>

<style lang="scss" scoped>
@import './MoviePage.scss';
</style>