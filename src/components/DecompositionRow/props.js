export default {
  first: {
    type: Number,
    default: 0,
  },
  second: {
    type: Number,
    default: 0,
  },
  answer: {
    type: Number,
    default: 0,
  },
  decomposition: {
    type: Object,
    default() {
      return {
        first: 0,
        second: 0,
      }
    },
  },
  answerColor: {
    type: String,
    default: '#ff0000ff',
  },
  showAnswer: {
    type: Boolean,
    default: false,
  },
}
