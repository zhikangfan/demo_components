<template>
  <main id="app">
    <button type="button" @click="addNewWidget">Add Widget</button> {{ info }}
    <div class="grid-stack"></div>
  </main>
</template>
<script>
import { createApp, ref, onMounted, onBeforeUnmount, h, render, toRefs } from 'vue'
import { GridStack } from 'gridstack'
const GridItemComponent = {
  props: {
    itemId: {
      type: [String, Number],
      required: true,
    },
  },
  emits: ['remove'],
  setup(props, { emit }) {
    const { itemId } = toRefs(props)

    onBeforeUnmount(() => {
      console.log(`In vue onBeforeUnmount for item ${itemId.value}`)
    })

    function handleRemove() {
      emit('remove')
    }

    return {
      itemId,
      handleRemove,
    }
  },
  template: `
        <button @click="handleRemove">X</button>
        <p>
            Vue Grid Item {{ itemId }}
        </p>
        `,
}

export default {
  setup() {
    let info = ref('')
    let grid = null
    const items = [
      { id: 1, x: 2, y: 1, h: 2 },
      { id: 2, x: 2, y: 4, w: 3 },
      { id: 3, x: 4, y: 2 },
      { id: 4, x: 3, y: 1, h: 2 },
      { id: 5, x: 0, y: 6, w: 2, h: 2 },
    ]
    let count = ref(items.length)
    const shadowDom = {}

    onMounted(() => {
      grid = GridStack.init({
        float: true,
        cellHeight: '70px',
        minRow: 1,
      })

      // Listen for remove events to clean up Vue renders
      grid.on('removed', function (event, items) {
        items.forEach((item) => {
          if (shadowDom[item.id]) {
            render(null, shadowDom[item.id])
            delete shadowDom[item.id]
          }
        })
      })

      GridStack.renderCB = function (el, widget) {
        // el: HTMLElement div.grid-stack-item-content
        // widget: GridStackWidget

        const gridItemEl = el.closest('.grid-stack-item') // div.grid-stack-item (parent of el)

        // Create Vue component for the widget content
        const itemId = widget.id
        const widgetNode = h(GridItemComponent, {
          itemId: itemId,
          onRemove: () => {
            // Catch the remove event from the Vue component
            grid.removeWidget(gridItemEl) // div.grid-stack-item
            info.value = `Widget ${itemId} removed`
          },
        })
        shadowDom[itemId] = el
        render(widgetNode, el) // Render Vue component into the GridStack-created element
      }

      grid.load(items)
    })

    onBeforeUnmount(() => {
      // Clean up Vue renders
      Object.values(shadowDom).forEach((el) => {
        render(null, el)
      })
    })

    function addNewWidget() {
      const widgetId = `widget-${Math.random().toString(36).substring(2, 15)}`
      const node = items[count.value] || {
        x: Math.round(12 * Math.random()),
        y: Math.round(5 * Math.random()),
        w: Math.round(1 + 3 * Math.random()),
        h: Math.round(1 + 3 * Math.random()),
      }
      node.id = String(count.value++)
      grid.addWidget(node)
      info.value = `Widget ${node.id} added`
    }

    return {
      info,
      addNewWidget,
    }
  },
  watch: {
    info: function (newVal) {
      if (newVal.length === 0) return

      window.clearTimeout(this.timerId)
      this.timerId = window.setTimeout(() => {
        this.info = ''
      }, 2000)
    },
  },
}
</script>
