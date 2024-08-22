<script setup>
import { WebsiteHeader, WebsiteFooter } from '@/components/base'
</script>

<template>
  <div class="site-layout">
    <slot name="header">
      <div class="site-layout__header">
        <WebsiteHeader />
      </div>

    </slot>

    <slot name="main">
      <main class="site-layout__main main">
        <div class="container">
          <router-view />
        </div>
      </main>
    </slot>

    <slot name="site-layout__footer">
      <WebsiteFooter />
    </slot>
  </div>
</template>

<style lang="scss">
@import './WebsiteLayout';
</style>
