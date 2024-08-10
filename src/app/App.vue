<template>
  <v-app>
    <component :is="layout">
      <template v-slot:header>
      </template>

      <template v-slot:main>
      </template>

      <template v-slot:footer>
      </template>
    </component>
  </v-app>

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { AdminLayout, WebsiteLayout } from "@/components/templates/layouts";

const route = useRoute()
const layout = computed(() => route.meta.layout || AdminLayout)
</script>

<style lang="scss" scoped></style>