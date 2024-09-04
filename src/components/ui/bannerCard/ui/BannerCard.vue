<script setup>
import { BaseSvg } from "@/components/base";
import { ref, watch, onUpdated } from 'vue';
import {adminValidationRules} from "@/components/mixins/index.js";
 
const props = defineProps(['bannerData','empty', 'quantity'])
const emit = defineEmits([ 'change', 'add'])

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

</script>

<template>
  <div  @click="dialog = true" class="banner-card">
    <div v-if="empty"  class="banner-card__empty">

      <BaseSvg class="banner-card__empty-icon" id="plus" />
    </div>

    <div v-else class="banner-card__default">
<!--      <v-img-->
<!--          width="100%"-->
<!--          height="100%"-->
<!--          class="no-transition"-->
<!--          cover-->
<!--          -->
<!--      ></v-img>-->
      <img :src="formBannerCard.imagePath">

    </div>
  </div>

  <v-dialog v-model="dialog" width="auto">
    <div class="banner-card__dialog">
      <v-sheet class="mx-auto pa-5 rounded">
        <v-form v-model="validForm" fast-fail @submit.prevent="addData">
          <h3 class="banner-card__dialog-title">
            <span v-if="empty">Додати баннер</span>

            <span v-else>Змінити баннер</span>
          </h3>

          <v-file-input v-if="empty" class="mb-2" v-model="formBannerCard.file" :rules="rules.necessarilyFile" accept="image/*" label="Завантажити зображення" variant="solo-filled"></v-file-input>

          <v-file-input v-else class="mb-2" v-model="formBannerCard.file" :rules="rules.file" accept="image/*" label="Завантажити нове зображення" variant="solo-filled"></v-file-input>

          <v-text-field class="mb-2" v-model="formBannerCard.title" :rules="rules.title" variant="solo-filled"
            label="Заголовок"></v-text-field>

          <v-text-field class="mb-2" v-model="formBannerCard.url" :rules="rules.url" variant="solo-filled"
            label="URL"></v-text-field>

          <v-btn color="#2a2a2a" class="mt-2 mb-3" type="submit" block>
            <span v-if="empty">Додати</span>

            <span v-else>Змінити</span>
          </v-btn>

          <v-btn v-if="!empty" color="#d32f2f" type="submit" block>Видалити</v-btn>
        </v-form>
      </v-sheet>
    </div>
  </v-dialog>
</template>

<style lang="scss" scoped>
@import './BannerCard.scss';

.no-transition {
  transition: none !important; /* Отключение всех CSS переходов */
}
</style>