<script setup>
import { AdminHeader, AdminNavigation } from '@/components/base'
import { ref } from "vue";

const burger = ref(false)


</script>

<template>
  <div class="admin-layout">
    <slot name="header">
      <AdminHeader :active="burger" @close="(e) => burger = e" />
    </slot>

    <slot name="main">
      <main class="main">
        <nav class="main__navigation">
          <AdminNavigation :active="burger" @close="(e) => burger = e" />
        </nav>

        <div class="main__page">
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
