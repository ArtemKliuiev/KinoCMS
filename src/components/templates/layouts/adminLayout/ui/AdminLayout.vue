<script setup>
import { AdminHeader, AdminFooter, AdminNavigation } from '@/components/organisms'
</script>

<template>
  <div class="admin-layout">
    <slot name="header">
      <AdminHeader />
    </slot>

    <slot name="main">
      <main class="main">
        <nav class="main__navigation">
          <AdminNavigation />
        </nav>

        <div class="main__page">
          <router-view />
        </div>
      </main>
    </slot>

    <slot name="footer">
      <AdminFooter />
    </slot>
  </div>
</template>

<style lang="scss">
@import './AdminLayout.scss';
</style>
