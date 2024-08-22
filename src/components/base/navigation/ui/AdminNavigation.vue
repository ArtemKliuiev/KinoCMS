<script setup lang="ts">
import { adminPages } from "@/components/mixins";
import { BaseButtonText } from "@/components/base";

const props = defineProps(['active'])
const emit = defineEmits(['close'])


</script>

<template>
  <nav class="navigation" :class="{ navigation_active: active }">

    <ul class="navigation__list">
      <li v-for="item in adminPages" :key="item">
        <BaseButtonText @click="emit('close', false)" :to="item.path">{{ item.title
          }}</BaseButtonText>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import './AdminNavigation.scss';
</style>