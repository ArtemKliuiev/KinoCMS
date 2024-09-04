<script setup>
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc, arrayUnion  } from "firebase/firestore";
import { db } from "@/components/mixins";
import { onMounted, ref } from 'vue';
import { BannersSection, BackgroundSection } from '@/components/reusable';

const backgroundData = ref({})
const topBannersRef = ref([])
const bottomBannersRef = ref([])
const topQuantityBanners = ref(0)
const bottomQuantityBanners = ref(0)
const topBannersData = ref({})
const bottomBannersData = ref({})
const bannerDocRef = doc(db, "data", "banners");
let topBanners = [];
let bottomBanners = [];

onMounted(() => {
  getBanners()
  getBannersData()
  getBackground()
})

async function inputFile(file, path){
  const storage = getStorage();
  const storegeImages = storageRef(storage, path);
  const fullPath = storageRef(storegeImages, generateUniqueId() + '.jpg');

  await uploadBytes(fullPath, file)

  return await getDownloadURL (fullPath)
}

function setBannersData(banners, data){
  setDoc(doc(db, "data", "dataBanners"), {
    [banners]: {
      switch: data.switch,
      select: data.select
    }
  }, { merge: true });
}

async function getBannersData(){
  const docRef = doc(db, "data", 'dataBanners');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data()
    topBannersData.value = data.top
    bottomBannersData.value = data.bottom
  }
}

async function deleteFileByUrl(fileUrl) {
    const storage = getStorage();

    try {
        const link = storageRef(storage, fileUrl);

        await deleteObject(link);
    } catch (error) {
        console.error(error);
    }
}

async function getBanners(){
  const docRef = doc(db, "data", 'banners');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data()
    topBannersRef.value = data.top
    bottomBannersRef.value = data.bottom
    topBanners = data.top
    bottomBanners = data.bottom
    topQuantityBanners.value = data.top.length
    bottomQuantityBanners.value = data.bottom.length
  }
}

async function abbBannerTop(data) {
  const imagePath = await inputFile(data.file, 'top-banners')

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
    console.error(error);
  }

  await getBanners()
}  

async function abbBannerBottom(data) {
  const imagePath = await inputFile(data.file, 'bottom-banners')

  try {
    await updateDoc(bannerDocRef, {
      bottom: arrayUnion({
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

async function changeBannersTop(data){
    let imagePath = data.imagePath

    if(data.file){
      deleteFileByUrl(data.imagePath)
      imagePath = await inputFile(data.file, 'top-banners', data.id)
    }

    delete data.file
    data.imagePath = imagePath
    topBanners[data.id] = {...data}

    await updateDoc(bannerDocRef, {
      top: topBanners
    })

    await getBanners()
}

async function changeBannersBottom(data){
    let imagePath = data.imagePath

    if(data.file){
      deleteFileByUrl(data.imagePath)
      imagePath = await inputFile(data.file, 'bottom-banners', data.id)
    }

    delete data.file
    data.imagePath = imagePath
    bottomBanners[data.id] = {...data}

    await updateDoc(bannerDocRef, {
      bottom: bottomBanners
    })

    await getBanners()
}

async function delBannerTop(data){
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

async function delBannerBottom(data){
  deleteFileByUrl(data.imagePath)

  bottomBanners.splice(data.id, 1)

  bottomBanners.forEach((obj, index) => {
    obj.id = index
  })

  await updateDoc(bannerDocRef, {
      bottom: bottomBanners
    })
    
  await getBanners()
}

async function setBackground(data){
  let imagePath = backgroundData.value.imagePath

  if(data.file){
    imagePath = await inputFile(data.file, 'top-banners')
  }

  setDoc(doc(db, "data", "background"), {
    switch: data.switch,
    imagePath: imagePath
  }, { merge: true });

  await getBackground()
}

async function getBackground(){
  const docRef = doc(db, "data", "background");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    backgroundData.value = docSnap.data()
  }
}

async function deleteBackground(data){
  setDoc(doc(db, "data", "background"), {
    switch: false,
    imagePath: ''
  }, { merge: true });

  await deleteFileByUrl(data.imagePath)
  await getBackground()
}

function generateUniqueId() {
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}
</script>

<template>
<div class="banners-page">  
  <BackgroundSection
    @setData="setBackground" 
    @delete="deleteBackground"
    :data="backgroundData"
    title="Задній фон сайту"
  />

  <BannersSection
    @delete="delBannerTop"  
    @addBanner="abbBannerTop" 
    @changeBanner="changeBannersTop" 
    @changeData="(data) => setBannersData('top', data)"
    :data="topBannersData"
    :quantity="topQuantityBanners" 
    :bannerData="topBannersRef" 
    title="Верхні баннери"
  />

  <BannersSection
    @delete="delBannerBottom"  
    @addBanner="abbBannerBottom" 
    @changeBanner="changeBannersBottom" 
    @changeData="(data) => setBannersData('bottom', data)"
    :data="bottomBannersData"
    :quantity="bottomQuantityBanners" 
    :bannerData="bottomBannersRef" 
    title="Акції та новини"
  />
</div>
</template>

<style lang="scss" scoped>
@import './BannersPage.scss';
</style>