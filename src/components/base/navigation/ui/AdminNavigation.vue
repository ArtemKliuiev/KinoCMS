<script setup lang="ts">
import { adminPages } from "@/components/composable";
import { computed } from "vue";

const props = defineProps(['active'])
const emit = defineEmits(['close'])


</script>

<template>
  <nav class="navigation" :class="{ navigation_active: active }">

    <ul>
      <li v-for="item in adminPages" :key="item">
        <router-link @click="emit('close', false)" :to="item.path">{{ item.title
          }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import './AdminNavigation.scss';
</style>