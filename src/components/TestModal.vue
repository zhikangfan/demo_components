<template>
  <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>
<script lang="ts">
const open = ref(false)
const handleOk = () => {
  open.value = false
}
</script>
