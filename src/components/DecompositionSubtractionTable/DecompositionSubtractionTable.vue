<template>
  <div
    class="grid leading-none w-full"
    :style="{
      fontSize: `${fontSize}px`,
      gridTemplateColumns: `repeat(${column}, minmax(0px, 1fr))`,
    }"
  >
    <DecompositionSubtractionRow
      v-for="(row, index) in rows"
      :key="index"
      v-bind="row"
      @refresh="handleRefresh(index)"
    />
  </div>
</template>
<script setup>
import { defineProps, ref, watchEffect } from 'vue'
import DecompositionSubtractionRow from '@/components/DecompositionSubtractionRow/DecompositionSubtractionRow.vue'
const { total, column, exclude, fontSize, answerColor, showAnswer } = defineProps({
  total: {
    // 题目数量
    type: Number,
    default: 10,
  },
  column: {
    // 列数
    type: Number,
    default: 3,
  },
  exclude: {
    // 排除的运算数
    type: Array,
    default() {
      return []
    },
  },
  fontSize: {
    type: Number,
    default: 16,
  },
  answerColor: {
    type: String,
    default: '#ff0000ff',
  },
  showAnswer: {
    type: Boolean,
    default: false,
  },
})
const rows = ref([])
watchEffect(() => {
  rows.value = new Array(total).fill({
    answerColor,
    showAnswer,
    first: 17,
    second: 5,
    answer: 14,
    decomposition: {
      first: 5,
      second: 10,
      third: 0,
    },
  })
})
const handleRefresh = (index) => {
  // console.log(index, '--reffre')
  // rows.value[index] = {
  //   ...otherProps,
  // }
}
</script>
