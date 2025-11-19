<template>
  <div class="chineseWordsRow" ref="containerRef">
    <div style="display: flex; width: 100%; flex-wrap: nowrap">
      <ChineseCell
        v-for="(cell, idx) in cells"
        :key="idx"
        :show-pinyin="props.showPinyin"
        :style="{ marginLeft: `${margin}px`, marginRight: `${margin}px` }"
        :chinese-props="cell.chineseProps"
        :pinyin-props="cell.pinyinProps"
        :cell-width="cellWidth"
      />
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import ChineseCell from '@/components/ChineseCell/index.vue'
import chineseWordsRowProps from '@/components/chineseWordsRow/props.js'
import { pinyin } from 'pinyin-pro'

const props = defineProps(chineseWordsRowProps)
const resizeObserver = ref(null)
const containerRef = ref(null)
const containerWidth = ref(0)

const margin = computed(() => {
  return props.spacing * 2
})
// 计算总的span数量
const totalCell = computed(() => {
  return Math.floor(containerWidth.value / cellWidth.value)
})



const cells = computed(() => {

  const totalCellArr = new Array(totalCell.value).fill('')
  let filledTextArr = [] // 填充单元格
  let unfilledTextArr = [] // 未填充单元格
  const allPinyin = pinyin(props.words, { type: 'all' })
  for (let i = 0; i < props.filledNumber; i++) {
    filledTextArr = [...filledTextArr, ...allPinyin]
  }
  for (let i = 0; i < props.unfilledNumber; i++) {
    unfilledTextArr = [...unfilledTextArr, ...allPinyin]
  }
  const allText = [...filledTextArr, ...unfilledTextArr]
  return totalCellArr.map((text,idx) => {
    return {
      pinyinProps: {
        ...props.pinyinProps,
        text: allText[idx]?.pinyin || '',
        color: idx < filledTextArr.length ? props.filledColor : props.unfilledColor,
      },
      chineseProps: {
        ...props.chineseProps,
        text: allText[idx]?.origin,
        color: idx < filledTextArr.length ? props.filledColor : props.unfilledColor,
      }
    }
  })
})

// 计算单元格宽度
const cellWidth = computed(() => {
  return props.chineseProps.size + margin.value * 2
})
// 初始化容器宽度
onMounted(() => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth

    // 使用 ResizeObserver 监听容器尺寸变化
    resizeObserver.value = new ResizeObserver((entries) => {
      console.log(entries)
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
