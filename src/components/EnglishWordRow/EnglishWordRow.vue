<template>
  <div>
    <PinyinRow v-bind="otherProps" />
    <div class="whitespace-pre gap-4 flex items-center" :style="{ marginTop: `${margin}mm` }">
      <span v-if="showChinese" style="color: rgb(153, 153, 153); font-size: 16px">{{
        translation
      }}</span
      ><span
        v-if="showPhonetic"
        @click="handleOpen"
        class="cursor-pointer hover:bg-[#b9dccc]/20"
        style="color: rgb(153, 153, 153); font-size: 16px"
        >{{ phonetic }}</span
      >
    </div>
    <EnglishPhoneticEditorModal
      :word="otherProps.text"
      :phonetic="phonetic"
      :phonetics="phonetics"
      v-model:open="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      @after-close="handleAfterClose"
    />
  </div>
</template>
<script setup>
import { defineProps, ref, defineEmits } from 'vue'
import PinyinRow from '@/components/PinyinRow/index.vue'
import EnglishWordRowProps from './props.js'
import EnglishPhoneticEditorModal from '@/components/EnglishPhoneticEditorModal.vue'

const emit = defineEmits(['ok', 'cancel', 'afterClose', 'open'])

const visible = ref(false)
const handleOpen = () => {
  visible.value = true
  emit('open')
}
const handleOk = (phonetic) => {
  visible.value = false
  emit('ok', phonetic)
}
const handleCancel = () => {
  visible.value = false
  emit('cancel')
}
const handleAfterClose = () => {
  emit('')
}
const { showChinese, showPhonetic, margin, phonetic, translation, phonetics, ...otherProps } =
  defineProps(EnglishWordRowProps)
</script>
