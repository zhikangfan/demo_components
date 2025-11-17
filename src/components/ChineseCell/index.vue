<template>
  <div :class="ss.chineseCell">
    <Pinyin
      :text="props.pinyin"
      :outer-line="props.outerLine"
      :inner-line="props.innerLine"
      v-if="showPinyin"
      style="
        height: 30px;
        font-size: 16px;
        font-family: Yuanti SC;
        color: rgb(0, 0, 0);
        line-height: 170%;
        letter-spacing: 0px;
      "
    />
    <Chinese
      style="
        width: 45px;
        height: 45px;
        font-size: 36px;
        font-family:
          楷体_gb2312,
          楷体,
          Kaiti SC,
          STKaiti,
          AR PL UKai CN,
          AR PL UKai HK,
          AR PL UKai TW,
          AR PL UKai TW MBE,
          AR PL KaitiM GB,
          KaiTi,
          KaiTi_GB2312,
          DFKai-SB,
          TW-Kai;
        color: rgb(0, 0, 0);
        line-height: 120%;
        margin-top: -1px;
        margin-left: 0px;
        margin-right: 0px;
      "
      :text="text"
      :type="props.type"
      :outer-line="props.outerLine"
      :inner-line="props.innerLine"
    />
  </div>
</template>
<script setup>
import ss from './index.module.less'
import Pinyin from '@/components/Pinyin/index.vue'
import Chinese from '@/components/Chinese/index.vue'
const props = defineProps({
  text: {
    type: String,
    required: false,
  },
  pinyin: {
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
  showPinyin: {
    type: Boolean,
    default: false,
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
</script>
