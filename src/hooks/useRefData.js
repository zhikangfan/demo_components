import { ref, reactive, computed } from 'vue'

export const currentSelectWidgetId = ref('')

export const paper = reactive({
  id: '',
  config: {
    width: 0,
    height: 0,
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  widgets: [],
})
export const currentSelectWidget = computed(() => {
  return paper.widgets.find((item) => item.id === currentSelectWidgetId.value)
})
