import { defineStore } from 'pinia'
import { ref } from 'vue'
const Status = {
  show: 1,
  hide: 0,
  test: 2,
}
export const useTemplateStore = defineStore('template', () => {
  const templates = ref([])
  const isLoaded = ref(false)
  const updateTemplates = async () => {
    try {
      let res = await fetch(import.meta.env.VITE_REQUEST_TEMPLATE_URL).then((res) => res.json())
      templates.value = res?.data || []
      // templates.value = res?.data?.filter(item => item.status === 1)
    } catch (e) {
      templates.value = []
    } finally {
      isLoaded.value = true
    }
  }
  return { templates, isLoaded, updateTemplates }
})
