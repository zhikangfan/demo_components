export default {
  text: String,
  height: {
    type: Number,
    default: 30,
  },
  fontSize: {
    type: Number,
    default: 16,
  },
  fontFamily: {
    type: String,
    default: 'Yuanti SC',
  },
  color: {
    type: String,
    default: 'rgb(0, 0, 0)',
  },
  lineHeight: {
    type: Number,
    default: 170,
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
}
