<template>
  <div class="text-sm text-[#333333]">
    快捷输入：
    <div v-for="(textbookArr, grade) in textbooks" :key="grade">
      {{ getGradeName(Number(grade)) }}（<template
        v-for="(textbook, idx) in textbookArr"
        :key="`${textbook.grade}_${textbook.volume}`"
      >
        <span
          class="cursor-pointer text-[red] hover:underline"
          @click="() => handleModal(textbook)"
          >{{ getVolumeName(textbook.volume) }}</span
        >{{ idx === textbookArr.length - 1 ? '' : '、' }} </template
      >）
    </div>
  </div>
  <TextbookModal
    v-model:open="open"
    :grade="currentTextbook.grade"
    :volume="currentTextbook.volume"
    :edition="currentTextbook.edition"
    @ok="handleConfirm"
    @cancel="handleCancel"
  />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import _ from 'lodash'
import TextbookModal from '@/views/HomeView/TextbookModal.vue'
import { Edition, Grade, type Textbook, Volume } from '@/views/HomeView/TextbookModalProps.ts'
const textbooks = ref([])
const getGradeName = (grade: Grade) => {
  switch (grade) {
    case Grade.Frist:
      return '一年级'
    case Grade.Second:
      return '二年级'
    case Grade.Third:
      return '三年级'
    case Grade.Fourth:
      return '四年级'
    case Grade.Fifth:
      return '五年级'
    case Grade.Sixth:
      return '六年级'
  }
}
const getVolumeName = (volume: Volume) => {
  switch (volume) {
    case Volume.I:
      return '上册'
    case Volume.II:
      return '下册'
  }
}
const loading = ref(false)
const open = ref(false)
const currentTextbook = ref({
  grade: Grade.Frist,
  volume: Volume.I,
  edition: Edition.UnifiedEdition,
})
const handleModal = (textbook: Textbook) => {
  currentTextbook.value = {
    grade: textbook.grade,
    volume: textbook.volume,
    edition: textbook.edition,
  }
  open.value = true
}
const handleConfirm = (content: string[]) => {
  console.log(content, '--cc')
  open.value = false
}
const handleCancel = () => {
  open.value = false
}
const fetchData = async () => {
  loading.value = true
  try {
    const result = await fetch('textbook.json').then((res) => res.json())
    textbooks.value = _.groupBy(result, 'grade')
  } catch (e) {
    textbooks.value = []
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  fetchData()
})
</script>
