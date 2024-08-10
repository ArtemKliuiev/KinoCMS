<template>
  <header class="header">
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-btn icon>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
      </template>

      <v-app-bar-title>KinoCMS</v-app-bar-title>
    </v-app-bar>
  </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import './AdminHeader.scss';
</style>