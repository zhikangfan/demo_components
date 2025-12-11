<template>
  <div>
    <a-button @click="loadLocalFonts" v-if="showLoadBtn">load fonts</a-button>
    <a-alert message="已拒绝授权" type="warning" v-if="showTips" />
    <a-select v-model:value="selected" style="width: 120px" @change="handleChange">
      <a-select-option :value="font.value" v-for="font in finalFonts" :key="font.name">{{
        font.name
      }}</a-select-option>
    </a-select>
  </div>
  <div :style="{ fontFamily: `${selected}` }">Hello world</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useLocalFonts } from '@/hooks/useLocalFonts.ts'

const { localFonts, loadLocalFonts, state } = useLocalFonts()
const fontOptions = [
  {
    name: 'cus1',
    value: 'cus1',
    source: 'http://localhost:5173/BitcountPropSingle.ttf',
  },
  {
    name: 'cus2',
    value: 'cus1',
    source: 'http://localhost:5173/PlaywriteNO-VariableFont_wght.ttf',
  },
]
const finalFonts = computed(() => {
  const d = localFonts.value.map((item) => ({
    name: item.fullName,
    value: item.fontFamily,
  }))
  return [...fontOptions, ...d]
})

const selected = ref('')
const handleChange = (value) => {
  console.log(value)
  // selected.value = value
  const source = finalFonts.value.find((it) => it.name === value).source
  const fontFile = new FontFace(value, `url(${source})`)
  document.fonts.add(fontFile)
}
const showLoadBtn = computed(() => state.value === 'prompt')
const showTips = computed(() => state.value === 'denied')
</script>
