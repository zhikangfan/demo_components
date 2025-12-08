<template>
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <g id="svg-jsOXnjS6qDHR81cB">
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke="#4c5662"
        stroke-width="0.5"
        stroke-dasharray="0"
        fill="white"
      ></line>
      <line
        x1="0"
        y1="33.33%"
        x2="100%"
        y2="33.33%"
        stroke="#4c5662"
        stroke-width="0.5"
        stroke-dasharray="0"
        fill="white"
      ></line>
      <line
        x1="0"
        y1="66.67%"
        x2="100%"
        y2="66.67%"
        stroke="#4c5662"
        stroke-width="1"
        stroke-dasharray="0"
        fill="white"
      ></line>
      <line
        x1="0"
        y1="100%"
        x2="100%"
        y2="100%"
        stroke="#4c5662"
        stroke-width="0.5"
        stroke-dasharray="0"
        fill="white"
      ></line>
    </g>

    <!--    <g>-->
    <!--      <line-->
    <!--        x1="0"-->
    <!--        y1="0"-->
    <!--        x2="100%"-->
    <!--        y2="0"-->
    <!--        :stroke="props.outerLine.stroke"-->
    <!--        :stroke-width="props.outerLine.strokeWidth"-->
    <!--        :stroke-dasharray="props.outerLine.strokeDasharray"-->
    <!--        fill="white"-->
    <!--      ></line>-->
    <!--      <line-->
    <!--        x1="0"-->
    <!--        y1="33.33%"-->
    <!--        x2="100%"-->
    <!--        y2="33.33%"-->
    <!--        :stroke="props.innerLine.stroke"-->
    <!--        :stroke-width="props.innerLine.strokeWidth"-->
    <!--        :stroke-dasharray="props.innerLine.strokeDasharray"-->
    <!--        fill="white"-->
    <!--      ></line>-->
    <!--      <line-->
    <!--        x1="0"-->
    <!--        y1="66.67%"-->
    <!--        x2="100%"-->
    <!--        y2="66.67%"-->
    <!--        :stroke="props.innerLine.stroke"-->
    <!--        :stroke-width="props.innerLine.strokeWidth"-->
    <!--        :stroke-dasharray="props.innerLine.strokeDasharray"-->
    <!--        fill="white"-->
    <!--      ></line>-->
    <!--      <line-->
    <!--        x1="0"-->
    <!--        y1="100%"-->
    <!--        x2="100%"-->
    <!--        y2="100%"-->
    <!--        :stroke="props.outerLine.stroke"-->
    <!--        :stroke-width="props.outerLine.strokeWidth"-->
    <!--        :stroke-dasharray="props.outerLine.strokeDasharray"-->
    <!--        fill="white"-->
    <!--      ></line>-->
    <!--    </g>-->
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
        strokeDasharray: '1',
      }
    },
  },
})
</script>
