<script setup>
import { BannerCard } from "@/components/ui";
import { onMounted, ref  } from "vue";

defineProps(['title'])

const switchInfo = ref(false)
const arr = [1,2,3]

</script>

<template>
    <div class="banners-section">
        <div class="banners-section__top-line">
            <h2 class="banners-section__title"> {{ title }} </h2>

            <v-switch
                v-model="switchInfo"
                color="#388e3c"
                hide-details
                ></v-switch>
        </div>


        <div class="banners-section__banners">
            <BannerCard v-for="item in arr" :key="item" />

            <BannerCard empty="true"/>
        </div>

        <div class="banners-section__bottom-line">
            <v-select
            width ="250"
                label="Швидкість обертання"
                hide-details
                :items="['1 секунда', '3 секунди', '5 секунд', '10 секунд', '15 секунд']"
                variant="solo-filled">
    
            </v-select>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './BannersSection.scss';
</style>