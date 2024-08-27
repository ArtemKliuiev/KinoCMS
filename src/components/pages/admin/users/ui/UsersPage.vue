<script setup>
import {UIBreadcrumbs} from "@/components/ui/index.js";
import { collection, getDocs } from "firebase/firestore";
import {db} from "@/components/mixins";
import {computed, onMounted, ref} from "vue";

const search = ref('')
const users = ref([])

onMounted(() => {
  getUsersData()
})

const breadcrumbs = [
  {
    title: 'Користувачі',
    disabled: true
  }
]
const headers = [
  { align: 'start', key: 'name', title: 'Ім`я'},
  { key: 'nickname', title: 'Nickname' },
  { key: 'city', title: 'Місто' },
  { key: 'sex', title: 'Стать' },
  { key: 'email', title: 'Email' },
  { key: 'phone', title: 'Телефон' },
  { key: 'birthday', title: 'Дата народження' },
  { key: 'edit', sortable: false },
]

const dessert2s = computed(() => {
  const arr = []
  users.value.forEach(item => {
  })
})

const desserts = [
  {
    name: 'Frozen Yogurt',
    email: 'faerfae@ewfa.faewrf',
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: 1,
  }
]

async function getUsersData(){
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    users.value.push({ ...doc.data() });
  });

  console.log(users.value)
}

function navigateToPage (e){
  console.log(e)
}

</script>

<template>
  <div class="users">
    <UIBreadcrumbs class="users__breadcrumbs" :breadcrumbs="breadcrumbs"/>

    <h1 class="users__title">Користувачі</h1>

    <v-card flat class="users__table">
      <v-card-text>
        <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
        ></v-text-field>

        <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            dense
            hide-default-footer
        >
          <template v-slot:[`item.edit`]="{ item }">
            <v-btn color="#2a2a2a" @click="navigateToPage(item.name)">Редагувати</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>


  </div>


</template>

<style lang="scss" scoped>
@import './UsersPage.scss';
</style>