<script setup>
import { BannerCard } from "@/components/ui";
import { computed, onMounted, reactive, ref, watch  } from "vue";

const props = defineProps(['title', 'bannerData', 'quantity', 'data', 'empty'])
const emit = defineEmits(['addBanner', 'changeBanner', 'delete', 'changeData'])

const preloader = ref(false)

onMounted(() => {
    preloader.value = true
})

const arr = computed(() => {
    const bannerArr = []

    if(props.bannerData){
        props.bannerData.forEach(banner => {
            bannerArr.push({
                file: null,
                title: {
                    uk: banner.title.uk,
                    ru: banner.title.ru
                }, 
                url:  banner.url,
                id: banner.id,
                imagePath: banner.imagePath
            })
        });
    }

    return bannerArr
})

</script>

<template> 
    <div class="images-section">
        <h2 class="images-section__title"> {{ title }} </h2>

        <div class="images-section__images">
            <div v-if="preloader && !empty" class="images-section__images-preloader">
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
                v-if="quantity < 5" @add="(data) => $emit('addBanner', data)" 
                :quantity="quantity"  
                aspectRatio="true"
                empty="true"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './ImagesSection.scss';
</style>