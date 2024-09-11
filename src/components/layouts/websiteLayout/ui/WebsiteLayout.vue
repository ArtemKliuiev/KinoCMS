<script setup>
import { WebsiteHeader, WebsiteFooter } from '@/components/base'
import { useRoute} from 'vue-router'
import { useScrollLock } from "@/components/composable";
import { collection, getDocs } from "firebase/firestore";
import { db, piniaStorage } from "@/components/mixins";
import { onMounted, ref, watch } from 'vue';

const storage = piniaStorage()
const backgroundUrl = ref('')
const backgroundSwitch = ref(false)
const route = useRoute()

onMounted(() => {
  storage.switchPreloader()
  getBackground()
  useScrollLock(true)
})

watch(() => route.name, () => {
    storage.switchPreloader()
    useScrollLock(true)
  }
);

watch(storage, () => {
  useScrollLock(storage.preloader)
})


async function getBackground(){
  const collectionRef = collection(db, "data");
  const querySnapshot = await getDocs(collectionRef);

  const allData = {};
  querySnapshot.forEach((doc) => {
    allData[doc.id] = doc.data();
  });

  backgroundUrl.value = allData.background.imagePath
  backgroundSwitch.value = allData.background.switch

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
      <main v-if="backgroundSwitch" class="site-layout__main main" :style="{ backgroundImage: `url(${backgroundUrl}) ` }">
        <div v-if="storage.preloader" class="site-layout__preloader">
          <v-progress-circular indeterminate ></v-progress-circular>
        </div>

        <div class="container" >
          <router-view />
        </div>
      </main>

      <main v-else class="site-layout__main main">
        <div v-if="storage.preloader" class="site-layout__preloader">
          <v-progress-circular indeterminate ></v-progress-circular>
        </div>

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
