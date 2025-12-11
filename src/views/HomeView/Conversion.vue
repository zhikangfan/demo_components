<template>
  <div v-for="(item, idx) in conversionWeightList" :key="idx">
    <span v-for="(it, i) in item.list" :key="it.value">
      <span v-if="i !== 0">=</span>
      {{ it.value }}{{ it.name }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { generateConversionItem } from '@/core/conversion.ts'
const conversionWeightList = ref([])
onMounted(() => {
  const total = 10
  // conversionWeightList.value = new Array(total).fill('').map((item) => {
  //   return generateConversionItem({
  //     units: [
  //       {
  //         name: '吨',
  //         name_en: 't',
  //         value: 1000000,
  //       },
  //       {
  //         name: '千克',
  //         name_en: 'kg',
  //         value: 1000,
  //       },
  //       {
  //         name: '斤',
  //         name_en: 'jin',
  //         value: 500,
  //       },
  //       {
  //         name: '克',
  //         name_en: 'g',
  //         value: 1,
  //       },
  //     ],
  //     selectedUnits: [1000, 500, 1],
  //     multiplier: false,
  //   })
  // })

  conversionWeightList.value = new Array(total).fill('').map((item) => {
    const selectedUnits = [3600, 60, 1]
    const maxUnit = Math.max(...selectedUnits.map((item) => item)) // 找到单位的最大值
    let max = 60
    if (maxUnit === 3600) {
      max = 24
    }
    if (maxUnit === 86400) {
      max = 7
    }
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
      selectedUnits: selectedUnits,
      multiplier: false,
      max: max,
      min: 1,
    })
  })
  //
  // console.log(conversionTimeList, '---conversionTimeList')
})
</script>
