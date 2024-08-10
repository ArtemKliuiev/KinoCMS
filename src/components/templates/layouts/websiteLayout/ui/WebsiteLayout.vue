<script setup>
import { WebsiteHeader, WebsiteFooter } from '@/components/organisms'
</script>

<template>
  <div class="site-layout">
    <slot name="header">
      <WebsiteHeader />
    </slot>

    <slot name="main">
      <main class="main">
        <router-view />
      </main>
    </slot>

    <slot name="footer">
      <WebsiteFooter />
    </slot>
  </div>
</template>

<style lang="scss">
@import './WebsiteLayout';
</style>
