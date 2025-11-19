<template>
  <div class="chineseTable" :style="{ gap: `${finalLineSpacing}px` }">
    <ChineseWordsRow v-for="(row, idx) in rows" :key="idx" v-bind="row" />
  </div>
</template>
<script setup>
import { pinyin, polyphonic } from 'pinyin-pro'
import HanziWriter from 'hanzi-writer'
import ChineseWordsRow from '@/components/ChineseWordsRow/ChineseWordsRow.vue'
import ChineseWordsRowProps from '@/components/ChineseWordsRow/props.js'
import { computed, watchEffect, ref } from 'vue'
import { isChinese } from '@/utils/reg.js'

const { content, unfilledRows, lineSpacing, chineseSize, pinyinHeight, ...otherProps } =
  defineProps({
    ...ChineseWordsRowProps,
    content: {
      type: Array,
      default: () => [],
    },
    unfilledRows: {
      // 空行数量
      type: Number,
      default: 1,
    },
    chineseSize: {
      type: Number,
      default: 10,
    },
    pinyinHeight: {
      type: Number,
      default: 8,
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
  const origin = content.flatMap((text) => {
    return [text, ...new Array(unfilledRows).fill('')]
  })
  rows.value = origin.map((text, idx) => {
    return {
      ...otherProps,
      words: text,
      chineseProps: {
        ...otherProps.chineseProps,
        size: getValue(chineseSize),
      },
      pinyinProps: {
        ...otherProps.pinyinProps,
        height: getValue(pinyinHeight),
      },
    }
  })
})
</script>

<style scoped lang="less">
.chineseTable {
  display: flex;
  flex-direction: column;
}
</style>
