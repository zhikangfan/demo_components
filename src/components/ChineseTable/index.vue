<template>
  <div class="chineseTable" :style="{ gap: `${finalLineSpacing}px` }">
    <ChineseRow
      v-for="(row, idx) in rows"
      :key="idx"
      v-bind="row"
      @ok="
        (value, cell, columnIndex) =>
          handleOk({
            cell: cell,
            columnIndex,
            row: row,
            rowIndex: idx,
            value: value,
          })
      "
      @cancel="
        (cell, columnIndex) =>
          handleCancel({
            cell: cell,
            columnIndex,
            row: row,
            rowIndex: idx,
          })
      "
      @after-close="
        (cell, columnIndex) =>
          handleAfterClose({
            cell: cell,
            columnIndex,
            row: row,
            rowIndex: idx,
          })
      "
    />
  </div>
</template>
<script setup>
import { pinyin } from 'pinyin-pro'
import HanziWriter from 'hanzi-writer'
import ChineseRow from '@/components/ChineseRow/ChineseRow.vue'
import ChineseRowProps from '@/components/ChineseRow/props.js'
import { computed, watchEffect, ref } from 'vue'
import { isChinese } from '@/utils/reg.js'
import { v4 as uuidv4 } from 'uuid'
const emit = defineEmits(['ok', 'cancel', 'afterClose'])
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
const handleOk = (args) => {
  const { cell, value } = args
  for (let i = 0; i < rows.value.length; i++) {
    if (rows.value[i]?.word?.id === cell.groupId) {
      rows.value[i].chineseProps.pinyin = value
      rows.value[i].pinyinProps.text = value
    }
  }
  emit('ok', args)
}
const handleCancel = (args) => {
  emit('cancel', args)
}
const handleAfterClose = (args) => {
  emit('afterClose', args)
}

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
  const task = await Promise.allSettled(content.map((text) => getWriter(text, 23)))
  const data = content.map((word, idx) => {
    const info = pinyin(word, { type: 'all' })[0]
    return {
      word: word,
      info: info,
      pinyin: info?.pinyin,
      chinese: word,
      strokes: task[idx].value,
      id: uuidv4(),
    }
  })
  const origin = data.flatMap((text) => {
    return [text, ...new Array(unfilledRows).fill('')]
  })

  rows.value = origin.map((word) => {
    return {
      ...otherProps,
      word: word || {},
      chineseStrokes: word?.strokes,
      chineseStrokeSize: getValue(chineseStrokeSize),
      chineseProps: {
        ...otherProps.chineseProps,
        size: getValue(chineseSize),
        text: word?.word,
        pinyin: word?.pinyin,
        polyphonic: word?.info?.polyphonic || [],
      },
      pinyinProps: {
        ...otherProps.pinyinProps,
        height: getValue(pinyinHeight),
        text: word?.pinyin,
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
