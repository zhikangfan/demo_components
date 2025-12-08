<template>
  <div>
    <a-select v-model:value="selected" style="width: 120px" @change="handleChange">
      <a-select-option :value="font.name" v-for="font in fontOptions" :key="font.name">{{
        font.name
      }}</a-select-option>
    </a-select>
  </div>
  <div :style="{ fontFamily: `${selected}` }">Hello world</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const fontOptions = [
  {
    name: 'cus1',
    source: 'http://localhost:5173/BitcountPropSingle.ttf',
  },
  {
    name: 'cus2',
    source: 'http://localhost:5173/PlaywriteNO-VariableFont_wght.ttf',
  },
]
const selected = ref('')
const handleChange = (value) => {
  console.log(value)
  // selected.value = value
  const source = fontOptions.find((it) => it.name === value).source
  const fontFile = new FontFace(value, `url(${source})`)
  document.fonts.add(fontFile)
  // fontFile.load().then(() => {
  //   console.log('font loaded')
  // })
}
</script>
