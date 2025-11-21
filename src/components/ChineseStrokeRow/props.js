import ChineseCellProps from '@/components/ChineseCell/props.js'

export default {
  ...ChineseCellProps,
  word: {
    type: Object,
    default() {
      return {
        word: '',
        info: {},
        pinyin: '',
        chinese: '',
        strokes: [],
        groupId: '',
      }
    },
  },
  spacing: {
    type: Number,
    default: 0,
  },
  filledNumber: {
    type: Number,
    default: 1,
  },
  unfilledNumber: {
    type: Number,
    default: 0,
  },
  filledColor: {
    type: String,
    default: '#000',
  },
  unfilledColor: {
    type: String,
    default: '#cbcfd6',
  },
  canEditRow: {
    type: Boolean,
    default: false,
  },
  chineseStrokeSize: {
    type: Number,
    default: 32,
  },
  scale: {
    type: Number,
    default: 1,
  },
  strokeColor: {
    // 笔画颜色
    type: String,
    default: '#cbcfd6ff',
  },
  currentStrokeColor: {
    // 当前笔画颜色
    type: String,
    default: 'red',
  },
}
