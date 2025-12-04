<template>
  <div class="flex">
    <div
      class="box-border shrink-0 bg-white shadow-lg"
      ref="paperRef"
      :style="{
        width: `210mm`,
        height: `297mm`,
      }"
    >
      <div
        class="box-border flex h-full w-full flex-1"
        :style="{
          padding: `10mm`,
        }"
      >
        <div :class="['flex-1 overflow-hidden outline-1 outline-zinc-200 outline-dashed']">
          <PinyinTable
            :content="['a', 'b']"
            :unfilled-rows="2"
            line-spacing="10"
            :filled-number="2"
            :unfilled-number="8"
            filled-color="#000"
            unfilled-color="#cbcfd6"
            letter-spacing="0"
            line-height="140"
            font-size="24"
            height="10"
            :outer-line="{ stroke: '#4c5662', strokeWidth: '1', strokeDasharray: '0' }"
            :inner-line="{ stroke: '#4c5662', strokeWidth: '0.5', strokeDasharray: '1' }"
            :split-line="{ stroke: '#c8c8c8', strokeWidth: '1', strokeDasharray: '1' }"
          />
        </div>
      </div>
    </div>
    <a-button @click="handleExport">pdf</a-button>
    <a-button @click="() => handleExportImage()">Img</a-button>
    <a-button @click="() => handleExportImage2(2)">Img2</a-button>
    <a-button @click="() => handleExportImagePdf()">ImgPdf</a-button>
    <a-button @click="() => handleExportImageJSPdf(210, 297)">ImgJSPdf</a-button>
    <a-button @click="() => handleExportImageJSPdf2(210, 297)">ImgJSPdf2</a-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import printJS from 'print-js'
import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'
import { jsPDF } from 'jspdf'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'

const paperRef = ref(null)
import { message } from 'ant-design-vue'
import PinyinTable from '@/components/PinyinTable/index.vue'
const handleExportImage2 = (scale = 1) => {
  const element = paperRef.value
  if (!element) return
  toPng(element, {
    backgroundColor: '#fff',
    pixelRatio: scale,
  }).then(function (dataUrl) {
    var link = document.createElement('a')
    link.download = 'my-image-name.png'
    link.href = dataUrl
    link.click()
  })
}
const handleExportImageJSPdf2 = async (width = 210, height = 297) => {
  const element = paperRef.value
  if (!element) return

  const imgURL = await toPng(element, {
    backgroundColor: '#fff',
    pixelRatio: 1,
  })
  const orientation = width > height ? 'landscape' : 'portrait'
  const pdf = new jsPDF({
    unit: 'mm',
    orientation: orientation,
    format: [width, height],
  })
  pdf.addImage(imgURL, 'PNG', 0, 0, width, height)
  const pdfBlob = pdf.output('blob')
  printJS({
    printable: URL.createObjectURL(pdfBlob),
    type: 'pdf',
    showModal: false,
  })
}

const handleExportImageJSPdf = async (width = 210, height = 297) => {
  const element = paperRef.value
  if (!element) return
  const canvas = await html2canvas(element, {
    scale: 1,
    useCORS: true,
    backgroundColor: '#fff',
  })
  const imgURL = canvas.toDataURL('image/png')
  const orientation = width > height ? 'landscape' : 'portrait'
  const pdf = new jsPDF({
    unit: 'mm',
    orientation: orientation,
    format: [width, height],
  })
  pdf.addImage(imgURL, 'PNG', 0, 0, width, height)
  const pdfBlob = pdf.output('blob')
  printJS({
    printable: URL.createObjectURL(pdfBlob),
    type: 'pdf',
    showModal: false,
  })
}

const handleExportImagePdf = async (scale = 1) => {
  const element = paperRef.value
  if (!element) return
  const canvas = await html2canvas(element, {
    scale: scale,
    useCORS: true,
    backgroundColor: '#fff',
  })
  const imgURL = canvas.toDataURL('image/png')

  printJS({
    printable: imgURL,
    type: 'image',
    showModal: false,
    honorMarginPadding: false,
  })
}

const handleExportImage = async (scale = 1) => {
  const element = paperRef.value
  if (!element) return
  const key = 'export_png_loading'
  const hideLoading = message.loading({
    content: '正在导出中...',
    key: key,
    duration: 0,
  })
  try {
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      backgroundColor: '#fff',
    })
    const imgURL = canvas.toDataURL('image/png')
    // 下载
    const link = document.createElement('a')
    link.href = imgURL
    link.download = `export-${scale}x.png`
    link.click()
    hideLoading()
  } catch (error) {
    console.error('导出图片失败:', error)
    message.error({ content: '导出失败！', key, duration: 1.5 })
  }
}
const handleExport = async () => {
  if (!paperRef.value) {
    return
  }
  try {
    const pdfBlob = await html2pdf()
      .set({
        margin: 0,
        filename: 'test.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        // html2canvas: {
        //   scale: 1,
        //   useCORS: true,
        //   backgroundColor: '#fff',
        // },
        jsPDF: {
          unit: 'mm',
          orientation: 'portrait',
          format: [210, 297],
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'],
          avoid: '*',
        },
      })
      .from(paperRef.value)
      .outputPdf('blob')
    printJS({
      printable: URL.createObjectURL(pdfBlob),
      type: 'pdf',
      showModal: false,
    })
  } catch (e) {
    console.error(e)
  }
}
</script>
