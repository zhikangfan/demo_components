<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="字体大小"
      name="fontSize"
    >
      <a-input v-model:value="formState.fontSize" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import {reactive, watch, defineProps} from 'vue';

interface FormState {
  fontSize: number
}

const props = withDefaults(defineProps<{
  fontSize: number
}>(), {
  fontSize: 12
});

const formState = reactive<FormState>({
  fontSize: 13
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

watch(() => props.fontSize, (newValue, oldValue) => {
  console.log('newValue', newValue)
  formState.fontSize = newValue
}, {
  immediate: true
})

</script>

