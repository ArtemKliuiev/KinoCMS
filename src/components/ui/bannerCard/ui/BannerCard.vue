<script setup>
import { BaseSvg } from "@/components/base";
import { ref, watch } from 'vue';
import {adminValidationRules} from "@/components/mixins/index.js";
import {BasePicture} from "@/components/base/index.js";
 
const props = defineProps(['bannerData', 'aspectRatio', 'empty', 'quantity', 'background'])
const emit = defineEmits([ 'change', 'add', 'delete'])

const rules = adminValidationRules()
const validForm = ref(false)
const dialog = ref(false)
const formBannerCard = ref({
  file: null,
  title: '',
  url: '',
  imagePath: '',
  id: props.quantity
})

if(props.bannerData){
  formBannerCard.value = props.bannerData
} 

watch(props, () => {
  formBannerCard.value.id = props.quantity

  if(props.empty){
    console.log('clean')
    formBannerCard.value.file = null
    formBannerCard.value.title = ''
    formBannerCard.value.url = ''
  }
})

function addData(){
  if(validForm.value){
    if(props.empty){
      emit('add', formBannerCard.value)

    }else{
      emit('change', formBannerCard.value)
    }

    dialog.value = false
  }
}

async function delBanner(){ 
  const question = confirm(props.background? 'Видалити задній фон' :'Видалити баннер')

  if(question){
    emit('delete', formBannerCard.value)
    dialog.value = false
  }
}
</script>

<template>
  <div  @click="dialog = true" class="banner-card" :class="{'banner-card-aspect' : aspectRatio}">
    <div v-if="empty"  class="banner-card__empty">
      <BaseSvg class="banner-card__empty-icon" id="plus" />
    </div>

    <div v-else class="banner-card__default" :class="{'banner-card__default-bg' : background}">
      <BasePicture :src="formBannerCard.imagePath"/>
    </div>
  </div>

  <v-dialog v-model="dialog" width="auto">
    <div class="banner-card__dialog">
      <v-sheet class="mx-auto pa-5 rounded">
        <v-form v-model="validForm" fast-fail @submit.prevent="addData">
          <h3 class="banner-card__dialog-title">
            <span v-if="empty && !background">Додати баннер</span>

            <span v-if="!empty && !background">Змінити баннер</span>

            <span v-if="empty && background">Додати задній фон</span>

            <span v-if="!empty && background">Змінити задній фон</span>
          </h3>

          <v-file-input v-if="empty" class="mb-2" v-model="formBannerCard.file" :rules="rules.necessarilyFile" accept="image/*" label="Завантажити зображення" variant="solo-filled"></v-file-input>

          <v-file-input v-if="!empty && !background" class="mb-2" v-model="formBannerCard.file" :rules="rules.file" accept="image/*" label="Завантажити нове зображення" variant="solo-filled"></v-file-input>

          <v-file-input v-if="!empty && background" class="mb-2" v-model="formBannerCard.file" :rules="rules.necessarilyFile" accept="image/*" label="Завантажити нове зображення" variant="solo-filled"></v-file-input>

          <v-text-field v-if="!background" class="mb-2" v-model="formBannerCard.title" :rules="rules.title" variant="solo-filled"
            label="Заголовок"></v-text-field>

          <v-text-field v-if="!background" class="mb-2" v-model="formBannerCard.url" :rules="rules.url" variant="solo-filled"
            label="URL"></v-text-field>

          <v-btn color="#2a2a2a" class="mt-2 mb-3" type="submit" block>
            <span v-if="empty">Додати</span>

            <span v-else>Змінити</span>
          </v-btn>

          <v-btn v-if="!empty" color="#d32f2f" @click="delBanner" block>Видалити</v-btn>
        </v-form>
      </v-sheet>
    </div>
  </v-dialog>
</template>

<style lang="scss" scoped>
@import './BannerCard.scss';
</style>