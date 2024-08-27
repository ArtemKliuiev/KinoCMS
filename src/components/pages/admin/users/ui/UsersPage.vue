<script setup>
import {UIBreadcrumbs} from "@/components/ui/index.js";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";
import {db} from "@/components/mixins";
import {computed, onMounted, ref} from "vue";

const router = useRouter()
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

const desserts = computed(() => {
  const arr = []
  users.value.forEach(item => {
    arr.push({
      name: item.mainFormData.name,
      nickname: item.mainFormData.nickname,
      city: item.mainFormData.city,
      sex: item.mainFormData.sex,
      email: item.contactsFormData.email,
      phone: item.mainFormData.phone,
      birthday: item.mainFormData.birthday,
      edit: item.uid
    })
  })

  return arr
})


async function getUsersData(){
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    users.value.push({ ...doc.data() });
  });

  console.log(users.value)
}

function navigateToPage (uid){
  console.log(uid)
  router.push('/admin/user/' + uid)
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
            <v-btn color="#2a2a2a" @click="navigateToPage(item.edit)">Редагувати</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>


  </div>


</template>

<style lang="scss" scoped>
@import './UsersPage.scss';
</style>