<script setup>
import { computed, useTemplateRef, ref } from 'vue'
import ChineseCell from '@/components/ChineseCell/index.vue'
import PinyinRow from '@/components/PinyinRow/index.vue'
import PinyinTable from '@/components/PinyinTable/index.vue'
import ChineseTable from '@/components/ChineseTable/index.vue'
import ss from './index.module.less'
import ChineseWordsRow from '@/components/ChineseWordsRow/ChineseWordsRow.vue'
import ChineseWordsTable from '@/components/ChineseWordsTable/ChineseWordsTable.vue'
import PinyinEditorModal from '@/components/PinyinEditorModal.vue'
import ChineseParagraphTable from '@/components/ChineseParagraphTable/ChineseParagraphTable.vue'
const props = defineProps({
  text: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    validator(value) {
      return [
        'empty',
        'line',
        'horizontalLine',
        'verticalLine',
        'mouseLine',
        'riceLine',
        'fieldLine',
        'wellLine',
        'nestWellLine',
        'nestMouseLine',
        'nestMouseLine2',
        'nestMouseLine3',
        'nestMouseLine4',
      ].includes(value)
    },
    default: 'empty',
  },
  outerLine: {
    type: Object,
    default() {
      return {
        stroke: '#4c5662ff',
        strokeWidth: '1',
        strokeDasharray: '1',
      }
    },
  },
  innerLine: {
    type: Object,
    default() {
      return {
        stroke: '#4c5662ff',
        strokeWidth: '0.5',
        strokeDasharray: '0',
      }
    },
  },
})
const open = ref(false)
const handleCancel = () => {
  open.value = false
}
const handleOk = (value) => {
  console.log(value, '----edit')
  open.value = false
}
</script>

<template>
  <div :class="ss.pager">
    <!--        <PinyinTable-->
    <!--          :content="['a', 'b']"-->
    <!--          :unfilled-rows="2"-->
    <!--          line-spacing="10"-->
    <!--          :filled-number="2"-->
    <!--          :unfilled-number="8"-->
    <!--          filled-color="red"-->
    <!--          unfilled-color="blue"-->
    <!--          letter-spacing="40"-->
    <!--          line-height="140"-->
    <!--          font-size="24"-->
    <!--          height="15"-->
    <!--          :outer-line="{stroke: '#ff0000', strokeWidth: '5', strokeDasharray: '3'}"-->
    <!--          :inner-line="{stroke: '#6df707', strokeWidth: '5', strokeDasharray: '1'}"-->
    <!--          :split-line="{stroke: '#bd0fdb', strokeWidth: '5', strokeDasharray: 4}"-->
    <!--        />-->

    <!--        <ChineseTable-->
    <!--          :content="['中', '，', '', '国']"-->
    <!--          :chinese-size="10"-->
    <!--          :pinyin-height="8"-->
    <!--          :unfilled-rows="2"-->
    <!--          :unfilled-number="2"-->
    <!--          :show-pinyin="true"-->
    <!--          :show-chinese-stroke="true"-->
    <!--          :line-spacing="10"-->
    <!--          :chinese-stroke-size="6"-->
    <!--        />-->

    <!--    <ChineseWordsTable-->
    <!--      :content="['中国', '美国']"-->
    <!--      :chinese-size="10"-->
    <!--      :unfilled-number="2"-->
    <!--      :pinyin-height="8"-->
    <!--      :unfilled-rows="2"-->
    <!--      :show-pinyin="true"-->
    <!--      :line-spacing="10"-->
    <!--    />-->
    <!--    <ChineseParagraphTable-->
    <!--      :content="['中国', '日本']"-->
    <!--      :chinese-size="10"-->
    <!--      :unfilled-number="1"-->
    <!--      :pinyin-height="8"-->
    <!--      :unfilled-rows="0"-->
    <!--      :show-pinyin="true"-->
    <!--      :line-spacing="10"-->
    <!--    />-->
  </div>
</template>
