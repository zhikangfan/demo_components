<template>
  <div
    class="chinese"
    :style="{
      width: `${props.size}px`,
      height: `${props.size}px`,
      fontSize: `${props.fontSize}px`,
      fontFamily: props.fontFamily,
      color: `${props.color}`,
      lineHeight: `${props.lineHeight}%`,
    }"
  >
    <div class="chineseBg">
      <Line :outer-line="props.outerLine" v-if="props.type === 'line'" />
      <HorizontalLine :outer-line="props.outerLine" v-else-if="props.type === 'horizontalLine'" />
      <VerticalLine :outer-line="props.outerLine" v-else-if="props.type === 'verticalLine'" />
      <MouseLine :outer-line="props.outerLine" v-else-if="props.type === 'mouseLine'" />
      <RiceLine
        :outer-line="props.outerLine"
        :inner-line="props.innerLine"
        v-else-if="props.type === 'riceLine'"
      />
      <FieldLine
        :outer-line="props.outerLine"
        :inner-line="props.innerLine"
        v-else-if="props.type === 'fieldLine'"
      />
      <WellLine
        :outer-line="props.outerLine"
        :inner-line="props.innerLine"
        v-else-if="props.type === 'wellLine'"
      />
      <NestWellLine
        :outer-line="props.outerLine"
        :inner-line="props.innerLine"
        v-else-if="props.type === 'nestWellLine'"
      />
      <NestMouseLine
        :outer-line="props.outerLine"
        :inner-line="props.innerLine"
        v-else-if="props.type === 'nestMouseLine'"
      />
      <NestMouseLine2
        :outer-line="props.outerLine"
        :inner-line="props.innerLine"
        v-else-if="props.type === 'nestMouseLine2'"
      />
      <NestMouseLine3
        :outer-line="props.outerLine"
        :inner-line="props.innerLine"
        v-else-if="props.type === 'nestMouseLine3'"
      />
      <NestMouseLine4
        :outer-line="props.outerLine"
        :inner-line="props.innerLine"
        v-else-if="props.type === 'nestMouseLine4'"
      />
    </div>
    <div class="text" v-html="props.text"></div>
  </div>
</template>
<script setup>
import RiceLine from '@/components/Icon/RiceLine.vue'
import Line from '@/components/Icon/Line.vue'
import MouseLine from '@/components/Icon/MouseLine.vue'
import VerticalLine from '@/components/Icon/VerticalLine.vue'
import FieldLine from '@/components/Icon/FieldLine.vue'
import HorizontalLine from '@/components/Icon/HorizontalLine.vue'
import WellLine from '@/components/Icon/WellLine.vue'
import NestMouseLine from '@/components/Icon/NestMouseLine.vue'
import NestWellLine from '@/components/Icon/NestWellLine.vue'
import NestMouseLine2 from '@/components/Icon/NestMouseLine2.vue'
import NestMouseLine3 from '@/components/Icon/NestMouseLine3.vue'
import NestMouseLine4 from '@/components/Icon/NestMouseLine4.vue'

import ChineseProps from './props.js'
const props = defineProps(ChineseProps)
</script>
<style scoped lang="less">
.chinese {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;

  .chineseBg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  .text {
    position: relative;
    z-index: 10;
    width: 100%;
    text-align: center;
    white-space: pre;
  }
}
</style>
