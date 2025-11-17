<template>
  <div
    class="rowContainer"
    style="
      font-size: 24px;
      font-family: Yuanti SC;
      color: rgb(203, 207, 214);
      height: 10mm;
      line-height: 140%;
      letter-spacing: 0px;
    "
  >
    <Pinyin style="width: 100%; height: 100%; position: absolute; z-index: 1" />
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
<script setup>

import Pinyin from '@/components/Pinyin/index.vue'
import {computed} from 'vue'
const props = defineProps({
  text: String,
  filledNumber: {
    type: Number,
    default: 1
  },
  unfilledNumber: {
    type: Number,
    default: 0
  },
  filledColor: {
    type: String,
    default: '#000'
  },
  unfilledColor: {
    type: String,
    default: '#cbcfd6'
  },
  fontSize: {
    type: String,
    default: '24px'
  },
  letterSpacing: {
    type: String,
    default: '0px'
  },
  height: {
    type: Number,
    default: 10 // 单位：mm
  },
  lineHeight: {
    type: String,
    default: '140%'
  },
  fontFamily: {
    type: String,
    default: 'Yuanti SC'
  },
  splitLine: {
    type: Object,
    default() {
      return {
        stroke: 'rgb(200, 200, 200)',
        strokeWidth: '1',
        strokeDasharray: 0,
      }
    }
  }
})

// 计算总的span数量
const totalCell = computed(() => props.filledNumber + props.unfilledNumber)
const cells = computed(() => {
  return new Array(totalCell.value).fill('').map((item,idx) => {
    return {
      style: {
        color: idx === 0 ? props.filledColor : props.unfilledColor,
        height: props.height + 'mm',
        borderLeft: `${props.splitLine.strokeWidth}px ${props.splitLine.strokeDashArray > 0 ? 'solid' : 'dashed'} ${props.splitLine.stroke}`,
      },
      text: idx <= props.filledNumber - 1 ? props.text: ''
    }
  })
})

</script>
<style lang="less" scoped>
.rowContainer {
  position: relative;
  overflow: hidden;
}
.content {
  position: relative;
  z-index: 10;
  white-space: pre;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  span {
    flex-shrink: 0;
    flex: 1;
    text-align: center;

    &:nth-of-type(1) {
      border-left-style: none !important;
    }
  }
}
</style>
