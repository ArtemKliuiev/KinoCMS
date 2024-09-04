<script setup>
import { BannerCard } from "@/components/ui";
import {computed, onMounted, onUpdated, onBeforeUpdate, ref, watch} from "vue";

const props = defineProps(['title', 'bannerData', 'quantity'])
const emit = defineEmits(['addBanner', 'changeBanner'])

const switchInfo = ref(false)
const preloader = ref(false)



// const arr = ref(props.bannerData)
const arr = computed(() => {
    const bannerArr = []

    props.bannerData.forEach(banner => {
        bannerArr.push({
            file: null,
            title: banner.title,
            url:  banner.url,
            id: banner.id,
            imagePath: getUpdatedImageUrl(banner.imagePath)
        })
    });

    return bannerArr
})

function getUpdatedImageUrl(imageUrl) {
  return `${imageUrl}?v=${new Date().getTime()}`;
}


</script>

<template> 

{{ preloader }}
    <div class="banners-section">
        <div class="banners-section__top-line">
            <h2 class="banners-section__title"> {{ title }} </h2>

            <v-switch
                v-model="switchInfo"
                color="#388e3c"
                hide-details
                ></v-switch>
        </div>


        <div class="banners-section__banners" :class="{'red': preloader}">
            <BannerCard v-for="(item, index) in arr" :key="item" @change="(data) => $emit('changeBanner', data)" :bannerData="arr[index]" />

            <BannerCard v-if="quantity < 4" @add="(data) => $emit('addBanner', data)" :quantity="quantity"  empty="true"/>
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
.red{
  background-color: red;
}
</style>