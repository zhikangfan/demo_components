<template>
  <div>
    快捷输入：
    <div v-for="textbook in Textbooks" :key="textbook.grade">
      {{ getGradeName(textbook.grade) }}（）
    </div>
  </div>
  <TextbookModal />
</template>
<script setup lang="ts">
import TextbookModal from '@/views/HomeView/TextbookModal.vue'
import { Grade, Volume } from '@/views/HomeView/TextbookModalProps.ts'
import Textbooks from './textbook.config.ts'
// const textbooks: { grade: Grade, volumes: Volume[]}[] = [
//   {
//     grade: Grade.Frist,
//     volumes: [
//       Volume.I,
//       Volume.II
//     ]
//   },
//   {
//     grade: Grade.Second,
//     volumes: [
//       Volume.I,
//       Volume.II
//     ]
//   },
//   {
//     grade: Grade.Third,
//     volumes: [
//       Volume.I,
//       Volume.II
//     ]
//   },
//   {
//     grade: Grade.Fourth,
//     volumes: [
//       Volume.I,
//       Volume.II
//     ]
//   },
//   {
//     grade: Grade.Fifth,
//     volumes: [
//       Volume.I,
//       Volume.II
//     ]
//   },
//   {
//     grade: Grade.Sixth,
//     volumes: [
//       Volume.I,
//       Volume.II
//     ]
//   }
// ]

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
</script>
