<template>
  <div>
    <a-textarea
      @mousedown.prevent="handleClick"
      value="sfjasjdflaksdfklasjdl"
      ref="inputRef"
    ></a-textarea>
    <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
const open = ref(false)
const inputRef = useTemplateRef('inputRef')

const handleClick = (e) => {
  // e.preventDefault()
  open.value = true
  // 让 textarea 失去焦点
  // console.log(inputRef.value, '--iii')
}

const handleOk = () => {
  open.value = false
}
</script>
