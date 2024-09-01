<script setup>
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc, arrayUnion  } from "firebase/firestore";
import { db } from "@/components/mixins";
import { onMounted, ref } from 'vue';
import { BannersSection } from '@/components/reusable';
import { da } from 'vuetify/locale';

const image = ref(null)
const topBanners = ref([])
const quantityBanners = ref(0)

onMounted(() => {
  getBanners()
})

async function inputFile(file, path, name){
  const storage = getStorage();
  const storegeImages = storageRef(storage, path);
  const fullPath = storageRef(storegeImages, name + '.jpg');

  await uploadBytes(fullPath, file)

  return await getDownloadURL (fullPath)
}

async function getBanners(){
  const docRef = doc(db, "data", 'banners');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data()
      topBanners.value = data.top
      quantityBanners.value = data.top.length
    }
}

async function abbBannerTop(data) {
  const imagePath = await inputFile(data.file, 'top-banners', data.id)
  console.log(data)

  try {
    const bannerDocRef = doc(db, "data", "banners");
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
    let imagePath = data.imagePath

    if(data.file){
      imagePath = await inputFile(data.file, 'top-banners', data.id)
    }
}

</script>

<template>



<BannersSection @addBanner="abbBannerTop" @changeBanner="changeTopBanners" :quantity="quantityBanners" :bannerData="topBanners" title="Верхні баннери"/>

<img :src="image" alt="">
</template>


<style lang="scss" scoped>
@import './BannersPage.scss';
</style>