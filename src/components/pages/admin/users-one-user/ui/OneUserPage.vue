<script setup>
import { onMounted } from 'vue';
import { doc, getDoc } from "firebase/firestore";
import { useRouter, useRoute } from "vue-router";
import {db} from "@/components/mixins";

const route = useRoute();
const uid = route.params.uid;
console.log(uid)

onMounted(() => {
    getUserData()
})

async function getUserData(){
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data())
    }
}

</script>

<template>
wdawdawafwfew
</template>

<style lang="scss" scoped>
@import './OneUserPage.scss';
</style>