<script setup>
import { BannerCard } from "@/components/ui";
import { onMounted, ref, watch  } from "vue";

const props = defineProps(['title', 'data'])
const emit = defineEmits(['setData', 'delete'])

const preloader = ref(true)
const switchBg = ref(false)
const dataBanner = ref({
    imagePath: ''
})

onMounted(() => {
    preloader.value = true
})

watch(props, () => {
    dataBanner.value.imagePath = props.data.imagePath
    switchBg.value = props.data.switch
    preloader.value = false
})

watch(switchBg, () => {
    setBackground()
})

function setBackground(data = null){
    emit('setData', {
        file: data?.file,
        switch: switchBg.value
    })
}
</script>

<template> 
    <div class="background-section">
        <div class="background-section__top-line">
            <h2 class="background-section__title"> {{ title }} </h2>

            <v-switch
                v-model="switchBg"
                color="#388e3c"
                hide-details
                :disabled="data.imagePath === ''"
                ></v-switch>
        </div>

        <div class="background-section__banners">
            <div v-if="preloader" class="background-section__banners-preloader">
                <v-progress-circular indeterminate></v-progress-circular>
            </div>

            <BannerCard 
                @add="setBackground" 
                @change="setBackground"
                @delete="(data) => $emit('delete', data)"
                background="true"
                :bannerData="dataBanner" 
                :empty="data.imagePath === ''"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './BackgroundSection.scss';
</style>