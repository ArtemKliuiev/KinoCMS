<script setup>
import BaseSvg from "../../../base/svg/BaseSvg.vue";
import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'

const props = defineProps(['list', 'title', 'id', 'small'])
const emit = defineEmits(['submit'])
const router = useRouter()

let dropActive = ref(false)
const selected = ref('')
const currentDrop = ref(null)

function select(li) {
  selected.value = li

  emit('submit', li)
}

onMounted(() => {
  window.addEventListener('click', checkClick)
})

function toggleActive() {
  dropActive.value = !dropActive.value
}
function checkClick(e) {
  if (dropActive.value && !currentDrop.value.contains(e.target)) {
    dropActive.value = false
  }
}
</script>

<template>
  <div ref="currentDrop" @click="toggleActive" :class="{ dropdown_active: dropActive, dropdown_small: small }"
    class="dropdown">
    <div class="dropdown__btn">
      <span>{{ selected ? selected : title }}</span>

      <BaseSvg :id="'dropArrow'" />
    </div>
    <ul class="dropdown__list">
      <li @click="select(item)" v-for="(item, id) in list" :key="id">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import './UiDropDown.scss'
</style>
