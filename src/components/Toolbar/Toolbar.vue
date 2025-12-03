<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
  >
    <a-form-item label="字体大小" name="fontSize">
      <a-input-number v-model:value="formState.fontSize" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { currentSelectWidget, paper } from '@/hooks/useRefData'
const formState = ref({})
watchEffect(() => {
  formState.value = currentSelectWidget.value?.config
})
</script>
