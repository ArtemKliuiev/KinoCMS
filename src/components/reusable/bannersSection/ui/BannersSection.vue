<script setup>
import { BannerCard } from "@/components/ui";
import { computed, onMounted, reactive, ref, watch  } from "vue";

const props = defineProps(['title', 'bannerData', 'quantity', 'data'])
const emit = defineEmits(['addBanner', 'changeBanner', 'delete', 'changeData'])

const preloader = ref(false)
const bannersData = reactive({
    select: '',
    switch: false
})

onMounted(() => {
    preloader.value = true
})

watch(props, () => {
    if(props.data.select){
        bannersData.select = props.data.select
    }

    if(props.data.switch){
        bannersData.switch = props.data.switch
    }
})

watch(bannersData, () => {
    emit('changeData', bannersData)
})

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

watch(arr, () => {
    preloader.value = false
})
</script>

<template> 
    <div class="banners-section">
        <div class="banners-section__top-line">
            <h2 class="banners-section__title"> {{ title }} </h2>

            <v-switch
                v-model="bannersData.switch"
                color="#388e3c"
                hide-details
                >
            </v-switch>
        </div>

        <div class="banners-section__banners">
            <div v-if="preloader" class="banners-section__banners-preloader">
                <v-progress-circular indeterminate></v-progress-circular>
            </div>

            <BannerCard 
                v-for="(item, index) in arr" 
                :bannerData="arr[index]" 
                :key="item"
                aspectRatio="true"
                @delete="(data) => $emit('delete', data)" 
                @change="(data) => $emit('changeBanner', data)" />

            <BannerCard 
                v-if="quantity < 4" @add="(data) => $emit('addBanner', data)" 
                :quantity="quantity"  
                aspectRatio="true"
                empty="true"/>
        </div>

        <div class="banners-section__bottom-line">
            <v-select
            width ="250"
                label="Швидкість обертання"
                hide-details
                v-model="bannersData.select"
                :items="['1 секунда', '3 секунди', '5 секунд', '10 секунд', '15 секунд']"
                variant="solo-filled">
    
            </v-select>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './BannersSection.scss';
</style>