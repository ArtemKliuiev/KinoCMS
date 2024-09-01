<script setup>
import { BannerCard } from "@/components/ui";
import { computed, onMounted, ref  } from "vue";

const props = defineProps(['title', 'bannerData'])
const emit = defineEmits(['addBanner'])

const switchInfo = ref(false)
const addBannerForm = ref({
        file: null,
        title: '',
        url: ''
    })

// const arr = ref(props.bannerData)
const arr = computed(() => {
    const bannerArr = []

    // props.bannerData.forEach(banner => {
    //     bannerArr.push({
    //         file: null,
    //         title: banner.title,
    //         url:  banner.url,
    //         imagePath: banner.imagePath
    //     })
    // });

console.log(props.bannerData)

    return bannerArr
})

function changeBanner(){
    console.log(2222)
}

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
            <BannerCard v-for="(item, index) in arr" :key="item" @change="changeBanner" v-model="arr[index]" />

            <BannerCard @add="$emit('addBanner', addBannerForm)" v-model="addBannerForm" empty="true"/>

            {{ addBannerForm }}
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