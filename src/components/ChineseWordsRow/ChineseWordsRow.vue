<template>
  <div class="chineseWordsRow" ref="containerRef">
    <div style="display: flex; width: 100%; flex-wrap: nowrap">
      <ChineseCell
        v-for="(cell, idx) in cells"
        :key="idx"
        :style="{ marginLeft: `${margin}px`, marginRight: `${margin}px` }"
        v-bind="cell"
        @ok="(value) => handleOk(value, cell, idx)"
        @cancel="() => handleCancel(cell, idx)"
        @afterClose="() => handleAfterClose(cell, idx)"
      />
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import ChineseCell from '@/components/ChineseCell/index.vue'
import chineseWordsRowProps from '@/components/ChineseWordsRow/props.js'

const {
  spacing,
  words,
  showPinyin,
  filledColor,
  filledNumber,
  unfilledNumber,
  unfilledColor,
  canEditRow,
  ...otherProps
} = defineProps(chineseWordsRowProps)
const resizeObserver = ref(null)
const containerRef = ref(null)
const containerWidth = ref(0)
const cells = ref([])

const emit = defineEmits(['ok', 'cancel', 'afterClose'])

const margin = computed(() => {
  return spacing * 2
})

const handleOk = (value, cell, idx) => {
  emit('ok', value, cell, idx)
}
const handleCancel = (cell, idx) => {
  emit('cancel', cell, idx)
}
const handleAfterClose = (cell, idx) => {
  emit('afterClose', cell, idx)
}

const cellWidth = computed(() => {
  return otherProps.chineseProps.size + margin.value * 2
})

// 计算总的span数量
const totalCell = computed(() => {
  return Math.floor(containerWidth.value / cellWidth.value)
})

watchEffect(() => {
  const totalCellArr = new Array(totalCell.value).fill('')
  let filledTextArr = [] // 填充单元格
  let unfilledTextArr = [] // 未填充单元格
  for (let i = 0; i < filledNumber; i++) {
    filledTextArr = [...filledTextArr, ...words.wordsInfo]
  }
  for (let i = 0; i < unfilledNumber; i++) {
    unfilledTextArr = [...unfilledTextArr, ...words.wordsInfo]
  }
  const allText = [...filledTextArr, ...unfilledTextArr]
  cells.value = totalCellArr.map((text, idx) => {
    return {
      ...otherProps,
      groupId: allText[idx]?.id,
      pinyinProps: {
        ...otherProps.pinyinProps,
        text: allText[idx]?.pinyin || '',
        color: idx < filledTextArr.length ? filledColor : unfilledColor,
      },
      canEdit: canEditRow && idx < filledTextArr.length,
      chineseProps: {
        ...otherProps.chineseProps,
        text: allText[idx]?.chinese,
        color: idx < filledTextArr.length ? filledColor : unfilledColor,
      },
      cellWidth: cellWidth.value,
      showPinyin: showPinyin,
    }
  })
})
// 初始化容器宽度
onMounted(() => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth

    // 使用 ResizeObserver 监听容器尺寸变化
    resizeObserver.value = new ResizeObserver((entries) => {
      for (let entry of entries) {
        containerWidth.value = entry.contentRect.width
      }
    })

    resizeObserver.value.observe(containerRef.value)
  }
})
onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
  }
})
</script>
<style scoped lang="less">
.chineseWordsRow {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.pinyinBox {
  &:hover {
    background: #b9dccc;
    cursor: pointer;

    &.normal {
      background: transparent;
      cursor: initial;
    }
  }
}
</style>
