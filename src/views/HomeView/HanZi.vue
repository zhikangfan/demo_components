<template>
  <div class="m-auto mt-20 w-2xl">
    <div
      :class="[`relative border`]"
      :style="{ width: form.size + 'px', height: form.size + 'px' }"
    >
      <div
        ref="div"
        v-html="svg"
        class="absolute"
        :style="{
          left: `${form.translateX}%`,
          top: `${form.translateY}%`,
          transform: `scale(${form.scale / 100})`,
        }"
      ></div>
    </div>
    <a-space>
      size：
      <a-input-number v-model:value="form.size" />
      x轴：
      <a-input-number v-model:value="form.translateX" />
      y轴：
      <a-input-number v-model:value="form.translateY" />
      缩放：
      <a-input-number v-model:value="form.scale" />
    </a-space>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import HanziWriter from 'hanzi-writer'

const form = reactive({
  scale: 100,
  translateX: 0, // 默认50%居中
  translateY: 0, // 默认50%居中
  size: 50,
})
const svg = ref('')

const loadFont = (font, { scale = 100, size = 50 }) => {
  HanziWriter.loadCharacterData(font).then(function (charData) {
    var transformData = HanziWriter.getScalingTransform(1024, 1024)
    const paths = charData.strokes.map((path) => {
      return `<path d="${path}" fill="#000"></path>`
    })

    svg.value = `<svg
      viewBox="0 0 1024 1024"
      width="${size}"
      height="${size}"
    >
      <g transform="${transformData.transform}">
        ${paths.join('')}
      </g>
    </svg>`
  })
}

watchEffect(() => {
  loadFont('六', {
    scale: form.scale,
    translateX: form.translateX,
    translateY: form.translateY,
    size: form.size,
  })
})
</script>
