<template>
  <div
    :class="[
      'h-full',
      'w-full',
      'flex',
      'flex-col',
      'justify-center',
      'bg-white',
      'overflow-hidden',
      'outline-1',
      props.id === currentSelectWidget
        ? 'outline-[#2FB36D]'
        : 'cursor-grab outline-white transition-shadow hover:shadow-lg hover:outline-1 hover:outline-zinc-300 hover:outline-dashed active:cursor-grabbing',
    ]"
    type="edit"
    @click.stop="() => props?.click?.()"
  >
    <h1 v-if="props.type === 'h1'" class="whitespace-pre-wrap" :style="style">
      {{ props.text }}
    </h1>
    <h2 v-else-if="props.type === 'h2'" class="whitespace-pre-wrap" :style="style">
      {{ props.text }}
    </h2>
    <h3 v-else-if="props.type === 'h3'" class="whitespace-pre-wrap" :style="style">
      {{ props.text }}
    </h3>
    <div v-else class="whitespace-pre-wrap" :style="style">
      {{ props.text }}
    </div>
    <!--    <textarea-->
    <!--      class="w-full block resize-none! border-none outline-none"-->
    <!--      rows="1"-->
    <!--      :style="style"-->
    <!--      :value="props.text"-->
    <!--    ></textarea>-->
  </div>
</template>
<script setup>
import { defineProps, computed, ref, defineEmits } from 'vue'
import { currentSelectWidget } from '@/hooks/useRefData.js'
const props = defineProps({
  id: {
    type: String,
  },
  type: {
    type: String,
    default: 'content', //  其它值：h1, h2, h3, content
  },
  text: {
    type: String,
    default: '',
  },
  fontFamily: {
    type: String,
    default: '',
  },
  fontSize: {
    type: Number,
    default: 22,
  },
  color: {
    type: String,
    default: '#000000ff',
  },
  fontWeight: {
    type: String,
    default: 'normal',
  },
  fontStyle: {
    type: String,
    default: 'normal',
  },
  textDecoration: {
    type: String,
    default: 'none',
  },
  textAlign: {
    type: String,
    default: 'left',
  },
  click: {
    type: Function,
    default: () => {},
  },
})
const style = computed(() => {
  // let height = {}
  // if (props.type === 'content') {
  //   height = {
  //     height: Math.ceil(props.fontSize * 1.5) + 'px',
  //   }
  // }
  return {
    fontSize: `${props.fontSize}px`,
    fontWeight: `${props.fontWeight}`,
    fontStyle: props.fontStyle,
    textDecoration: props.textDecoration,
    textAlign: props.textAlign,
    color: props.color,
    // ...height,
  }
})
</script>
