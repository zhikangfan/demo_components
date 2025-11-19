const props = {
  text: String,
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
  fontSize: {
    type: Number,
    default: 24,
  },
  letterSpacing: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 38, // 单位：mm
  },
  lineHeight: {
    type: Number,
    default: 140,
  },
  fontFamily: {
    type: String,
    default: 'Yuanti SC',
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
  splitLine: {
    type: Object,
    default() {
      return {
        stroke: 'rgb(200, 200, 200)',
        strokeWidth: '1',
        strokeDasharray: 0,
      }
    },
  },
}
export default props
