<template>
  <div
    :class="[
      'flex-1',
      'flex',
      'justify-between',
      'gap-4',
      props.direction === 'horizontal' ? 'flex-col' : 'flex-col-reverse',
    ]"
    type="edit"
    :style="{
      fontSize: `${props.fontSize}px`,
      writingMode: `${props.direction === 'horizontal' ? 'horizontal-tb' : 'vertical-rl'}`,
      textOrientation: 'sideways',
    }"
  >
    <div
      :class="[
        'flex',
        ' items-center',
        'justify-around',
        'gap-2',
        props.direction === 'vertical' && 'scale-[-1]',
        props.sealingLine.invisible && 'invisible',
      ]"
    >
      <div class="flex-1 flex items-end gap-1" v-for="(info, idx) in props.info" :key="idx">
        <div class="flex-shrink-0 transform">{{ info }}</div>
        <div
          :class="[
            'flex-1',
            'border-solid',
            ' border-black',
            'w-4',
            'h-4',
            props.direction === 'vertical' ? 'border-l' : 'border-b',
          ]"
        ></div>
      </div>
    </div>
    <div
      v-if="props.sealingLine?.show"
      :class="[
        'border-dashed',
        'border-black',
        'flex',
        'justify-around',
        'text-sm',
        props.direction === 'vertical' ? 'border-l' : 'border-b',
        props.direction === 'vertical' && 'scale-[-1]',
      ]"
    >
      <span>密</span><span>封</span><span>线</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  direction: {
    // 方向
    type: String,
    default: 'horizontal',
  },
  info: {
    // 展示信息
    type: Array,
    default: () => ['班级', '姓名', '日期', '用时', '成绩', '学号', '身份证'],
  },
  fontSize: {
    // 字体大小
    type: Number,
    default: 16,
  },
  sealingLine: {
    // 密封线
    type: Object,
    default: () => {
      return {
        show: false, // 是否显示
        invisible: false, // 背面展示
      }
    },
  },
})
</script>
