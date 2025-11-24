<template>
  <div class="p-1 relative group hover:bg-[#b9dccc]/20">
    <div class="relative h-40">
      <div class="flex items-center space-x-6 ml-8">
        <span class="relative text-center">{{ props.first }}</span
        ><span class="relative text-center">-</span
        ><span class="relative text-center">{{ props.second }}</span
        ><span>=</span>
        <span
          :class="['p-1', !props.showAnswer && 'border']"
          :style="props.showAnswer ? { color: props.answerColor } : {}"
          >{{ props.showAnswer ? props.answer : ' 　 ' }}</span
        >
      </div>
      <div class="mt-2">
        <div class="ml-6 space-x-6"><span>/</span><span>\</span></div>
        <div :class="['mt-4', 'space-x-6', 'flex', props.showAnswer ? 'ml-5' : 'ml-1']">
          <span
            :class="['p-1', !props.showAnswer && 'border']"
            :style="props.showAnswer ? { color: props.answerColor } : {}"
            >{{ props.showAnswer ? props.decomposition?.first : ' 　 ' }}</span
          >
          <span
            :class="['p-1', !props.showAnswer && 'border']"
            :style="props.showAnswer ? { color: props.answerColor } : {}"
            >{{ props.showAnswer ? props.decomposition?.second : ' 　 ' }}</span
          >
        </div>
      </div>
      <div class="absolute top-9 left-17 border-r border-b border-solid border-[#000] h-20 w-11">
        <div class="text-center mt-15">-</div>
        <div class="absolute left-0 bottom-0 w-4 h-4 border-l border-solid border-[#000]"></div>
        <div class="absolute left-0 right-0 -bottom-9 text-center flex items-center justify-center">
          <span
            :class="['p-1', !props.showAnswer && 'border']"
            :style="props.showAnswer ? { color: props.answerColor } : {}"
            >{{ props.showAnswer ? props.decomposition?.third : ' 　 ' }}</span
          >
        </div>
      </div>
    </div>
    <!---->
    <div
      class="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100"
      @click="() => emits('refresh')"
    >
      <div class="i-ri-refresh-line cursor-pointer text-[#2FB36D] hover:text-[#248A52]"></div>
      <!---->
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
import Props from './props.js'
const props = defineProps(Props)
const emits = defineEmits(['refresh'])
</script>
