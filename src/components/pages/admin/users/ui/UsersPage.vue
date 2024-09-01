<script setup>

import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";
import { db } from "@/components/mixins";
import {computed, onMounted, ref, watch} from "vue";
import {UITable} from "@/components/ui/index.js";

const router = useRouter()
const search = ref('')
const searchParam = ref('Ім`я')
const users = ref([])
const pagination = ref(1)
const quantityPages = ref(1)

onMounted(() => {
  getUsersData()
})

watch(search, () => {
   
})

watch(searchParam, () => {
  search.value = ''
})

const headers = [
  { value: 'name', text: 'Ім`я',sort: true  },
  { value: 'city',  text: 'Місто', sort: true  },
  { value: 'phone',  text: 'Телефон', sort: true  },
  { value: 'birthday',  text: 'Дата нар.', sort: true  },
  { value: 'sex',  text: 'Стать', sort: true  },
]

function fullName(data){
  let name = data?.name

  if (data?.lastName) {
    name = name + ' ' + data.lastName
  }

  return name
}

const desserts = computed(() => {
  const arr = []
  users.value.forEach(item => {
    arr.push({
      name: fullName(item.mainFormData),
      city: item.mainFormData?.city,
      phone: item.mainFormData?.phone,
      birthday: item.mainFormData?.birthday,
      sex: item.mainFormData?.sex,
      uid: item.uid
    })
  })

  return arr
})

async function getUsersData() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    users.value.push({ ...doc.data() });
  });
}

function navigateToPage(uid) {
  router.push('/admin/user/' + uid)
}

</script>

<template>
  <div class="users">

    <h1 class="users__title">Користувачі</h1>

    <v-row>
      <v-col cols="12" md="6">
        <v-select
            label="Параметр пошуку"
            hide-details
            v-model="searchParam"
            :items="['Ім`я', 'Місто', 'Телефон', 'Дата народження', 'Стать']"
            variant="solo-filled"
        ></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
            v-model="search"
            label="Пошук користувача"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            hide-details
            class="mb-5"
        ></v-text-field>
      </v-col>
    </v-row>

    <UITable :items="desserts" :headers="headers" @clickBtn="navigateToPage" btn="Редагувати"/>

    <v-pagination class="mt-5" v-model="pagination" :length="quantityPages"></v-pagination>
  </div>
</template>

<style lang="scss" scoped>
@import './UsersPage.scss';
</style>