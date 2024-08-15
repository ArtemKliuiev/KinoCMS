<script setup>
import { onMounted } from "vue";
import { db } from "../../../../composable";
import { collection, addDoc } from "firebase/firestore";

onMounted(() => {
  addFirebase()
})

async function addFirebase() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



</script>

<template>
  AuthPage
</template>

<style lang="scss" scoped>
@import './AuthPage.scss';
</style>