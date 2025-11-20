<template>
  <div class="chineseParagraphTable" :style="{ gap: `${finalLineSpacing}px` }">
    <ChineseWordsRow v-for="(row, idx) in rows" :key="idx"
                     @ok="(value, cells, columnIndex) => handleOk(value, cells, row, columnIndex, idx)"
                     @cancel="(cells, columnIndex) => handleCancel(cells, row, columnIndex, idx)"
                     @afterClose="(cells, columnIndex) => handleAfterClose(cells, row, columnIndex, idx)"
                     v-bind="row"/>
  </div>
</template>
<script setup>
import ChineseWordsRow from '@/components/ChineseWordsRow/ChineseWordsRow.vue'
import ChineseWordsRowProps from '@/components/ChineseWordsRow/props.js'
import {computed, watchEffect, ref} from 'vue'
import PubSub from 'pubsub-js'
import ChineseCell from "@/components/ChineseCell/index.vue";

const {
  content,
  unfilledRows,
  lineSpacing,
  chineseSize,
  pinyinHeight,
  unfilledNumber,
  ...otherProps
} =
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

const handleOk = (value, cell, row, columnIndex, rowIndex) => {
  PubSub.publish('ParagraphTableMessage', {
    type: 'editPinyin',
    rowIndex: rowIndex,
    columnIndex: columnIndex,
    value: value,
  });
  emit('ok', value, cell, columnIndex, rowIndex)
}
const handleCancel = (cell, row, columnIndex, rowIndex) => {
  emit('cancel', cell, columnIndex, rowIndex)
}
const handleAfterClose = (cell, row, columnIndex, rowIndex) => {
  emit('afterClose', cell, row, columnIndex, rowIndex)
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
const rows = ref([])
watchEffect(async () => {

  const origin = content.flatMap((text) => {
    const unfilledTextArr = new Array(unfilledNumber).fill(text)
    const unfilledRowsArr = new Array(unfilledRows).fill('')
    // 这里的顺序就决定了渲染顺序
    return [text, ...unfilledTextArr, ...unfilledRowsArr]
  })

  const spaceNum = unfilledNumber + unfilledRows + 1

  rows.value = origin.map((text, idx) => {
    return {
      ...otherProps,
      unfilledNumber: 0,
      words: text,
      canEdit: idx % spaceNum === 0,
      filledColor: idx % spaceNum === 0 ? otherProps.filledColor : otherProps.unfilledColor,
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
.chineseParagraphTable {
  display: flex;
  flex-direction: column;
}
</style>
