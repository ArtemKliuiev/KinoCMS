<script setup>
import { AdminHeader, AdminNavigation } from '@/components/base'
import { ref } from "vue";

const burger = ref(false)


</script>

<template>
  <div class="admin-layout">
    <slot name="header">
      <div class="admin-layout__header">
        <AdminHeader :active="burger" @close="(e) => burger = e" />
      </div>
    </slot>

    <slot name="main">
      <main class="admin-layout__main">
        <nav class="admin-layout__main-navigation">
          <AdminNavigation :active="burger" @close="(e) => burger = e" />
        </nav>

        <div class="admin-layout__main-page">
          <div class="container">
            <router-view />
          </div>
        </div>
      </main>
    </slot>
  </div>
</template>

<style lang="scss">
@import './AdminLayout.scss';
</style>
