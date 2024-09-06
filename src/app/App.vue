<template>
  <component :is="layout">
    <template v-slot:header>
    </template>

    <template v-slot:main>
    </template>

    <template v-slot:footer>
    </template>
  </component>

  <SvgManager />
</template>

<script setup>
import { useRoute} from 'vue-router'
import { computed } from 'vue'
import { AdminLayout } from "@/components/layouts";
import SvgManager from "@/components/base/svg/SvgManager.vue";

const route = useRoute()

const layout = computed(() => route.meta.layout || AdminLayout)


</script>

<style lang="scss" scoped></style>