<script setup>
import { onMounted, ref } from 'vue';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc, arrayUnion  } from "firebase/firestore";
import { ImagesSection } from '@/components/reusable';
import { db } from "@/components/mixins";
import { UIBreadcrumbs } from "@/components/ui";

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

onMounted(() => {
  getBanners()
  getBannersData()
})
</script>

<template>
    <div class="create-movie">
        <UIBreadcrumbs class="create-movie__breadcrumbs" :breadcrumbs="breadcrumbs" />

        <h1 class="create-movie__title">Створення фільму</h1>

        <ImagesSection
            :data="topBannersData"
            :quantity="topQuantityBanners" 
            :empty="true"
            title="Зображення"
        />
        
    </div>
</template>

<style lang="scss" scoped>
@import './MovieCreatePage.scss';
</style>