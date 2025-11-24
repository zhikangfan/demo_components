<template>
  <div>
    <button type="button" @click="addNewWidget()">Add Widget</button> {{ info }}
    <div class="grid-stack"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { GridStack } from 'gridstack'
let count = ref(0)
let info = ref('')
let grid = null // DO NOT use ref(null) as proxies GS will break all logic when comparing structures... see https://github.com/gridstack/gridstack.js/issues/2115

onMounted(() => {
  grid = GridStack.init({
    // DO NOT use grid.value = GridStack.init(), see above
    float: false,
    cellHeight: 'auto',
    minRow: 1,
    // disableDrag: true,
    // disableResize: true
  })

  grid.on('dragstop', function (event, element) {
    const node = element.gridstackNode
    console.log(element, '---ele')
    info.value = `you just dragged node #${node.id} to ${node.x},${node.y} – good job!`
  })
})

function addNewWidget() {
  const widgetId = `widget-${Math.random().toString(36).substring(2, 15)}`
  // const node = items[count.value] || {
  //   x: Math.round(12 * Math.random()),
  //   y: Math.round(5 * Math.random()),
  //   w: Math.round(1 + 3 * Math.random()),
  //   h: Math.round(1 + 3 * Math.random()),
  // };

  const node = {
    id: widgetId,
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    content: '1231',
    // locked: true,
    // noMove: true,
    // noResize: true,
  }
  console.log(node, '---node')
  grid.addWidget(node)
}

watch(info, (newVal) => {
  console.log(newVal, '--info')
  if (newVal.length === 0) return

  // window.clearTimeout(timerId.value);
  // timerId.value = window.setTimeout(() => {
  //   info.value = "";
  // }, 2000);
})
</script>
