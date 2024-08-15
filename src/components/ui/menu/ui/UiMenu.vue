<script setup>
import BaseSvg from "@/components/base/svg/BaseSvg.vue";
import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'

const props = defineProps(['list', 'id', 'title'])
const emit = defineEmits(['submit'])

let dropActive = ref(false)

const listTop = ref(null)
const selected = ref('')
const currentDrop = ref(null)
const currentList = ref(null)

function observer() {
  const listHeight = currentList.value.offsetHeight

  const options = {
    rootMargin: `0px 0px -${listHeight ? listHeight + 40 : 200}px 0px`,
  };

  function callback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        listTop.value = false
      } else {
        listTop.value = true
      }
    });
  }

  const observer = new IntersectionObserver(callback, options)
  if (currentDrop.value) {
    observer.observe(currentDrop.value)
  }
}

onMounted(() => {
  window.addEventListener('click', checkClick)
  observer()
})

function checkClick(e) {
  if (dropActive.value && !currentDrop.value.contains(e.target)) {
    dropActive.value = false
  }
}
</script>

<template>
  <div ref="currentDrop" @click="dropActive = !dropActive" :class="{ menu_active: dropActive }" class="menu">
    <div class="menu__btn">
      <span>{{ title }}</span>
    </div>
    <ul ref="currentList" class="menu__list" :class="{ menu__list_top: listTop, menu__list_bottom: !listTop }">
      <li v-for="item in list" :key="item">
        <RouterLink @click="$emit('submit')" :to="item.path"> {{ item.title }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import './UiMenu.scss'
</style>
