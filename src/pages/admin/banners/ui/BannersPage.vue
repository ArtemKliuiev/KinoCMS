<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <BannersSection v-if="topSliders" :items="topSliders" />
    {{ topSliders }}
  </div>
</template>

<script setup lang="ts">
import { BannersSection } from '@/widgets/banners'
import { useApi } from '@/shared/api'
import { SlidersApi } from '@/shared/api/gen'
import { ref } from 'vue'

const topSliders = ref<Array<{}>>([])

const breadcrumbs = [
  {
    title: 'Admin',
    disabled: false,
    href: 'statistics'
  },
  {
    title: 'Banners',
    disabled: true
  }
]

async function getTopSliders() {
  const api = await useApi(SlidersApi)

  const response = await api.getTopSlider({})

  topSliders.value = response.data.items
  console.log(response)
}

getTopSliders()
</script>

<style lang="scss" scoped>
@import 'styles';
</style>
