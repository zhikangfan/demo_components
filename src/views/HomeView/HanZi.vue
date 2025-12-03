<template>
  <div>
    <div class="h-[38px] w-[38px] border">
      <div ref="div"></div>
    </div>
    <a-input-number v-model:value="form.scale" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, useTemplateRef, watch } from 'vue'
import HanziWriter from 'hanzi-writer'
const divRef = useTemplateRef('div')
const form = ref({
  scale: 50,
})
const loadFont = (font, { scale }) => {
  HanziWriter.loadCharacterData(font).then(function (charData) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    // svg.style.width = '38';
    // svg.style.height = '38';
    svg.setAttributeNS(null, 'viewBox', '0 0 1024 1024')
    svg.setAttribute('width', 38)
    svg.setAttribute('height', 38)
    divRef.value.appendChild(svg)
    var group = document.createElementNS('http://www.w3.org/2000/svg', 'g')

    // set the transform property on the g element so the character renders at 38x38
    var transformData = HanziWriter.getScalingTransform(1024, 1024)
    const offset = ((1 - scale) * 1024) / 2
    group.setAttributeNS(
      null,
      'transform',
      `translate(${offset}, ${offset}) scale(1,-1) scale(${scale})`,
    )
    svg.appendChild(group)

    charData.strokes.forEach(function (strokePath) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttributeNS(null, 'd', strokePath)
      // style the character paths
      path.style.fill = '#555'
      group.appendChild(path)
    })
  })
}
// watch([() => form.value.scale], ([scale]) => {
//   console.log(123)
//   loadFont('六', {
//     scale: scale
//   })
// })
watchEffect(() => {
  loadFont('六', {
    scale: form.value.scale / 100,
  })
})
</script>
