import ChineseProps from '@/components/Chinese/props.js'
import PinyinProps from '@/components/Pinyin/props.js'
const ChineseDefaultProps = {
  text: '',
  pinyin: '',
  polyphonic: [],
  type: 'riceLine',
  outerLine: {
    stroke: '#4c5662ff',
    strokeWidth: '1',
    strokeDasharray: '1',
  },
  innerLine: {
    stroke: '#4c5662ff',
    strokeWidth: '0.5',
    strokeDasharray: '0',
  },
  size: 38,
  fontFamily: `楷体_gb2312,
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
          TW-Kai`,
  lineHeight: 120,
  fontSize: 30,
  color: '#000000',
}
const PinyinDefaultProps = {
  text: '',
  height: 30,
  fontSize: 16,
  fontFamily: 'Yuanti SC',
  color: 'rgb(0, 0, 0)',
  lineHeight: 170,
  outerLine: {
    stroke: '#4c5662ff',
    strokeWidth: '1',
    strokeDasharray: '1',
  },
  innerLine: {
    stroke: '#4c5662ff',
    strokeWidth: '0.5',
    strokeDasharray: '0',
  },
}
export default {
  chineseProps: {
    type: Object,
    default() {
      return ChineseDefaultProps
    },
  },
  pinyinProps: {
    type: Object,
    default() {
      return PinyinDefaultProps
    },
  },
  showPinyin: {
    type: Boolean,
    default: false,
  },
  cellWidth: {
    type: Number,
    default: 0,
  },
}
