<script setup>
import { BurgerMenu } from "@/components/ui";
import { ref } from "vue";

const props = defineProps(['active'])
const emit = defineEmits(['close'])

function burgerBtn() {
  emit('close', !props.active)
}

</script>

<template>
  <header class="admin-header">
    <div class="container">
      <div class="admin-header__main">
        <div class="admin-header__left-block">
          <div class="admin-header__burger">
            <BurgerMenu showDesktop="true" @click="burgerBtn()" :open="active" />
          </div>

          <RouterLink class="admin-header__logo" to="/">KinoCMS</RouterLink>
        </div>

        <div class="admin-header__right-block admin-header__exit">
          <v-btn size="small" icon>
            <v-icon icon="mdi mdi-exit-to-app"></v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import './AdminHeader.scss';
</style>