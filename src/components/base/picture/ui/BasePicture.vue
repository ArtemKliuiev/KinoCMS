<script setup>
defineProps(['srcset', 'src', 'alt', 'width', 'height', 'lazy'])
</script>

<template>
  <picture>
    <source :srcset="srcset" type="image/webp" />
    <img
      :loading="lazy ? 'lazy' : 'eager'"
      :width="width"
      :height="height"
      :src="src"
      :alt="alt ? alt : 'img'"
    />
  </picture>
</template>

<style>
@import "./BasePicture.scss";
</style>