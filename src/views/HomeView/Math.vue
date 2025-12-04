<template>
  <div>math</div>
</template>
<script setup lang="ts">
import { generateAddItem, generateSubtractItem } from '@/core/generateMath.ts'
import { generateMultiplyItem } from '@/core/multiply.ts'
import { generatetDivisionItem } from '@/core/division.ts'
import { generateContinuousAddOrSubtractItem } from '@/core/continuous.ts'
import { generateConversionItem } from '@/core/conversion.ts'
import { generateRMBBreakdownItem } from '@/core/rmb.ts'
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

const divisionList = new Array(total).fill('').map((item) => {
  return generatetDivisionItem({
    range: {
      min: 2,
      max: 1,
    },
    digits: 0,
    exclude: [0, 1],
    type: 'remainder',
  })
})

console.log(divisionList, '---div')
const continuousAddList = new Array(total).fill('').map((item) => {
  return generateContinuousAddOrSubtractItem({
    range: {
      min: 1,
      max: 9,
    },
    digits: 3,
    exclude: [0],
    type: 'subtract',
    count: 3,
  })
})
console.log(continuousAddList, '---coun')

const conversionWeightList = new Array(total).fill('').map((item) => {
  return generateConversionItem({
    units: [
      {
        name: '吨',
        name_en: 't',
        value: 1000000,
      },
      {
        name: '千克',
        name_en: 'kg',
        value: 1000,
      },
      {
        name: '斤',
        name_en: 'jin',
        value: 500,
      },
      {
        name: '克',
        name_en: 'g',
        value: 1,
      },
    ],
    selectedUnits: [1000, 500, 1],
    multiplier: false,
  })
})

console.log(conversionWeightList, '---conversionWeightList')
const conversionTimeList = new Array(total).fill('').map((item) => {
  return generateConversionItem({
    units: [
      {
        name: '天',
        name_en: 'd',
        value: 86400,
      },
      {
        name: '时',
        name_en: 'h',
        value: 3600,
      },
      {
        name: '分',
        name_en: 'm',
        value: 60,
      },
      {
        name: '秒',
        name_en: 's',
        value: 1,
      },
    ],
    selectedUnits: [3600, 60, 1],
    multiplier: false,
  })
})

console.log(conversionTimeList, '---conversionTimeList')

const rmbList = new Array(total).fill('').map((item) => {
  return generateRMBBreakdownItem({
    selectedUnits: [500, 100, 10, 1],
  })
})
console.log(rmbList, '---rmbList')
</script>
