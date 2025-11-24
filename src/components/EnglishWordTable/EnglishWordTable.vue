<template>
  <div class="relative w-full">
    <div class="relative flex flex-col" :style="{ gap: `${lineSpacing}mm` }">
      <EnglishWordRow
        v-for="(row, idx) in rows"
        :key="idx"
        v-bind="row"
        @ok="(phonetic) => handleEdit(phonetic, idx)"
      />
    </div>
  </div>
</template>
<script setup>
import { watchEffect, ref } from 'vue'
import EnglishWordRow from '@/components/EnglishWordRow/EnglishWordRow.vue'
import EnglishWordRowProps from '@/components/EnglishWordRow/props.js'

const { lineSpacing, unfilledRows, content, position, size, padding, ...otherProps } = defineProps({
  ...EnglishWordRowProps,
  position: {
    type: Object,
    default() {
      return {
        x: 0, // 最大12
        y: 8, // 默认 *5mm
      }
    },
  },
  size: {
    type: Object,
    default() {
      return {
        width: 12, // 最大12
        height: 47, // 默认 *5mm
      }
    },
  },
  padding: {
    type: Object,
    default() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }
    },
  },
  content: {
    // 文本内容
    type: Array,
    default() {
      return []
    },
  },
  unfilledRows: {
    // 空行数量
    type: Number,
    default: 1,
  },
  lineSpacing: {
    type: Number,
    default: 0,
  },
})
const rows = ref([])
const getPhonetic = (word, chinese) => {
  if (!word || !word.trim().length) {
    return ''
  }
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then((res) => {
      return {
        ...res?.[0],
        origin: word,
        translation: chinese,
      }
    })
    .catch((e) => {
      return {
        origin: word,
        translation: chinese,
      }
    })
}
const handleEdit = (value, rowIndex) => {
  rows.value[rowIndex].phonetic = value
}
watchEffect(async () => {
  const tasks = content.map((text) => {
    const [word = '', chinese = ''] = text.split(':')
    return getPhonetic(word, chinese)
  })
  let results = await Promise.allSettled(tasks)
  const data = results.map((item) => item.value)

  rows.value = data
    .flatMap((text) => {
      return [text, ...new Array(unfilledRows).fill('')]
    })
    .map((text) => {
      return {
        ...otherProps,
        text: text.origin,
        phonetic: text?.phonetic,
        translation: text.translation,
        phonetics: text?.phonetics || [],
      }
    })
})
</script>
<style scoped lang="less">
.pinyinTable {
  display: flex;
  flex-direction: column;
}
</style>
