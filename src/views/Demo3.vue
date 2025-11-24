<template>
  <div class="p-4">
    <!-- Toolbar -->
    <div class="mb-4 flex gap-2">
      <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="addH1Widget">
        添加 H1 组件
      </button>
      <button class="px-4 py-2 bg-green-600 text-white rounded" @click="exportWidgets">
        导出 Widgets
      </button>
      <button class="px-4 py-2 bg-gray-700 text-white rounded" @click="loadWidgets">
        加载 Widgets
      </button>
    </div>

    <!-- Gridstack Container -->
    <div
      class="paper shadow-lg m-auto box-border"
      style="width: 210mm; height: 297mm; padding: 10mm"
    >
      <div class="w-full h-full relative box-border">
        <div class="grid-stack"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createApp, onMounted, ref } from 'vue'
import { GridStack } from 'gridstack'
import Text from '@/components/Text/Text.vue'
import { currentSelectWidget } from '@/hooks/useRefData.js'
// import "gridstack/dist/gridstack.css";
// import "gridstack/dist/gridstack-extra.css";

let grid
const savedWidgets = ref([])

onMounted(() => {
  grid = GridStack.init({
    column: 12,
    float: true,
    cellHeight: 'initial',
    disableOneColumnMode: true,
    resizable: { handles: 'all' },
    margin: 0,
    handleClass: 'test',
  })
})

/**
 * 加载组件
 * @param component
 * @param props
 * */
const mountVueComponent = (component, props) => {
  const root = document.createElement('div')
  const app = createApp(component, props)
  app.mount(root)
  return root
}

// 添加 Widget
const addH1Widget = () => {
  const widgetId = `widget-${Math.random().toString(36).substring(2, 15)}`
  grid.addWidget({
    id: widgetId,
    // x: 0,
    // y: 0,
    w: 12,
    // h: 4,
    noResize: false,
    el: mountVueComponent(Text, {
      id: widgetId,
      class: '12312',
      type: 'h3',
      text: '标题3',
      fontSize: '16',
      fontWeight: 'bold',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'left',
      color: '#000000ff',
      click() {
        console.log('ok1231')
        currentSelectWidget.value = widgetId
      },
    }),
  })
}

// 导出 widget 配置
const exportWidgets = () => {
  savedWidgets.value = grid.save()
  alert('Widgets 已导出，可通过控制台查看 savedWidgets')
  console.log('Exported Widgets:', savedWidgets.value)
}

// 加载 widget
const loadWidgets = () => {
  if (!savedWidgets.value || savedWidgets.value.length === 0) {
    alert('当前没有保存的 widgets')
    return
  }
  grid.load(savedWidgets.value)
}
</script>

<style>
html,
body {
  background: #f5f5f5;
}

.grid-stack-item-content {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
