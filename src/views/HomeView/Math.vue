<template>
  <div>math</div>
</template>
<script setup lang="ts">
import { generateAddItem, generateSubtractItem } from '@/core/generateMath.ts'
import { generateMultiplyItem } from '@/core/multiply.ts'
const total = 5
const range = { min: 1, max: 9 }
const digits = 0
const exclude = [0]

const addList = new Array(total).fill('').map((item) =>
  generateAddItem({
    range: range,
    digits: digits,
    carry: true,
    exclude: exclude,
  }),
)

const subList = new Array(total).fill('').map((item) =>
  generateSubtractItem({
    range: range,
    digits: digits,
    borrow: false,
    exclude: exclude,
  }),
)
console.log(addList, '--add List')
console.log(subList, '--sub List')
const multiplyList = new Array(total).fill('').map((item) =>
  generateMultiplyItem({
    range: {
      min: 1,
      max: 1,
    },
    digits: digits,
    exclude: exclude,
  }),
)
console.log(multiplyList, '--multiply List')
</script>
