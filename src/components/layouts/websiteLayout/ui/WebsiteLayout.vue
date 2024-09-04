<script setup>
import { WebsiteHeader, WebsiteFooter } from '@/components/base'
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/components/mixins";
import { onMounted, ref } from 'vue';

const backgroundUrl = ref('')
const backgroundSwitch = ref(false)

onMounted(() => {
  getBackground()
})


async function getBackground(){
  const collectionRef = collection(db, "data");
  const querySnapshot = await getDocs(collectionRef);

  const allData = {};
  querySnapshot.forEach((doc) => {
    allData[doc.id] = doc.data();
  });

  console.log(allData.background)
  backgroundUrl.value = allData.background.imagePath
}
</script>

<template>
  <div class="site-layout">
    <slot name="header">
      <div class="site-layout__header">
        <WebsiteHeader />
      </div>

    </slot>

    <slot name="main">
      <main class="site-layout__main main" :style="{ backgroundImage: `url(${backgroundUrl}) ` }">
        <div class="container" >
          <router-view />
        </div>
      </main>
    </slot>

    <slot name="site-layout__footer">
      <WebsiteFooter />
    </slot>
  </div>
</template>

<style lang="scss">
@import './WebsiteLayout';
</style>
