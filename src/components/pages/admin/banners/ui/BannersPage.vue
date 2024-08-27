<script setup>
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onMounted, ref } from 'vue';
import { BannersSection } from '@/components/reusable';

const image = ref(null)




async function inputFile(event){
  const storage = getStorage();
  const storegeImages = storageRef(storage, 'images');
  const spaceRef = storageRef(storegeImages, 'space.jpg');
  const file = event.target.files[0]

  if(file.type.startsWith('image/') || file.type !== "image/gif"){
    await uploadBytes(spaceRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
    });

    const downloadURL = await getDownloadURL(spaceRef);

    image.value = downloadURL
  }
}

</script>

<template>

<BannersSection  title="Верхні баннери"/>


<img :src="image" alt="">
</template>


<style lang="scss" scoped>
@import './BannersPage.scss';
</style>