<template>
  <div
    class="chinese"
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
    <div class="text">
      {{ props.text }}
    </div>
  </div>
</template>
<script setup>
import RiceLine from '@/components/Icon/RiceLine.vue'
import Line from '@/components/Icon/Line.vue'
import MouseLine from '@/components/Icon/MouseLine.vue'
import VerticalLine from '@/components/Icon/VerticalLine.vue'
import FieldLine from '@/components/Icon/FieldLine.vue'
const props = defineProps({
  text: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    validator(value) {
      return [
        'empty',
        'line',
        'horizontalLine',
        'verticalLine',
        'mouseLine',
        'riceLine',
        'fieldLine',
        'wellLine',
        'nestWellLine',
        'nestMouseLine',
        'nestMouseLine2',
        'nestMouseLine3',
        'nestMouseLine4',
      ].includes(value)
    },
    default: 'empty',
  },
  outerLine: {
    type: Object,
    default() {
      return {
        stroke: '#4c5662ff',
        strokeWidth: '1',
        strokeDasharray: '1',
      }
    },
  },
  innerLine: {
    type: Object,
    default() {
      return {
        stroke: '#4c5662ff',
        strokeWidth: '0.5',
        strokeDasharray: '0',
      }
    },
  },
})
</script>
<style scoped lang="less">
.chinese{
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
