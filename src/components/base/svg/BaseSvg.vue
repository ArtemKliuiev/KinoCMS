<template>
  <svg><use :href="`#${id}`"></use></svg>
</template>

<script setup>
defineProps(['id'])
</script>
