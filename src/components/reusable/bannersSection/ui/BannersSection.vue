<script setup>
import { BannerCard } from "@/components/ui";
import { computed, onMounted, ref  } from "vue";

const props = defineProps(['title', 'bannerData', 'quantity'])
const emit = defineEmits(['addBanner', 'changeBanner', 'delete'])

const switchInfo = ref(false)

// const arr = ref(props.bannerData)
const arr = computed(() => {
    const bannerArr = []

    props.bannerData.forEach(banner => {
        bannerArr.push({
            file: null,
            title: banner.title,
            url:  banner.url,
            id: banner.id,
            imagePath: banner.imagePath
        })
    });

    return bannerArr
})


</script>

<template> 

{{ quantity }}
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
            <BannerCard 
                v-for="(item, index) in arr" 
                :bannerData="arr[index]" 
                :key="item"
                @delete="(data) => $emit('delete', data)" 
                @change="(data) => $emit('changeBanner', data)" />

            <BannerCard 
                v-if="quantity < 4" @add="(data) => $emit('addBanner', data)" 
                :quantity="quantity"  
                empty="true"/>
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