<template>
  <div class="p-4">
    <!-- Toolbar -->
    <div class="mb-4 flex gap-2">
      <button class="rounded bg-blue-500 px-4 py-2 text-white" @click="addH1Widget">
        添加 H1 组件
      </button>
      <button class="rounded bg-green-600 px-4 py-2 text-white" @click="exportWidgets">
        导出 Widgets
      </button>
      <button class="rounded bg-gray-700 px-4 py-2 text-white" @click="loadWidgets">
        加载 Widgets
      </button>
    </div>

    <!-- Gridstack Container -->
    <div
      class="paper m-auto box-border shadow-lg"
      style="width: 210mm; height: 297mm; padding: 10mm"
      @click="handleClickPaper"
    >
      <div class="relative box-border h-full w-full">
        <div class="grid-stack"></div>
      </div>
    </div>
    <div class="fixed top-0 right-0 h-full w-[300px] bg-white">
      <Toolbar v-if="currentSelectWidget?.key === WidgetType.Text" />
      <div v-else>页面配置</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createApp, onMounted, ref } from 'vue'
import { GridStack } from 'gridstack'
import Text from '@/components/Text/Text.vue'
import { currentSelectWidgetId, currentSelectWidget, paper } from '@/hooks/useRefData.js'
import { type Widget, WidgetType } from '../../types'
import Toolbar from '@/components/Toolbar/Toolbar.vue'
// import "gridstack/dist/gridstack.css";
// import "gridstack/dist/gridstack-extra.css";

let grid: GridStack
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
  // loadWidgets([
  //   {
  //     id: 'widget-rwdehw8xqt',
  //     key: 0,
  //     x: 0,
  //     y: 0,
  //     w: 12,
  //     config: {
  //       class: '12312',
  //       type: 'h3',
  //       text: '标题3',
  //       fontSize: '16',
  //       fontWeight: 'bold',
  //       fontStyle: 'normal',
  //       textDecoration: 'none',
  //       textAlign: 'left',
  //       color: '#000000ff',
  //     },
  //   },
  // ])
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

const getWidgetInfo = (id) => {
  const items = grid.getGridItems()
  const target = items.find((item) => item.gridstackNode.id === id)
  return target?.gridstackNode
}

// 添加 Widget
const addH1Widget = () => {
  // 第一步初始化信息
  const widgetId = `widget-${Math.random().toString(36).substring(2, 15)}`
  const widgetConfig = {
    class: '12312',
    type: 'h3',
    text: '标题3',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'left',
    color: '#000000ff',
    padding: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  }
  const widget = {
    id: widgetId,
    key: WidgetType.Text,
    w: 12,
    noResize: false,
    config: widgetConfig,
  }
  const el = mountVueComponent(Text, {
    id: widget.id,
  })
  grid.makeWidget(el, widget)
  // grid.addWidget()
  const info = getWidgetInfo(widget.id)
  // 加入纸张中
  paper.widgets = [...paper.widgets, info]
  // 得到完整的 widget配置信息
  currentSelectWidgetId.value = widget.id
}

// 加载widgets
// const loadWidgets = (widgets) => {
//   // grid.load()
// }

// 导出 widget 配置
const exportWidgets = () => {
  savedWidgets.value = grid.save()
  console.log('Exported Widgets:', savedWidgets.value, paper)
}

const getElement = (widgetType: WidgetType) => {
  switch (widgetType) {
    case WidgetType.Text:
      return Text
    default:
      return ''
  }
}

// 加载 widget
const loadWidgets = (widgets: Widget<unknown>[]) => {
  const data = widgets.map((widget) => {
    return {
      ...widget,
      el: mountVueComponent(getElement(widget.key), {
        ...widget.config,
        click() {
          console.log('ok1231', widget)
          currentSelectWidgetId.value = widget.id
        },
      }),
    }
  })
  grid.load(data)
}

/**
 * 点击纸张
 */
const handleClickPaper = () => {
  currentSelectWidgetId.value = ''
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
