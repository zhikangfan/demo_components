<template>
  <a-textarea
    :value="model"
    @click.stop="onFocus"
    :autoSize="{ minRows: 2, maxRows: 6 }"
    :style="{ resize: 'none' }"
  ></a-textarea>
  <a-modal
    v-model:open="open"
    title="内容"
    @ok="handleOk"
    @cancel="handleCancel"
    ok-text="确定"
    cancel-text="取消"
  >
    <a-textarea :autoSize="{ minRows: 6, maxRows: 6 }" v-model:value="inputValue"></a-textarea>
  </a-modal>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
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
</script>
