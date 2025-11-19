<template>
  <div :class="ss.chineseCell">
    <Pinyin v-bind="props.pinyinProps" v-if="props.showPinyin" :style="props.cellWidth ? { width: props.cellWidth + 'px' } :{}"/>
    <Chinese v-bind="props.chineseProps" />
  </div>
</template>
<script setup>
import ss from './index.module.less'
import Pinyin from '@/components/Pinyin/index.vue'
import Chinese from '@/components/Chinese/index.vue'
import ChineseCellProps from './props.js'
const props = defineProps(ChineseCellProps)
</script>
