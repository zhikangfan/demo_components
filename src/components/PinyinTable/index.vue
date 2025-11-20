<template>
  <div class="pinyinTable" :style="{ gap: `${lineSpacing}mm` }">
    <PinyinRow v-for="(row, index) in rows" :key="index" v-bind="row" />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import PinyinRow from '@/components/PinyinRow/index.vue'
import pinyinRowProps from '@/components/PinyinRow/props.js'
const { lineSpacing, unfilledRows, content, position, size, padding, ...otherProps } = defineProps({
  ...pinyinRowProps,
  position: {
    type: Object,
    default() {
      return {
        x: 0, // 最大12
        y: 8, // 默认 *5mm
      }
    },
  },
  size: {
    type: Object,
    default() {
      return {
        width: 12, // 最大12
        height: 47, // 默认 *5mm
      }
    },
  },
  padding: {
    type: Object,
    default() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }
    },
  },
  content: {
    // 文本内容
    type: Array,
    default() {
      return []
    },
  },
  unfilledRows: {
    // 空行数量
    type: Number,
    default: 1,
  },
  lineSpacing: {
    type: Number,
    default: 0,
  },
})

const rows = computed(() => {
  return content
    .flatMap((text) => {
      return [text, ...new Array(unfilledRows).fill('')]
    })
    .map((text) => {
      return {
        ...otherProps,
        text: text,
      }
    })
})
</script>
<style scoped lang="less">
.pinyinTable {
  display: flex;
  flex-direction: column;
}
</style>
