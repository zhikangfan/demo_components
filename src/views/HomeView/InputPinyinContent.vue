<template>
  <a-textarea
    :value="model"
    @click.stop="onFocus"
    :autoSize="{ minRows: 2, maxRows: 6 }"
    :style="{ resize: 'none' }"
  ></a-textarea>
  <a-modal
    width="640px"
    v-model:open="open"
    title="内容"
    @ok="handleOk"
    @cancel="handleCancel"
    ok-text="确定"
    cancel-text="取消"
  >
    <a-alert
      class="mb-4 rounded border-0 bg-zinc-100 text-zinc-800"
      message="请使用回车断开内容，每行内容将视为一个格子的内容。"
      type="warning"
      show-icon
    />
    <a-textarea :autoSize="{ minRows: 5, maxRows: 5 }" v-model:value="inputValue"></a-textarea>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane :key="tab.key" :tab="tab.title" v-for="tab in tabData">
        <div class="flex flex-col gap-2 text-lg">
          <div class="flex items-center gap-2" v-for="(content, idx) in tab.value" :key="idx">
            <div
              class="flex-1 cursor-pointer rounded border border-solid border-gray-300 p-1 text-center hover:bg-[#b9dccc]/20"
              v-for="(it, i) in content"
              :key="`${it}_${i}`"
              @click="() => onClick(it)"
            >
              {{ it }}
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const activeKey = ref('tones')
const open = ref(false)

const tones = [
  ['ā', 'ō', 'ē', 'ī', 'ū', 'ǖ'], // 第一声
  ['á', 'ó', 'é', 'í', 'ú', 'ǘ'], // 第二声
  ['ǎ', 'ǒ', 'ě', 'ǐ', 'ǔ', 'ǚ'], // 第三声
  ['à', 'ò', 'è', 'ì', 'ù', 'ǜ'], // 第四声
]
const consonants = [
  ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l'], // 双唇音、唇齿音、舌尖前音
  ['g', 'k', 'h', 'j', 'q', 'x'], // 舌根音
  ['zh', 'ch', 'sh', 'r', 'z', 'c', 's', 'y', 'w'], // 翘舌音、平舌音、半元音
]
const vowels = [
  ['a', 'o', 'e', 'i', 'u', 'ü'], // 单韵母
  ['ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'üe', 'er'], // 复韵母
  ['an', 'en', 'in', 'un', 'ün'], // 前鼻韵母
  ['ang', 'eng', 'ing', 'ong'], // 后鼻韵母
]
const wholeSyllables = [
  ['zhi', 'chi', 'shi', 'ri'], // 卷舌音整体认读音节
  ['zi', 'ci', 'si', 'yi'], // 平舌音和韵母i的整体认读音节
  ['wu', 'yu', 'ye', 'yue'], // 韵母u、ü及相关音节的整体认读音节
  ['yuan', 'yin', 'yun', 'ying'], // 韵母uan、in、un、ing的整体认读音节
]

const tabData = [
  {
    key: 'tones',
    title: '声调',
    value: tones,
  },
  {
    key: 'consonants',
    title: '声母',
    value: consonants,
  },
  {
    key: 'vowels',
    title: '韵母',
    value: vowels,
  },
  {
    key: 'wholeSyllables',
    title: '整体认读',
    value: wholeSyllables,
  },
]

const model = defineModel('value', {
  default: '',
})
const inputValue = ref(model.value)
const onFocus = () => {
  open.value = true
}
const handleOk = () => {
  open.value = false
  model.value = inputValue.value
}
const handleCancel = () => {
  open.value = false
}
const onClick = (it) => {
  if (inputValue.value) {
    inputValue.value += '\n' + it
  } else {
    inputValue.value += it
  }
}
</script>
