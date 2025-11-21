<template>
  <div class="chineseStrokeRow" ref="containerRef">
    <div style="display: flex; width: 100%; flex-wrap: wrap">
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
import chineseStrokeRowProps from '@/components/ChineseStrokeRow/props.js'

const {
  spacing,
  word,
  showPinyin,
  filledColor,
  filledNumber,
  unfilledNumber,
  unfilledColor,
  chineseStrokeSize,
  canEditRow,
  scale,
  strokeColor,
  currentStrokeColor,
  ...otherProps
} = defineProps(chineseStrokeRowProps)
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
  // 一行显示的单元格数量
  let totalCellArr = new Array(totalCell.value).fill('')
  let filledTextArr = [] // 填充单元格
  let unfilledTextArr = [] // 未填充单元格

  const renderSvg = (stroke, currentIndex, size, scale, strokeColor, currentStrokeColor) => {
    if (!stroke) {
      return ''
    }
    // 构建路径元素字符串
    const paths = stroke.path
      .map((path, pathIndex) => {
        const fillColor = pathIndex === currentIndex ? currentStrokeColor : strokeColor
        return `<path d="${path}" fill="${fillColor}"></path>`
      })
      .join('')

    return `<svg
    viewBox="0 0 1024 1024"
    width="${size}"
    height="${size}"
  >
    <g transform="scale(1, -1) scale(${scale}) translate(64, -1086.6)">
      ${paths}    </g>
  </svg>`
  }
  // 这一行的笔画数
  const strokeTextArr =
    word.strokes?.map?.((stroke, idx) => {
      return {
        ...word,
        word: renderSvg(stroke, idx, chineseStrokeSize, scale, strokeColor, currentStrokeColor),
      }
    }) || []
  for (let i = 0; i < filledNumber; i++) {
    filledTextArr = [
      ...filledTextArr,
      {
        ...word,
        word: renderSvg(
          word.strokes?.[word.strokes?.length - 1],
          i,
          chineseStrokeSize,
          scale,
          filledColor,
          filledColor,
        ),
      },
    ]
  }
  for (let i = 0; i < unfilledNumber; i++) {
    unfilledTextArr = [...unfilledTextArr, word]
  }
  const allText = [...filledTextArr, ...strokeTextArr, ...unfilledTextArr]

  if (allText.length % totalCellArr.length > 0) {
    const addCellCount = totalCell.value // 每行的个数
    // 不满一行的凑齐一行
    totalCellArr.push(...new Array(addCellCount).fill(''))
  }
  cells.value = totalCellArr.map((text, idx) => {
    return {
      ...otherProps,
      groupId: allText[idx]?.groupId,
      pinyinProps: {
        ...otherProps.pinyinProps,
        text: allText[idx]?.pinyin || '',
        color: idx < filledTextArr.length ? filledColor : unfilledColor,
      },
      canEdit: canEditRow && idx < filledTextArr.length,
      showStroke: true,
      stroke: allText[idx]?.word,
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
.chineseStrokeRow {
  display: flex;
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
