<script setup>
import { onMounted, ref } from 'vue';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, getFirestore, collection, addDoc  } from "firebase/firestore";
import { ImagesSection } from '@/components/reusable';
import { db } from "@/components/mixins";
import { UIBreadcrumbs } from "@/components/ui";
import { v4 as uuidv4 } from 'uuid';


const topBannersRef = ref([])
const topQuantityBanners = ref(0)
const topBannersData = ref({})
let topBanners = [];

const breadcrumbs = [
    {
        title: 'Фільми',
        to: '/admin/movies'
    },
    {
        title: 'Створення фільму',
        disabled: true
    }
]

async function getBanners(){
  const docRef = doc(db, "data", 'banners');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data()
    topBannersRef.value = data.top
    topBanners = data.top
    topQuantityBanners.value = data.top.length
  }
}

async function getBannersData(){
  const docRef = doc(db, "data", 'dataBanners');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data()
    topBannersData.value = data.top
  }
}

const date1 = new Date('2024-09-01');
const date2 = new Date('2024-09-18');
let counter = ref(0)

const movie = ref({
  name: {
    uk: 'Назва фільму' ,
    ru: 'Название фильма' 
  },
  date: date1.getTime(),
  age: "18",
  genre: "comedy",
  type: "3d",
  images: [
      "https://firebasestorage.googleapis.com/v0/b/kinocms-2d2b3.appspot.com/o/top-banners%2Fid-m0pcwk31-wtm1i28ue.jpg?alt=media&token=facb8c50-6d9f-4d0f-9818-bbc4ca2805f3",
      "https://firebasestorage.googleapis.com/v0/b/kinocms-2d2b3.appspot.com/o/top-banners%2Fid-m0pcu9ed-swvau0tra.jpg?alt=media&token=81495175-a5b6-4d6d-a0ed-79ad7042b092",
      "https://firebasestorage.googleapis.com/v0/b/kinocms-2d2b3.appspot.com/o/top-banners%2Fid-m0pcnrzh-g9gh62hqa.jpg?alt=media&token=c0b4f218-f7bb-4fce-b7a1-7125589345e2",
      "https://firebasestorage.googleapis.com/v0/b/kinocms-2d2b3.appspot.com/o/top-banners%2Fid-m0pcxzv1-cxjc98uu0.jpg?alt=media&token=fff3731c-99f6-4d44-b71d-19a010aecc8d"
  ]
});

async function addMovie() {
  counter.value = counter.value + 1
  const uid = uuidv4()
  movie.value.uid = uid
  movie.value.name = {
    uk: 'Назва фільму ' + counter.value,
    ru: 'Название фильма ' + counter.value
  },

  console.log(movie.value.name)
  

  await setDoc(doc(db, "movies", uid), movie.value);
}

onMounted(() => {
  getBanners()
  getBannersData()
})
</script>

<template>
    <div class="create-movie">
        <UIBreadcrumbs class="create-movie__breadcrumbs" :breadcrumbs="breadcrumbs" />

        <h1 class="create-movie__title">Створення фільму</h1>

<!--        <ImagesSection-->
<!--            :data="topBannersData"-->
<!--            :quantity="topQuantityBanners" -->
<!--            :empty="true"-->
<!--            title="Зображення"-->
<!--        />-->
        
    </div>

  <v-btn @click="addMovie" >Додати</v-btn>
</template>

<style lang="scss" scoped>
@import './MovieCreatePage.scss';
</style>