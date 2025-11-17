<template>
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <g>
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        :stroke="props.otherLine.stroke"
        :stroke-width="props.otherLine.strokeWidth"
        :stroke-dasharray="props.otherLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="0"
        y1="33.33%"
        x2="100%"
        y2="33.33%"
        :stroke="props.otherLine.stroke"
        :stroke-width="props.otherLine.strokeWidth"
        :stroke-dasharray="props.otherLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="0"
        y1="66.67%"
        x2="100%"
        y2="66.67%"
        :stroke="props.baseLine.stroke"
        :stroke-width="props.baseLine.strokeWidth"
        :stroke-dasharray="props.baseLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="0"
        y1="100%"
        x2="100%"
        y2="100%"
        :stroke="props.otherLine.stroke"
        :stroke-width="props.otherLine.strokeWidth"
        :stroke-dasharray="props.otherLine.strokeDasharray"
        fill="white"
      ></line>
    </g>
  </svg>
</template>
<script setup>
const props = defineProps({
  baseLine: {
    type: Object,
    default: () => {
      return {
        stroke: '#4c5662ff',
        strokeWidth: '1',
        strokeDasharray: '0',
      }
    },
  },
  otherLine: {
    type: Object,
    default: () => {
      return {
        stroke: '#4c5662ff',
        strokeWidth: '0.5',
        strokeDasharray: '0',
      }
    },
  },
})
</script>
