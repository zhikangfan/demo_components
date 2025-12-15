<template>
  <a-modal
    v-model:open="modelOpen"
    title=""
    @ok="handleOk"
    @cancel="handleCancel"
    @after-close="handleAfterClose"
  >
    <a-tabs v-model:activeKey="activeEdition" @change="onChangeEdition">
      <a-tab-pane :key="editionTab.value" :tab="editionTab.label" v-for="editionTab in editionTabs">
        <div>
          <a-tabs v-model:activeKey="activeLearnType" tab-position="left">
            <a-tab-pane :key="tab.value" :tab="tab.label" v-for="tab in learnTypeTabs">
              <div v-for="section in currentSections" :key="section.name" class="mb-3">
                <div class="mb-2 text-lg">
                  {{ section.name }}
                </div>
                <a-space :size="[16, 2]" wrap>
                  <div
                    :class="[
                      { 'text-[red]': isActiveLesson(section.name, lesson.name) },
                      'cursor-pointer',
                      'hover:text-[red]',
                    ]"
                    v-for="lesson in section.lessons"
                    :key="`${section.name}_${lesson.name}`"
                    @click="() => handleSelect(section.name, lesson.name)"
                  >
                    {{ lesson.name }}
                  </div>
                </a-space>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import {
  Grade,
  Volume,
  type TextbookProps,
  Edition,
  LearnType,
  type Textbook,
  type Section,
} from './TextbookModalProps'
import Textbooks from './textbook.config.ts'

const modelOpen = defineModel('open', {
  default: false,
})

const emits = defineEmits<{
  (e: 'ok', content: string[]): void
  (e: 'cancel'): void
  (e: 'afterClose'): void
}>()

const props = withDefaults(defineProps<TextbookProps>(), {
  grade: Grade.Frist,
  volume: Volume.I,
  edition: Edition.UnifiedEdition,
})
const editionTabs: { label: string; value: Edition }[] = [
  // {
  //   label: '部编版',
  //   value: Edition.DepartmentalEdition,
  // },
  // {
  //   label: '部编版（5年制）',
  //   value: Edition.DepartmentalEdition5Year,
  // },
  {
    label: '统编版',
    value: Edition.UnifiedEdition,
  },
]
const learnTypeTabs: { label: string; value: LearnType }[] = [
  {
    label: '识字',
    value: LearnType.Read,
  },
  {
    label: '写字',
    value: LearnType.Write,
  },
  {
    label: '词语',
    value: LearnType.Words,
  },
]

const activeEdition = ref(props.edition)

const activeLearnType = ref(LearnType.Read)

const currentSections = ref<Section[]>([])

const activeLessons = ref<string[]>([])

const textbooks: Textbook[] = Textbooks

watch(
  [() => props.grade, () => props.volume, () => props.edition, activeLearnType],
  ([activeGrade, activeVolume, activeEdition, activeLearnType]) => {
    // 筛选课本
    const textbookResult = textbooks.find((textbook) => {
      return (
        textbook.grade === activeGrade &&
        textbook.volume === activeVolume &&
        textbook.edition === activeEdition
      )
    })
    if (textbookResult) {
      // 筛选章节
      currentSections.value = textbookResult.sections
        .map((section) => {
          // 筛选课程
          const lessonsResult = section.lessons.filter((lesson) =>
            lesson.learnType.includes(activeLearnType),
          )
          return {
            ...section,
            lessons: lessonsResult,
          }
        })
        .filter((section) => section.lessons.length > 0)
    } else {
      currentSections.value = []
    }
  },
  {
    immediate: true,
  },
)

const onChangeEdition = () => {
  activeLearnType.value = LearnType.Read
}
const handleOk = () => {
  const activeLessonsResult = activeLessons.value.map((lessonKey) => {
    const [sectionName, lessonName] = lessonKey.split('_')
    return {
      sectionName,
      lessonName,
    }
  })
  const contents = activeLessonsResult.flatMap((item) => {
    const targetSection = currentSections.value.find((section) => section.name === item.sectionName)
    const targetLesson = targetSection?.lessons.find((lesson) => lesson.name === item.lessonName)
    return targetLesson?.content || []
  })
  emits('ok', contents)
}
const handleCancel = () => {
  emits('cancel')
}
const handleAfterClose = () => {
  activeLearnType.value = LearnType.Read
  emits('afterClose')
}
// 添加判断课程是否被选中的方法
const isActiveLesson = (sectionName: string, lessonName: string) => {
  const lessonKey = `${sectionName}_${lessonName}`
  return activeLessons.value.includes(lessonKey)
}
const handleSelect = (sectionName: string, lessonName: string) => {
  const lessonKey = `${sectionName}_${lessonName}`
  const index = activeLessons.value.findIndex((key) => key === lessonKey)

  if (index > -1) {
    // 如果已存在，则移除
    activeLessons.value.splice(index, 1)
  } else {
    // 如果不存在，则添加
    activeLessons.value.push(lessonKey)
  }
}
</script>
