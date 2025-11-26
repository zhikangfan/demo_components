<template>
  <div
    class="grid w-full leading-none"
    :style="{
      fontSize: `${fontSize}px`,
      gridTemplateColumns: `repeat(${column}, minmax(0px, 1fr))`,
    }"
  >
    <MathItem
      v-for="(row, index) in rows"
      :key="index"
      v-bind="row"
      @refresh="handleRefresh(index)"
    />
  </div>
</template>
<script setup>
import { defineProps, ref, watchEffect } from 'vue'
import MathItem from '@/components/MathItem/MathItem.vue'
const { total, column, exclude, fontSize, answerColor, showAnswer, type } = defineProps({
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
  decimalPoint: {
    // 小数点位
    type: Number,
    default: 0,
  },
  calculationRangeMin: {
    // 运算范围最小值
    type: Number,
    default: 1,
  },
  calculationRangeMax: {
    // 运算范围最大值
    type: Number,
    default: 9,
  },
  type: {
    // 类型，值：fill, result
    type: String,
    default: 'result', // 值有：addition, subtraction
  },
  shape: {
    // 方框样式
    type: String,
    default: 'square', // 值有：square, circle, underline, none, bracket
  },
})
const rows = ref([])
watchEffect(() => {
  rows.value = new Array(total).fill({
    answerColor,
    shape: 'underline', // square, circle, underline, none, bracket
    showAnswer,
    question: [
      {
        type: 'number',
        value: 2,
      },
      {
        type: 'symbol',
        value: '+',
      },
      {
        type: 'answer',
        value: 2,
      },
      {
        type: 'symbol',
        value: '×',
      },
      {
        type: 'number',
        value: 2,
      },
      {
        type: 'number', // 控制谁是答案
        value: 2,
      },
    ],
  })
})
const handleRefresh = (index) => {
  // console.log(index, '--reffre')
  // rows.value[index] = {
  //   ...otherProps,
  // }
}
</script>
