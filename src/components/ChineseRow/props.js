import ChineseCellProps from '@/components/ChineseCell/props.js'

export default {
  ...ChineseCellProps,
  showChineseStroke: {
    // 是否启用笔画
    type: Boolean,
    default: false,
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
}
