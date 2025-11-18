export default {
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
    default: 'riceLine',
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
  size: { // 格子大小
    type: Number,
    default: 38
  },
  fontFamily: {
    type: String,
    default: `楷体_gb2312,
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
          TW-Kai`
  },
  lineHeight: {
    type: Number,
    default: 120
  },
  fontSize: {
    type: Number,
    default: 30
  },
  color: {
    type: String,
    default: '#000000'
  }
}
