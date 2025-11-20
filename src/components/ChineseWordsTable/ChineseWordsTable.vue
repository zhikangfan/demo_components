<template>
  <div class="chineseTable" :style="{ gap: `${finalLineSpacing}px` }">
    <ChineseWordsRow
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
import ChineseWordsRow from '@/components/ChineseWordsRow/ChineseWordsRow.vue'
import ChineseWordsRowProps from '@/components/ChineseWordsRow/props.js'
import { computed, watchEffect, ref } from 'vue'
import { pinyin } from 'pinyin-pro'
import { v4 as uuidv4 } from 'uuid'
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

const emit = defineEmits(['ok', 'cancel', 'afterClose'])
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
  // 得到cell的信息

  const data = origin.map((words) => {
    const info = pinyin(words, { type: 'all' })
    const wordsInfo = words.split('').map((word, idx) => {
      return {
        pinyin: info[idx].pinyin,
        chinese: word,
        info: info,
        id: uuidv4(),
      }
    })
    return {
      words: words,
      wordsInfo: wordsInfo,
    }
  })

  const spaceNum = unfilledRows + 1

  rows.value = data.map((item, idx) => {
    return {
      ...otherProps,
      words: item,
      canEditRow: idx % spaceNum === 0,
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
/**
 * 修改拼音
 * @param args
 */
const handleOk = (args) => {
  const { cell, value } = args
  for (let i = 0; i < rows.value.length; i++) {
    const row = rows.value[i]
    for (let k = 0; k < row.words.wordsInfo.length; k++) {
      const wordsInfo = row.words.wordsInfo[k]
      if (wordsInfo.id === cell.groupId) {
        rows.value[i].words.wordsInfo[k].pinyin = value
      }
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
</script>

<style scoped lang="less">
.chineseTable {
  display: flex;
  flex-direction: column;
}
</style>
