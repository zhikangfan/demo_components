<template>
  <div
    class="pinyinRow"
    :style="
      {
        fontSize: `${props.fontSize}px`,
        fontFamily: `${props.fontFamily}`,
        color: 'rgb(203, 207, 214)',
        height: `${props.height}mm`,
        lineHeight: `${props.lineHeight}%`,
        letterSpacing: props.letterSpacing + 'px',
      }
    "
  >
    <PinYinLine :outer-line="props.outerLine" :inner-line="props.innerLine" style="width: 100%; height: 100%; position: absolute; z-index: 1"/>
    <div class="content" style="white-space: pre">
      <span
        v-for="(cell,idx) in cells"
        :key="idx"
        :style="cell.style"
        >{{cell.text}}</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import pinyinRowProps from './props.js'
import PinYinLine from '@/components/Icon/PinYinLine.vue'
const props = defineProps(pinyinRowProps)

// 计算总的span数量
const totalCell = computed(() => props.filledNumber + props.unfilledNumber + 1) // 加1为了解决描词数量不一致
const cells = computed(() => {
  return new Array(totalCell.value).fill('').map((item,idx) => {
    return {
      style: {
        color: idx === 0 ? props.filledColor : props.unfilledColor,
        height: props.height + 'mm',
        borderLeft: `${props.splitLine.strokeWidth}px ${props.splitLine.strokeDashArray > 0 ? 'solid' : 'dashed'} ${props.splitLine.stroke}`,
      },
      text: idx <= props.filledNumber ? props.text: ''
    }
  })
})

</script>
<style lang="less" scoped>
.pinyinRow {
  position: relative;
  overflow: hidden;
  width: 100%;
}
.content {
  position: relative;
  z-index: 10;
  white-space: pre;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  span {
    flex: 1;
    flex-shrink: 0;
    text-align: center;

    &:nth-of-type(1) {
      border-left-style: none !important;
    }
  }
}
</style>
