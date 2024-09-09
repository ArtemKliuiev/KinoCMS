<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";

const search = ref('')
const router = useRouter()

const headers = [
  { align: 'start', key: 'image', title: 'Постер', sortable: false },
  { key: 'name', title: 'Назва' },
  { key: 'type', title: 'Тип фільму' },
  { key: 'genre', title: 'Жанр' },
  { key: 'status', title: 'Статус' },
  { key: 'edit', sortable: false },
]

const items = ref([
  {
    image: '2.png',
    name: 'Nebula GTX 3080',
    type: "3D",
    genre: "Комедія",
    status: "В прокаті",
  },
  {
    image: '2.png',
    name: 'Nebula GTX 3080',
    type: "2D",
    genre: "Комедія",
    status: "Скоро",
  },
  {
    image: '2.png',
    name: 'Nebula GTX 3080',
    type: "3D",
    genre: "Комедія",
    status: "В прокаті",
  },
  {
    image: '2.png',
    name: 'Nebula GTX 3080',
    type: "2D",
    genre: "Комедія",
    status: "Скоро",
  },
  {
    image: '2.png',
    name: 'Nebula GTX 3080',
    type: "3D",
    genre: "Комедія",
    status: "В прокаті",
  },
  {
    image: '2.png',
    name: 'Nebula GTX 3080',
    type: "3D",
    genre: "Комедія",
    status: "Скоро",
  },
  {
    image: '2.png',
    name: 'Nebula GTX 3080',
    type: "3D",
    genre: "Комедія",
    status: "В прокаті",
  },
  {
    image: '2.png',
    name: 'Nebula GTX 3080',
    type: "3D",
    genre: "Комедія",
    status: "Скоро",
  },
]);

function navigateToPage(uid) {
  router.push('/admin/user/' + uid)
}

</script>

<template>
  <div class="movies">
    <h1 class="movies__title">Фільми</h1>

    <div class="movies__table">
      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          <v-row >
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="search"
                  density="compact"
                  label="Search"
                  prepend-inner-icon="mdi-magnify"
                  variant="solo-filled"
                  flat
                  hide-details
                  single-line
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                  <v-btn @click="$router.push('/admin/movies-create')" height="40px" variant="tonal" block>Додати фільм</v-btn>
              </v-col>
          </v-row>

        </v-card-title>

        <v-divider></v-divider>
        <v-data-table v-model:search="search" :headers="headers" :items="items">
          <template v-slot:item.image="{ item }">
            <v-card class="my-2" elevation="2" rounded>
              <v-img
                :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.image}`"
                height="64"
                cover
              ></v-img>
            </v-card>
          </template>

          <template v-slot:header.stock>
            <div class="text-end">Stock</div>
          </template>

          <template v-slot:item.rating="{ item }">
            <v-rating
              :model-value="item.rating"
              color="orange-darken-2"
              density="compact"
              size="small"
              readonly
            ></v-rating>
          </template>

          <template v-slot:item.stock="{ item }">
            <div class="text-end">
              <v-chip
                :color="item.stock ? 'green' : 'red'"
                :text="item.stock ? 'In stock' : 'Out of stock'"
                class="text-uppercase"
                size="small"
                label
              ></v-chip>
            </div>
          </template>

          <template class="v-data-table-column--align-center" v-slot:[`item.edit`]="{ item }">

          <div class="movies__btn">
            <v-btn color="#2a2a2a" @click="navigateToPage(item.edit)">Редагувати</v-btn>
          </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MoviesPage.scss';
</style>