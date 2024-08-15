<script setup>
defineProps(['open', 'showDesktop'])
</script>

<template>
  <div class="burger" :class="{ burger_active: open, burger_show: showDesktop }">
    <span></span>
  </div>
</template>


<style lang="scss" scoped>
@import './BurgerMenu.scss';
</style>