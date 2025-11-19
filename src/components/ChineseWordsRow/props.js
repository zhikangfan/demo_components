import ChineseCellProps from '@/components/ChineseCell/props.js'

export default {
  ...ChineseCellProps,
  words: {
    type: String,
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
