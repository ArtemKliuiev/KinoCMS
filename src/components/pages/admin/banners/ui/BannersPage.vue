<script setup>
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc, arrayUnion  } from "firebase/firestore";
import { db } from "@/components/mixins";
import { onMounted, ref } from 'vue';
import { BannersSection } from '@/components/reusable';
import { da } from 'vuetify/locale';

const image = ref(null)
const topBanners = ref([])

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
    }
}

async function abbBannerTop(data) {
  const imagePath = await inputFile(data.file, 'top-banners', 'efw')
  console.log(data)

  try {
    const bannerDocRef = doc(db, "data", "banners");
    await updateDoc(bannerDocRef, {
      top: arrayUnion({
        title: data.title,
        url: data.url,
        imagePath: imagePath
      })

    });
  } catch (error) {
    console.error("Error adding data to the array: ", error);
  }
}

</script>

<template>

<BannersSection @addBanner="abbBannerTop" :bannerData="topBanners" title="Верхні баннери"/>

<img :src="image" alt="">
</template>


<style lang="scss" scoped>
@import './BannersPage.scss';
</style>