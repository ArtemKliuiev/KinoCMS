<script setup>
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc, arrayUnion  } from "firebase/firestore";
import { db } from "@/components/mixins";
import { onMounted, ref } from 'vue';
import { BannersSection } from '@/components/reusable';
import { da } from 'vuetify/locale';

const image = ref(null)
const topBannersRef = ref([])
let topBanners = []
const quantityBanners = ref(0)
const bannerDocRef = doc(db, "data", "banners");

onMounted(() => {
  getBanners()
})

async function inputFile(file, path, name){
  const storage = getStorage();
  const storageImages = storageRef(storage, path);
  const fullPath = storageRef(storageImages, name + '.jpg');

  await uploadBytes(fullPath, file)

  return await getDownloadURL (fullPath)
}

async function getBanners(){
  const docRef = doc(db, "data", 'banners');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data()
      topBannersRef.value = data.top
      topBanners = data.top
      quantityBanners.value = data.top.length
    }
}

async function abbBannerTop(data) {
  const imagePath = await inputFile(data.file, 'top-banners', data.id)

  try {
    await updateDoc(bannerDocRef, {
      top: arrayUnion({
        id: data.id,
        title: data.title,
        url: data.url,
        imagePath: imagePath
      })
    });
  } catch (error) {
    console.error("Error adding data to the array: ", error);
  }

  await getBanners()
}  

async function changeTopBanners(data){
  if(data.file){
    await inputFile(data.file, 'top-banners', data.id)
  }

  delete data.file
  data.update = true

  topBanners[data.id] = data

  await updateDoc(bannerDocRef, {
    top: topBanners
  });

  await getBanners()
}

</script>

<template>



<BannersSection @addBanner="abbBannerTop" @changeBanner="changeTopBanners" :quantity="quantityBanners" :bannerData="topBannersRef" title="Верхні баннери"/>

<img :src="image" alt="">
</template>


<style lang="scss" scoped>
@import './BannersPage.scss';
</style>