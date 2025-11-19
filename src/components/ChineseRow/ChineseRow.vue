<template>
  <div class="chineseRow" ref="containerRef">
    <div
      style="display: flex; align-items: center; margin-bottom: -1px"
      v-if="props.showChineseStroke"
    >
      <div
        :class="{ pinyinBox: true, normal: !localPinyinProps.text }"
        :style="{ width: cellWidth + 'px' }"
        v-if="props.showPinyin"
        @click="handleOpen"
      >
        <Pinyin v-bind="localPinyinProps" />
      </div>
      <div :class="ss.strokeBox">
        <svg
          viewBox="0 0 1024 1024"
          :width="props.chineseStrokeSize"
          :height="props.chineseStrokeSize"
          v-for="(stroke, idx) in props.chineseStrokes"
          :key="idx"
        >
          <g transform="scale(1, -1) translate(0, -900)">
            <path
              v-for="(path, pathIndex) in stroke.path"
              :key="pathIndex"
              :d="path"
              :fill="pathIndex < idx ? '#000000ff' : '#dd0000ff'"
            ></path>
          </g>
        </svg>
      </div>
    </div>
    <div style="display: flex; width: 100%; flex-wrap: nowrap">
      <ChineseCell
        v-for="(cell, idx) in cells"
        :key="idx"
        :show-pinyin="!props.showChineseStroke && props.showPinyin"
        :style="{ marginLeft: `${margin}px`, marginRight: `${margin}px` }"
        :chinese-props="cell.chineseProps"
        :pinyin-props="cell.pinyinProps"
        :cell-width="cellWidth"
      />
    </div>
    <Modal
      v-model:open="open"
      title="编辑"
      @ok="handleOk"
      @cancel="handleCancel"
      cancelText="取消"
      okText="确定"
      @afterClose="afterClose"
    >
      <Card>
        <template #title>
          <div
            style="display: flex; align-items: center; gap: 8px; font-size: 20px; line-height: 28px"
          >
            <div>
              {{ props.chineseProps.text }}
            </div>
            <div v-if="pinyinForm.status !== 'block'">
              {{ pinyinForm.status !== 'custom' ? pinyinForm.status : pinyinForm.custom }}
            </div>
          </div>
        </template>
        <Form :model="pinyinForm" layout="vertical" name="basic" autocomplete="off">
          <FormItem name="status">
            <RadioGroup v-model:value="pinyinForm.status" @change="onChange">
              <Radio value="block">留空</Radio>
              <Radio
                :value="pinyin"
                v-for="pinyin in props.chineseProps.polyphonic"
                :key="pinyin"
                >{{ pinyin }}</Radio
              >
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
  </div>
</template>
<script setup>
import { Modal, Card, Form, FormItem, Input, RadioGroup, Radio } from 'ant-design-vue'
import { computed, ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import ss from '@/views/HomeView/index.module.less'
import Pinyin from '@/components/Pinyin/index.vue'
import ChineseCell from '@/components/ChineseCell/index.vue'
import ChineseRowProps from '@/components/ChineseRow/props.js'

const props = defineProps(ChineseRowProps)
const resizeObserver = ref(null)
const containerRef = ref(null)
const containerWidth = ref(0)
const open = ref(false)
const localPinyin = ref(props.pinyinProps.text || '')
const localPinyinProps = computed(() => {
  return {
    ...props.pinyinProps,
    text: localPinyin.value,
  }
})

const onChange = (e) => {
  const selected = e.target.value
  if (selected === 'block' || selected === 'custom') {
    return
  }
  pinyinForm.custom = selected
}
const yinbiao = ref([
  ['ā', 'á', 'ǎ', 'à'],
  ['ō', 'ó', 'ǒ', 'ò'],
  ['ē', 'é', 'ě', 'è'],
  ['ī', 'í', 'ǐ', 'ì'],
  ['ū', 'ú', 'ǔ', 'ù'],
  ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
])

const pinyinForm = reactive({
  status: 'custom',
  custom: '',
})
const handleYinbiaoClick = (yinbiaoChar) => {
  // 将点击的音标字符添加到自定义拼音输入框中
  pinyinForm.custom += yinbiaoChar
}

const margin = computed(() => {
  return props.spacing * 2
})
const handleOpen = () => {
  if (!localPinyinProps.value.text) {
    return
  }
  pinyinForm.status = !localPinyinProps.value.text
    ? 'block'
    : props.chineseProps.polyphonic.includes(localPinyinProps.value.text)
      ? localPinyinProps.value.text
      : 'custom'
  pinyinForm.custom = localPinyinProps.value.text
  open.value = true
}
const handleOk = () => {
  localPinyin.value = pinyinForm.status === 'block' ? '' : pinyinForm.custom
  open.value = false
}
const handleCancel = () => {
  open.value = false
}
const afterClose = () => {
  pinyinForm.status = 'custom'
  pinyinForm.custom = ''
}
// 计算总的span数量
const totalCell = computed(() => {
  return Math.floor(containerWidth.value / cellWidth.value)
})
const cells = computed(() => {
  return new Array(totalCell.value).fill('').map((item, idx) => {
    return {
      pinyinProps: {
        ...localPinyinProps.value,
        text:
          idx < props.filledNumber + props.unfilledNumber
            ? localPinyinProps.value.text || props.pinyinProps.text
            : '',
        color: idx === 0 ? props.filledColor : props.unfilledColor,
      },
      chineseProps: {
        ...props.chineseProps,
        text: idx < props.filledNumber + props.unfilledNumber ? props.chineseProps.text : '',
        color: idx === 0 ? props.filledColor : props.unfilledColor,
      },
      showPinyin: true,
    }
  })
})

// 计算单元格宽度
const cellWidth = computed(() => {
  return props.chineseProps.size + margin.value * 2
})
// 初始化容器宽度
onMounted(() => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth

    // 使用 ResizeObserver 监听容器尺寸变化
    resizeObserver.value = new ResizeObserver((entries) => {
      console.log(entries)
      for (let entry of entries) {
        containerWidth.value = entry.contentRect.width
      }
    })

    resizeObserver.value.observe(containerRef.value)
  }
})
onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
  }
})
</script>
<style scoped lang="less">
.chineseRow {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.pinyinBox {
  &:hover {
    background: #b9dccc;
    cursor: pointer;
    &.normal {
      background: transparent;
      cursor: initial;
    }
  }
}
</style>
