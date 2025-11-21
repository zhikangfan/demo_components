import PinyinRowProps from '@/components/PinyinRow/props.js'

export default {
  ...PinyinRowProps,
  showChinese: {
    type: Boolean,
    default: false,
  },
  showPhonetic: {
    type: Boolean,
    default: false,
  },
  margin: {
    type: Number,
    default: 1,
  },
  phonetic: {
    type: String,
  },
  translation: {
    type: String,
  },
  phonetics: {
    type: Array,
    default: () => [],
  },
}
