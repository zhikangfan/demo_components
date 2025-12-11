<script setup>
import { computed, useTemplateRef, ref, createVNode } from 'vue'
import ChineseCell from '@/components/ChineseCell/index.vue'
import PinyinRow from '@/components/PinyinRow/index.vue'
import PinyinTable from '@/components/PinyinTable/index.vue'
import ChineseTable from '@/components/ChineseTable/index.vue'
import ss from './index.module.less'
import ChineseWordsRow from '@/components/ChineseWordsRow/ChineseWordsRow.vue'
import ChineseWordsTable from '@/components/ChineseWordsTable/ChineseWordsTable.vue'
import PinyinEditorModal from '@/components/PinyinEditorModal.vue'
import ChineseParagraphTable from '@/components/ChineseParagraphTable/ChineseParagraphTable.vue'
import ChineseStrokeTable from '@/components/ChineseStrokeTable/ChineseStrokeTable.vue'
import EnglishWordTable from '@/components/EnglishWordTable/EnglishWordTable.vue'
import EnglishParagraphTable from '@/components/EnglishParagraphTable.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import InfoBar from '@/components/InfoBar/InfoBar.vue'
import Text from '@/components/Text/Text.vue'
import DecompositionTable from '@/components/DecompositionTable/DecompositionTable.vue'
import DecompositionSubtractionTable from '@/components/DecompositionSubtractionTable/DecompositionSubtractionTable.vue'
import AdditionTable from '@/components/additionTable/additionTable.vue'
import { Modal, Input, Textarea } from 'ant-design-vue'
import { useContentModal } from '@/hooks/useContentModal.js'
import InputContent from '@/views/HomeView/InputContent.vue'
import InputPinyinContent from '@/views/HomeView/InputPinyinContent.vue'
import HanZi from '@/views/HomeView/HanZi.vue'
import Math from '@/views/HomeView/Math.vue'
import Export from '@/views/HomeView/Export.vue'
import PinYinLine from '@/components/Icon/PinYinLine.vue'
import TestLine from '@/views/HomeView/TestLine.vue'
import Font from '@/views/HomeView/Font.vue'
import TestText from './TextText.vue'
import Conversion from '@/views/HomeView/Conversion.vue'
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
const width = ref(716)
// setInterval(() => {
//   width.value -= 20
// }, 1000)
const val = ref('a\nb\nc')
</script>

