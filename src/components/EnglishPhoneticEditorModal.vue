<!-- src/components/PinyinEditorModal.vue -->
<template>
  <Modal v-bind:$attrs @ok="handleOk" @afterClose="afterClose">
    <Card>
      <template #title>
        <div
          style="display: flex; align-items: center; gap: 8px; font-size: 20px; line-height: 28px"
        >
          <div>{{ props.word }}</div>
          <div v-if="form.status !== 'block'">
            {{ form.status !== 'custom' ? form.status : form.custom }}
          </div>
        </div>
      </template>
      <Form :model="form" layout="vertical" name="basic" autocomplete="off">
        <FormItem name="status">
          <RadioGroup v-model:value="form.status" @change="onChange">
            <Radio value="block">留空</Radio>
            <Radio :value="phonetic" v-for="phonetic in options" :key="phonetic"
              >{{ phonetic }}
            </Radio>
            <Radio value="custom">自定义</Radio>
          </RadioGroup>
        </FormItem>
        <template v-if="form.status === 'custom'">
          <FormItem label="自定义音标" name="custom">
            <Input v-model:value="form.custom" />
          </FormItem>
        </template>
      </Form>
    </Card>
  </Modal>
</template>

<script setup>
import { ref, reactive, watchEffect, useAttrs } from 'vue'
import { Modal, Card, Form, FormItem, Input, RadioGroup, Radio } from 'ant-design-vue'

const props = defineProps({
  word: {
    type: String,
  },
  phonetic: {
    type: String,
  },
  phonetics: {
    type: Array,
    default: () => [],
  },
})
const attrs = useAttrs()
const emit = defineEmits(['update:phonetic', 'ok', 'afterClose'])

const options = ref([])

const form = reactive({
  status: 'custom',
  custom: '',
})

watchEffect(() => {
  if (attrs.open) {
    options.value = props.phonetics.map((item) => item.text)
    const isInOptions = props.phonetics.some((item) => item.text === props.phonetic)
    form.status = isInOptions ? props.phonetic : 'custom'
    form.custom = props.phonetic
  }
})

const onChange = (e) => {
  const selected = e.target.value
  if (selected === 'block' || selected === 'custom') return
  form.custom = selected
}

const handleOk = () => {
  const result = form.status === 'block' ? '' : form.status === 'custom' ? form.custom : form.status
  emit('update:phonetic', result)
  emit('ok', result)
}

const afterClose = () => {
  form.status = 'custom'
  form.custom = ''
  emit('afterClose')
}
</script>
