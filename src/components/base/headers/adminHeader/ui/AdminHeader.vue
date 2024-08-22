<script setup>
import { BurgerMenu } from "@/components/ui";
import { onMounted, ref, watch } from "vue";
import { BaseButtonText } from "@/components/base";

const props = defineProps(['active'])
const emit = defineEmits(['close'])

function burgerClick() {
  const { lockScroll, unlockScroll } = useScrollLock()

  emit('close', !props.active)
  if (!props.active) {
    lockScroll()
  } else {
    unlockScroll()
  }
}
</script>

<template>
  <header class="admin-header">
    <div class="container">
      <div class="admin-header__main">
        <div class="admin-header__left-block">
          <div class="admin-header__burger">
            <BurgerMenu showDesktop="true" @click="burgerClick()" :open="active" />
          </div>

          <BaseButtonText class="admin-header__logo" to="/">KinoCMS</BaseButtonText>
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