<template>
  <div class="h-full w-full" style="height: 100vh">
    <!--    <Conversion/>-->
    <!--    <TestText />-->
    <Font />
    <!--    <TestLine/>-->
    <!--        <Export />-->
    <!--        <HanZi/>-->
    <!--    <Math />-->
    <!--    {{ val }}-->
    <!--    <InputContent v-model:value="val"/>-->
    <!--    <InputPinyinContent v-model:value="val" />-->
    <!--            <PinyinTable-->
    <!--              :content="['a', 'b']"-->
    <!--                  :unfilled-rows="2"-->
    <!--                  line-spacing="10"-->
    <!--                  :filled-number="2"-->
    <!--                  :unfilled-number="8"-->
    <!--                  filled-color="red"-->
    <!--                  unfilled-color="blue"-->
    <!--                  letter-spacing="40"-->
    <!--                  line-height="140"-->
    <!--                  font-size="24"-->
    <!--                  height="15"-->
    <!--                  :outer-line="{stroke: '#ff0000', strokeWidth: '5', strokeDasharray: '3'}"-->
    <!--                  :inner-line="{stroke: '#6df707', strokeWidth: '5', strokeDasharray: '1'}"-->
    <!--                  :split-line="{stroke: '#bd0fdb', strokeWidth: '5', strokeDasharray: 4}"-->
    <!--            />-->

    <!--            <ChineseTable-->
    <!--              :content="['中', '，', '', '国']"-->
    <!--              :chinese-size="10"-->
    <!--              :pinyin-height="8"-->
    <!--              :unfilled-rows="2"-->
    <!--              :unfilled-number="2"-->
    <!--              :show-pinyin="true"-->
    <!--              :show-chinese-stroke="true"-->
    <!--              :line-spacing="10"-->
    <!--              :chinese-stroke-size="6"-->
    <!--            />-->

    <!--            <ChineseWordsTable-->
    <!--              :content="['中国', '美国']"-->
    <!--              :chinese-size="10"-->
    <!--              :unfilled-number="2"-->
    <!--              :pinyin-height="8"-->
    <!--              :unfilled-rows="2"-->
    <!--              :show-pinyin="true"-->
    <!--              :line-spacing="10"-->
    <!--            />-->
    <!--    <ChineseParagraphTable-->
    <!--      :content="['中国', '日本']"-->
    <!--      :chinese-size="10"-->
    <!--      :unfilled-number="1"-->
    <!--      :pinyin-height="8"-->
    <!--      :unfilled-rows="0"-->
    <!--      :show-pinyin="true"-->
    <!--      :line-spacing="10"-->
    <!--    />-->

    <!--    <ChineseStrokeTable-->
    <!--      :content="['中']"-->
    <!--      :chinese-size="10"-->
    <!--      :pinyin-height="8"-->
    <!--      :unfilled-rows="0"-->
    <!--      :unfilled-number="2"-->
    <!--      :show-pinyin="true"-->
    <!--      :show-chinese-stroke="false"-->
    <!--      :line-spacing="10"-->
    <!--      :chinese-stroke-size="10"-->
    <!--      :scale="80"-->
    <!--    />-->

    <!--            <EnglishWordTable-->
    <!--              :content="['One:一', 'Two:二', 'Three:三', 'Four:四']"-->
    <!--              :show-phonetic="true"-->
    <!--              :show-chinese="true"-->
    <!--              :margin="1"-->
    <!--              :height="10"-->
    <!--              :unfilled-rows="1"-->
    <!--              :filled-number="5"-->
    <!--              :unfilled-number="2"-->
    <!--              :line-spacing="8"-->
    <!--            />-->

    <!--    <EnglishParagraphTable-->
    <!--      :content="['How are you', 'I am fine']"-->
    <!--      :unfilled-rows="2"-->
    <!--      :unfilled-number="2"-->
    <!--      :line-spacing="10"-->
    <!--      :filled-number="2"-->
    <!--      font-size="24"-->
    <!--      height="10"-->
    <!--      filled-color="rgb(255,0,0)"-->
    <!--      unfilled-color="rgb(0,255,0)"-->
    <!--    />-->

    <!--    <vue-draggable-resizable :parent="true">-->
    <!--      <div class="w-full h-full overflow-hidden flex">-->
    <!--        <InfoBar-->
    <!--          :info="['班级', '姓名', '日期', '用时', '成绩', '学号', '身份证']"-->
    <!--          direction="horizontal"-->
    <!--          :sealing-line="{ show: true, invisible: false }"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </vue-draggable-resizable>-->

    <!--    <vue-draggable-resizable :parent="true">-->
    <!--      <div class="w-full h-full overflow-hidden flex">-->
    <!--        <Text-->
    <!--          type="content"-->
    <!--          text="大标题"-->
    <!--          font-size="24"-->
    <!--          font-weight="bold"-->
    <!--          font-style="normal"-->
    <!--          text-decoration="none"-->
    <!--          text-align="center"-->
    <!--          color="#000000ff"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </vue-draggable-resizable>-->
    <!--    <vue-draggable-resizable :parent="true">-->
    <!--      <div class="w-full h-full overflow-hidden flex">-->
    <!--        <Text-->
    <!--          type="h1"-->
    <!--          text="标题 1"-->
    <!--          font-size="20"-->
    <!--          font-weight="bold"-->
    <!--          font-style="normal"-->
    <!--          text-decoration="none"-->
    <!--          text-align="left"-->
    <!--          color="#000000ff"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </vue-draggable-resizable>-->
    <!--    <vue-draggable-resizable :parent="true">-->
    <!--      <div class="w-full h-full overflow-hidden flex">-->
    <!--        <Text-->
    <!--          type="h2"-->
    <!--          text="标题2"-->
    <!--          font-size="18"-->
    <!--          font-weight="bold"-->
    <!--          font-style="normal"-->
    <!--          text-decoration="none"-->
    <!--          text-align="left"-->
    <!--          color="#000000ff"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </vue-draggable-resizable>-->
    <!--    <vue-draggable-resizable :parent="true">-->
    <!--      <div class="w-full h-full overflow-hidden flex">-->
    <!--            <Text-->
    <!--              type="h3"-->
    <!--              text="标题3"-->
    <!--              font-size="16"-->
    <!--              font-weight="bold"-->
    <!--              font-style="normal"-->
    <!--              text-decoration="none"-->
    <!--              text-align="left"-->
    <!--              color="#000000ff"-->
    <!--            />-->
    <!--      </div>-->
    <!--    </vue-draggable-resizable>-->
    <!--    <vue-draggable-resizable :parent="true">-->
    <!--      <div class="w-full h-full overflow-hidden flex">-->
    <!--        <Text-->
    <!--          type="content"-->
    <!--          text="正文"-->
    <!--          font-size="14"-->
    <!--          font-weight="normal"-->
    <!--          font-style="normal"-->
    <!--          text-decoration="none"-->
    <!--          text-align="left"-->
    <!--          color="#000000ff"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </vue-draggable-resizable>-->

    <!--        <vue-draggable-resizable :parent="true">-->
    <!--          <div class="w-full h-full overflow-hidden flex">-->
    <!--            <DecompositionTable :show-answer="false"/>-->
    <!--          </div>-->
    <!--        </vue-draggable-resizable>-->

    <!--    <vue-draggable-resizable :parent="true">-->
    <!--      <div class="w-full h-full overflow-hidden flex">-->
    <!--        <DecompositionSubtractionTable :show-answer="true" />-->
    <!--      </div>-->
    <!--    </vue-draggable-resizable>-->

    <!--    <vue-draggable-resizable :parent="true" :resizeable="false" :draggable="false" width="auto">-->
    <!--      <div class="w-full h-full overflow-hidden flex">-->
    <!--        <AdditionTable :show-answer="true" />-->
    <!--      </div>-->
    <!--    </vue-draggable-resizable>-->
  </div>
</template>
