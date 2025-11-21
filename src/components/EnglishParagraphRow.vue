<template>
  <div class="englishParagraphTable" :style="{ gap: `${finalLineSpacing}px` }">
    <PinyinRow v-for="(row, idx) in rows" :key="idx" v-bind="row" />
  </div>
</template>
<script setup>
import { computed, watchEffect, ref } from 'vue'
import PinyinRow from '@/components/PinyinRow/index.vue'
import PinyinRowProps from '@/components/PinyinRow/props.js'

const { content, unfilledRows, lineSpacing, unfilledNumber, ...otherProps } = defineProps({
  ...PinyinRowProps,
  content: {
    type: Array,
    default: () => [],
  },
  unfilledRows: {
    // 空行数量
    type: Number,
    default: 0,
  },
  unfilledNumber: {
    // 描词数量
    type: Number,
    default: 0,
  },
  lineSpacing: {
    type: Number,
    default: 0,
  },
})

const getValue = (params) => {
  const value = params * 3.8
  const decimalPart = value - Math.floor(value)

  if (decimalPart === 0) {
    // 小数位为0，不处理
    return value
  } else if (decimalPart > 0.6) {
    // 小数位大于0.6，向上取整
    return Math.ceil(value)
  } else {
    // 小数位小于等于0.6，向下取整
    return Math.floor(value)
  }
}
const finalLineSpacing = computed(() => {
  return getValue(lineSpacing)
})
const rows = ref([])
watchEffect(async () => {
  const origin = content.flatMap((item) => {
    const unfilledTextArr = new Array(unfilledNumber).fill(item)
    const unfilledRowsArr = new Array(unfilledRows).fill('')
    // 这里的顺序就决定了渲染顺序
    return [item, ...unfilledTextArr, ...unfilledRowsArr]
  })
  console.log(origin, '--')
  const spaceNum = unfilledNumber + unfilledRows + 1

  rows.value = origin.map((text, idx) => {
    return {
      ...otherProps,
      unfilledNumber: 0,
      text: text,
      filledColor: idx % spaceNum === 0 ? otherProps.filledColor : otherProps.unfilledColor,
    }
  })
})
</script>

<style scoped lang="less">
.englishParagraphTable {
  display: flex;
  flex-direction: column;
}
</style>
