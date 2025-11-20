<!-- src/components/PinyinEditorModal.vue -->
<template>
  <Modal v-bind:$attrs @ok="handleOk" @afterClose="afterClose">
    <Card>
      <template #title>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 20px; line-height: 28px">
          <div>{{ props.chinese }}</div>
          <div v-if="pinyinForm.status !== 'block'">
            {{ pinyinForm.status !== 'custom' ? pinyinForm.status : pinyinForm.custom }}
          </div>
        </div>
      </template>
      <Form :model="pinyinForm" layout="vertical" name="basic" autocomplete="off">
        <FormItem name="status">
          <RadioGroup v-model:value="pinyinForm.status" @change="onChange">
            <Radio value="block">留空</Radio>
            <Radio :value="pinyin" v-for="pinyin in options" :key="pinyin">{{ pinyin }}</Radio>
            <Radio value="custom">自定义</Radio>
          </RadioGroup>
        </FormItem>
        <template v-if="pinyinForm.status === 'custom'">
          <FormItem label="自定义拼音" name="custom">
            <Input v-model:value="pinyinForm.custom" />
          </FormItem>
          <div class="flex flex-col gap-2 text-lg">
            <div class="flex gap-2 items-center" v-for="(item, idx) in yinbiao[0]" :key="idx">
              <div
                v-for="(row, rowIndex) in yinbiao"
                :key="rowIndex"
                class="flex-1 border border-solid border-gray-300 p-1 rounded cursor-pointer text-center hover:bg-[#b9dccc]/20"
                @click="handleYinbiaoClick(row[idx])"
              >
                {{ row[idx] }}
              </div>
            </div>
          </div>
        </template>
      </Form>
    </Card>
  </Modal>
</template>

<script setup>
import { ref, reactive, watch, computed, watchEffect, useAttrs } from 'vue'
import { Modal, Card, Form, FormItem, Input, RadioGroup, Radio } from 'ant-design-vue'
import { pinyin as Pinyin } from 'pinyin-pro'
const props = defineProps({
  chinese: {
    type: String
  },
  pinyin: {
    type: String
  }
})
const attrs = useAttrs()
const emit = defineEmits(['update:pinyin', 'ok', 'afterClose'])

const chineseInfo = ref({})

const yinbiao = ref([
  ['ā', 'á', 'ǎ', 'à'],
  ['ō', 'ó', 'ǒ', 'ò'],
  ['ē', 'é', 'ě', 'è'],
  ['ī', 'í', 'ǐ', 'ì'],
  ['ū', 'ú', 'ǔ', 'ù'],
  ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
])


const options = ref([])

const pinyinForm = reactive({
  status: 'custom',
  custom: '',
})

watchEffect(() => {
  if (attrs.open) {
    chineseInfo.value = Pinyin(props.chinese, {type: 'all'})?.[0]
    const isInOptions = chineseInfo.value?.polyphonic?.includes?.(props.pinyin)
    options.value = chineseInfo.value?.polyphonic
    pinyinForm.status = isInOptions ? props.pinyin : 'custom'
    pinyinForm.custom = props.pinyin
  }
})

const onChange = (e) => {
  const selected = e.target.value
  if (selected === 'block' || selected === 'custom') return
  pinyinForm.custom = selected
}

const handleYinbiaoClick = (yinbiaoChar) => {
  pinyinForm.custom += yinbiaoChar
}

const handleOk = () => {
  const result =
    pinyinForm.status === 'block' ? '' : pinyinForm.status === 'custom' ? pinyinForm.custom : pinyinForm.status
    emit('update:pinyin', result)
    emit('ok', result)
}

const afterClose = () => {
  pinyinForm.status = 'custom'
  pinyinForm.custom = ''
  emit('afterClose')
}
</script>
