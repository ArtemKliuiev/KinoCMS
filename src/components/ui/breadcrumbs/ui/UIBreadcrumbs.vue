<script setup>
import {BaseButtonText} from "@/components/base/index.js";

defineProps(['breadcrumbs'])
</script>

<template>
  <div class="breadcrumbs">
    <div
        v-for="(link, index) in breadcrumbs"
        :key="link" class="breadcrumbs__link"
        :class="{breadcrumbs__link_disabled: link.disabled}"
    >
      <span v-if="link.disabled" > {{ link.title }} </span>

      <BaseButtonText v-else  :to="link.to" > {{ link.title }} </BaseButtonText>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import 'UIBreadcrumbs';
</style>