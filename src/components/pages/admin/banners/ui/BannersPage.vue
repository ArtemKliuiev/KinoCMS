<script setup>
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
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

async function inputFile(file, path){
  const storage = getStorage();
  const storegeImages = storageRef(storage, path);
  const fullPath = storageRef(storegeImages, generateUniqueId() + '.jpg');


  await uploadBytes(fullPath, file)

  return await getDownloadURL (fullPath)
}

async function deleteFileByUrl(fileUrl) {
    const storage = getStorage();

    try {
        const link = storageRef(storage, fileUrl);

        await deleteObject(link);

        console.log('Файл успешно удален');
    } catch (error) {
        console.error('Ошибка при удалении файла:', error);
    }
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
  const imagePath = await inputFile(data.file, 'top-banners')
  console.log(data)

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


    let imagePath = data.imagePath

    if(data.file){
      deleteFileByUrl(data.imagePath)
      imagePath = await inputFile(data.file, 'top-banners', data.id)
    }

    delete data.file
    data.imagePath = getUpdatedImageUrl(imagePath)

    topBanners[data.id] = {...data}

    await updateDoc(bannerDocRef, {
      top: topBanners
    })

    await getBanners()
}

function getUpdatedImageUrl(imageUrl) {
  return `${imageUrl}?v=${new Date().getTime()}`;
}

function generateUniqueId() {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}

async function delTopBanner(data){
  deleteFileByUrl(data.imagePath)

  topBanners.splice(data.id, 1)

  topBanners.forEach((obj, index) => {
    obj.id = index
  })

  await updateDoc(bannerDocRef, {
      top: topBanners
    })
    
  await getBanners()
}

</script>

<template>



<BannersSection
  @delete="delTopBanner"  
  @addBanner="abbBannerTop" 
  @changeBanner="changeTopBanners" 
  :quantity="quantityBanners" 
  :bannerData="topBannersRef" 
  title="Верхні баннери"/>

<img :src="image" alt="">
</template>


<style lang="scss" scoped>
@import './BannersPage.scss';
</style>