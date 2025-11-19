<template>
  <div class="chineseTable" :style="{ gap: `${finalLineSpacing}px` }">
    <ChineseRow v-for="(row, idx) in rows" :key="idx" v-bind="row" />
  </div>
</template>
<script setup>
import { pinyin, polyphonic } from 'pinyin-pro'
import HanziWriter from 'hanzi-writer'
import ChineseRow from '@/components/ChineseRow/ChineseRow.vue'
import ChineseRowProps from '@/components/ChineseRow/props.js'
import { computed, watchEffect, ref } from 'vue'
import { isChinese } from '@/utils/reg.js'

const {
  content,
  unfilledRows,
  chineseSize,
  pinyinHeight,
  lineSpacing,
  chineseStrokeSize,
  ...otherProps
} = defineProps({
  ...ChineseRowProps,
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
  chineseStrokeSize: {
    type: Number,
    default: 8,
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
const getWriter = async (text, size) => {
  if (!text || !isChinese(text)) {
    return []
  }
  try {
    // 从 Hanzi Writer CDN 加载原始字符数据。 加载完成时返回 promise 的 resolves。
    const charData = await HanziWriter.loadCharacterData(text)
    return charData.strokes.map((item, i) => {
      return {
        transform: HanziWriter.getScalingTransform(size, size),
        path: charData.strokes.slice(0, i + 1),
        size: size,
      }
    })
  } catch (e) {
    console.error('writer error:', e)
    return []
  }
}
const rows = ref([])
watchEffect(async () => {
  const origin = content.flatMap((text) => {
    return [text, ...new Array(unfilledRows).fill('')]
  })
  const task = await Promise.allSettled(origin.map((text) => getWriter(text, 23)))
  rows.value = origin.map((text, idx) => {
    const pinyinText = text ? pinyin(text, { nonZh: 'removed' }) : ''
    return {
      ...otherProps,
      chineseStrokes: task[idx].value,
      chineseStrokeSize: getValue(chineseStrokeSize),
      chineseProps: {
        ...otherProps.chineseProps,
        size: getValue(chineseSize),
        text: text,
        pinyin: pinyinText,
        polyphonic: text ? polyphonic(text, { type: 'array', nonZh: 'removed' })?.[0] : [],
      },
      pinyinProps: {
        ...otherProps.pinyinProps,
        height: getValue(pinyinHeight),
        text: pinyinText,
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
