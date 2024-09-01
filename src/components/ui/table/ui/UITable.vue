<script setup>
import {computed, defineProps, ref} from 'vue'
import {BaseSvg} from "@/components/base";

const props = defineProps(['headers', 'items', 'btn'])
const emit = defineEmits(['sort', 'clickBtn'])

if(props.btn){
  props.headers.push(
    { value: 'btn', text: '', sort: false }
  )
}

const thisSort = ref({
  sortParam: '',
  sortArrow: ''
})

let counter = 0
function sortInfo(sortData){
  if(thisSort.value.sortParam === sortData.value){
    if(counter === 0){
      thisSort.value.sortArrow = 'top'
      counter = 1
    }else {
      thisSort.value.sortParam = ''
      thisSort.value.sortArrow = ''
      counter = 0
    }
  }else {
    thisSort.value.sortParam = sortData.value
    thisSort.value.sortArrow = 'bottom'
    counter = 0
  }

  emit('sort', thisSort.value)
}

</script>

<template>
  <div class="table">
    <div class="table__wrapper">
      <table>
        <thead>
        <tr>
          <th v-for="header in headers" :key="header.value">
            <div @click="sortInfo(header)" class="table__header">
              {{ header.text }}

              <div v-if="header.sort" class="table__arrows">
                <BaseSvg
                    class="table__arrows-arrow"
                    :class="{'table__arrows-arrow_active': header.value === thisSort.sortParam && thisSort.sortArrow === 'top'}"
                    id="arrow"
                />

                <BaseSvg
                    class="table__arrows-arrow"
                    :class="{'table__arrows-arrow_active': header.value === thisSort.sortParam && thisSort.sortArrow === 'bottom'}"
                    id="arrow"/>
              </div>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="header in headers" :key="header.value">
            <div class="table__item">
              <v-btn @click="$emit('clickBtn', item.uid)" v-if="header.value === 'btn'" > {{ btn }} </v-btn>


              <span v-else>
              {{ item[header.value] }}
            </span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
@import "UITable.scss";
</style>