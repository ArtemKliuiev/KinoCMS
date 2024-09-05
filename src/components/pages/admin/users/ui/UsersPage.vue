<script setup>

import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";
import { db } from "@/components/mixins";
import { computed, onMounted, ref } from "vue";

const router = useRouter()
const search = ref('')
const users = ref([])
const skeleton = ref(true)

onMounted(() => {
  getUsersData()
})

const headers = [
  { align: 'start', key: 'name', title: 'Ім`я' },
  { key: 'city', title: 'Місто' },
  { key: 'phone', title: 'Телефон' },
  { key: 'birthday', title: 'Дата нар.' },
  { key: 'sex', title: 'Стать' },
  { key: 'edit', sortable: false },
]

const desserts = computed(() => {
  const arr = []

  if(users.value.length === 0){
    for(let i = 0; i < 10; i++){
      arr.push(null)
    }
  }else{
    users.value.forEach(item => {
      let name = item.mainFormData?.name

      if (item.mainFormData?.lastName) {
        name = name + ' ' + item.mainFormData.lastName
      }

      arr.push({
        name: name,
        city: item.mainFormData?.city,
        phone: item.mainFormData?.phone,
        birthday: item.mainFormData?.birthday,
        sex: item.mainFormData?.sex,
        edit: item.uid
      })
    })
  }


  return arr
})

async function getUsersData() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    users.value.push({ ...doc.data() });
  });

  skeleton.value = false
}

function navigateToPage(uid) {
  router.push('/admin/user/' + uid)
}
</script>

<template>
  <div class="users">

    <h1 class="users__title">Користувачі</h1>

    <v-card flat class="users__table">
      <v-card-text>
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
          single-line></v-text-field>

        <v-data-table :headers="headers" :items="desserts" item-class="text-center" :search="search" dense>
          <template v-if="skeleton" class="v-data-table-column--align-center" v-slot:[`item.name`]="{ item }">
            <v-skeleton-loader width="100%" type="text"></v-skeleton-loader>
          </template>

          <template v-if="skeleton" class="v-data-table-column--align-center" v-slot:[`item.city`]="{ item }">
            <v-skeleton-loader width="100%" type="text"></v-skeleton-loader>
          </template>

          <template v-if="skeleton" class="v-data-table-column--align-center" v-slot:[`item.phone`]="{ item }">
            <v-skeleton-loader width="100%" type="text"></v-skeleton-loader>
          </template>

          <template v-if="skeleton" class="v-data-table-column--align-center" v-slot:[`item.birthday`]="{ item }">
            <v-skeleton-loader width="100%" type="text"></v-skeleton-loader>
          </template>

          <template v-if="skeleton" class="v-data-table-column--align-center" v-slot:[`item.sex`]="{ item }">
            <v-skeleton-loader width="100%" type="text"></v-skeleton-loader>
          </template>

          <template class="v-data-table-column--align-center" v-slot:[`item.edit`]="{ item }">

            <div class="users__btn">
              <v-btn class="users__btn" color="#2a2a2a" @click="navigateToPage(item.edit)">Редагувати</v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
@import './UsersPage.scss';
</style>