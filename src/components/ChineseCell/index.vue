<template>
  <div :class="ss.chineseCell">
    <Pinyin
      v-bind="localPinyinProps"
      v-if="props.showPinyin"
      :class="props.canEdit ? ['hover:bg-[#b9dccc]', 'hover:cursor-pointer'] : []"
      :style="props.cellWidth ? { width: props.cellWidth + 'px' } : {}"
      @click="handleOpen"
    />
    <Chinese v-bind="props.chineseProps" />
    <PinyinEditorModal
      v-if="props.canEdit"
      v-model:pinyin="localPinyinProps.text"
      v-model:open="visible"
      :chinese="props.chineseProps.text"
      title="编辑"
      @ok="handleOk"
      @cancel="handleCancel"
      @afterClose="handleAfterClose"
      cancelText="取消"
      okText="确定"
    />
  </div>
</template>
<script setup>
import { ref, reactive, watchEffect } from 'vue'
import ss from './index.module.less'
import Pinyin from '@/components/Pinyin/index.vue'
import Chinese from '@/components/Chinese/index.vue'
import ChineseCellProps from './props.js'
import PinyinEditorModal from '@/components/PinyinEditorModal.vue'

const props = defineProps(ChineseCellProps)
let localPinyinProps = reactive({
  ...props.pinyinProps,
  text: props.pinyinProps.text,
})
const emit = defineEmits(['ok', 'cancel', 'afterClose'])
const visible = ref(false)
const handleOpen = () => {
  visible.value = true
}
watchEffect(() => {
  localPinyinProps = {
    ...props.pinyinProps,
    text: props.pinyinProps.text,
  }
})
const handleOk = (value) => {
  visible.value = false
  localPinyinProps.text = value
  emit('ok', value)
}
const handleCancel = () => {
  visible.value = false
  emit('cancel')
}
const handleAfterClose = () => {
  emit('afterClose')
}
</script>
