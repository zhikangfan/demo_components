<template>
  <a-modal title="" @ok="handleOk" @cancel="handleCancel" @after-close="handleAfterClose">
    <a-tabs v-model:activeKey="activeEdition" @change="onChangeEdition">
      <a-tab-pane :key="editionTab.value" :tab="editionTab.label" v-for="editionTab in editionTabs">
        <div>
          <a-tabs v-model:activeKey="activeLearnType" tab-position="left">
            <a-tab-pane :key="tab.value" :tab="tab.label" v-for="tab in learnTypeTabs">
              <div v-for="section in currentSections" :key="section.name">
                {{ section.name }}
                <div
                  :class="{ 'text-[red]': isActiveLesson(section.name, lesson.name) }"
                  v-for="lesson in section.lessons"
                  :key="`${section.name}_${lesson.name}`"
                  @click="() => handleSelect(section.name, lesson.name)"
                >
                  {{ lesson.name }}
                </div>
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

const emits = defineEmits<{
  (e: 'ok', content: string[]): void
  (e: 'cancel'): void
  (e: 'afterClose'): void
}>()

const props = withDefaults(defineProps<TextbookProps>(), {
  grade: Grade.Frist,
  volume: Volume.I,
  edition: Edition.DepartmentalEdition,
})
const editionTabs: { label: string; value: Edition }[] = [
  {
    label: '部编版',
    value: Edition.DepartmentalEdition,
  },
  {
    label: '部编版（5年制）',
    value: Edition.DepartmentalEdition5Year,
  },
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
]
const open = ref(false)

const activeGrade = ref(Grade.Frist)

const activeVolume = ref(Volume.I)

const activeEdition = ref(Edition.DepartmentalEdition)

const activeLearnType = ref(LearnType.Read)

const currentSections = ref<Section[]>([])

const activeLessons = ref<string[]>([])

const textbook: Textbook = {
  grade: Grade.Frist,
  volume: Volume.I,
  edition: Edition.DepartmentalEdition,
  sections: [
    {
      name: '识字',
      lessons: [
        {
          name: '第一课',
          learnType: [LearnType.Read],
          content: ['你', '好'],
        },
      ],
    },
    {
      name: '识字2',
      lessons: [
        {
          name: '第一课',
          learnType: [LearnType.Read, LearnType.Write],
          content: ['你', '好'],
        },
      ],
    },
  ],
}

const textbooks: Textbook[] = [textbook]

watch(
  [activeGrade, activeVolume, activeEdition, activeLearnType],
  () => {
    // 筛选课本
    const textbookResult = textbooks.find((textbook) => {
      return (
        textbook.grade === activeGrade.value &&
        textbook.volume === activeVolume.value &&
        textbook.edition === activeEdition.value
      )
    })
    if (textbookResult) {
      // 筛选章节
      currentSections.value = textbookResult.sections
        .map((section) => {
          // 筛选课程
          const lessonsResult = section.lessons.filter((lesson) =>
            lesson.learnType.includes(activeLearnType.value),
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

const handleOpen = () => {
  // 给初始值
  activeGrade.value = Grade.Frist
  activeVolume.value = Volume.I
  activeEdition.value = Edition.DepartmentalEdition
  activeLearnType.value = LearnType.Read
  open.value = true
}
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
