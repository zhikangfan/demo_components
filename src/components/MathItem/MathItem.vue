<template>
  <div class="group relative p-1 hover:bg-[#b9dccc]/20">
    <div class="flex items-center">
      <template v-for="(it, idx) in props.question" :key="idx">
        <span v-if="idx === props.question.length - 1">=</span>
        <span
          :class="it.type === 'answer' && !props.showAnswer ? ['p-1', shape] : ['p-0.5']"
          :style="props.showAnswer && it.type === 'answer' ? { color: props.answerColor } : {}"
        >
          {{
            props.showAnswer || it.type !== 'answer'
              ? it.value
              : props.shape === 'bracket'
                ? ' ( 　  　 ) '
                : '　 　'
          }}
        </span>
      </template>
    </div>
    <div
      class="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100"
      @click="() => emit('refresh')"
    >
      <div class="i-ri-refresh-line cursor-pointer text-[#2FB36D] hover:text-[#248A52]"></div>
      <!---->
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from 'vue'
const props = defineProps({
  shape: {
    // 方框样式
    type: String,
    default: 'square', // 值有：square, circle, underline, none, bracket
  },
  showAnswer: {
    type: Boolean,
    default: false,
  },
  answerColor: {
    type: String,
    default: '#ff0000ff',
  },
  question: {
    type: Array,
    default: () => [
      {
        type: 'number',
        value: 2,
      },
      {
        type: 'symbol',
        value: '+',
      },
      {
        type: 'number',
        value: 2,
      },
      {
        type: 'answer',
        value: 2,
      },
    ],
  },
})
const emit = defineEmits(['refresh'])

const shape = computed(() => {
  switch (props.shape) {
    case 'square':
      return 'border'
    case 'circle':
      return 'rounded-full'
    case 'underline':
      return 'border-b-1'
    default:
      return ''
  }
})
</script>
