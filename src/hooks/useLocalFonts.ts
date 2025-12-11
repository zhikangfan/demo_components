import { onMounted, watchEffect, ref } from 'vue'

export const useLocalFonts = () => {
  const state = ref('')
  const localFonts = ref([])
  const loadLocalFonts = async () => {
    try {
      const result = await window?.queryLocalFonts?.()
      console.log(result, 'result')
      localFonts.value = result || []
    } catch (e) {
      console.log(e)
    }
  }
  watchEffect(async () => {
    if (state.value === 'granted') {
      await loadLocalFonts()
    }
  })
  onMounted(async () => {
    try {
      const permissionStatus = await window.navigator.permissions.query({
        name: 'local-fonts' as PermissionName,
      })
      state.value = permissionStatus.state
      permissionStatus.addEventListener('change', () => {
        state.value = permissionStatus.state
      })
    } catch (e) {
      console.log('浏览器不支持：', e)
      state.value = 'granted'
    }
  })
  return {
    state,
    localFonts,
    loadLocalFonts,
  }
}
