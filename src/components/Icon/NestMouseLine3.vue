<template>
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <g>
      <line
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
        :stroke="props.outerLine.stroke"
        :stroke-width="props.outerLine.strokeWidth"
        :stroke-dasharray="props.outerLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="100%"
        y1="0%"
        x2="100%"
        y2="100%"
        :stroke="props.outerLine.stroke"
        :stroke-width="props.outerLine.strokeWidth"
        :stroke-dasharray="props.outerLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="0%"
        y1="100%"
        x2="100%"
        y2="100%"
        :stroke="props.outerLine.stroke"
        :stroke-width="props.outerLine.strokeWidth"
        :stroke-dasharray="props.outerLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
        :stroke="props.outerLine.stroke"
        :stroke-width="props.outerLine.strokeWidth"
        :stroke-dasharray="props.outerLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="25%"
        y1="25%"
        x2="75%"
        y2="25%"
        :stroke="props.innerLine.stroke"
        :stroke-width="props.innerLine.strokeWidth"
        :stroke-dasharray="props.innerLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="75%"
        y1="25%"
        x2="75%"
        y2="75%"
        :stroke="props.innerLine.stroke"
        :stroke-width="props.innerLine.strokeWidth"
        :stroke-dasharray="props.innerLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="25%"
        y1="75%"
        x2="75%"
        y2="75%"
        :stroke="props.innerLine.stroke"
        :stroke-width="props.innerLine.strokeWidth"
        :stroke-dasharray="props.innerLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="25%"
        y1="25%"
        x2="25%"
        y2="75%"
        :stroke="props.innerLine.stroke"
        :stroke-width="props.innerLine.strokeWidth"
        :stroke-dasharray="props.innerLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
        :stroke="props.innerLine.stroke"
        :stroke-width="props.innerLine.strokeWidth"
        :stroke-dasharray="props.innerLine.strokeDasharray"
        fill="white"
      ></line>
      <line
        x1="0%"
        y1="100%"
        x2="100%"
        y2="0%"
        :stroke="props.innerLine.stroke"
        :stroke-width="props.innerLine.strokeWidth"
        :stroke-dasharray="props.innerLine.strokeDasharray"
        fill="white"
      ></line>
    </g>
  </svg>
</template>
<script setup>
const props = defineProps({
  outerLine: {
    type: Object,
    default: () => {
      return {
        stroke: '#4c5662ff',
        strokeWidth: '1',
        strokeDasharray: '0',
      }
    },
  },
  innerLine: {
    type: Object,
    default: () => {
      return {
        stroke: '#4c5662ff',
        strokeWidth: '0.5',
        strokeDasharray: '2',
      }
    },
  },
})
</script>
