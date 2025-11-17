<template>
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <g>
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
})
</script>
