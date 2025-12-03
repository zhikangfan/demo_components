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
      mergeConfig.id === currentSelectWidgetId
        ? 'outline-[#2FB36D]'
        : 'cursor-grab outline-white transition-shadow hover:shadow-lg hover:outline-1 hover:outline-zinc-300 hover:outline-dashed active:cursor-grabbing',
    ]"
    type="edit"
    @click.stop="handleClick"
  >
    <h1 v-if="props.type === 'h1'" class="whitespace-pre-wrap" :style="style">
      {{ mergeConfig.text }}
    </h1>
    <h2 v-else-if="props.type === 'h2'" class="whitespace-pre-wrap" :style="style">
      {{ mergeConfig.text }}
    </h2>
    <h3 v-else-if="props.type === 'h3'" class="whitespace-pre-wrap" :style="style">
      {{ mergeConfig.text }}
    </h3>
    <div v-else class="whitespace-pre-wrap" :style="style">
      {{ mergeConfig.text }}
    </div>
    <!--    <textarea-->
    <!--      class="w-full block resize-none! border-none outline-none"-->
    <!--      rows="1"-->
    <!--      :style="style"-->
    <!--      :value="props.text"-->
    <!--    ></textarea>-->
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed, ref, defineEmits, watchEffect, reactive } from 'vue'
import { currentSelectWidgetId, paper } from '@/hooks/useRefData.js'
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
  },
})

const mergeConfig = ref({ ...props })
// 监听纸张变化，更新纸张设置
watch(
  paper,
  (newValue) => {
    const widget = newValue.widgets.find((it) => it.id === props?.id)
    mergeConfig.value = Object.assign({}, props, widget?.config)
  },
  {
    deep: true,
  },
)

const style = computed(() => {
  const config = mergeConfig.value
  return {
    fontSize: `${config.fontSize}px`,
    // fontWeight: `${props.fontWeight}`,
    // fontStyle: props.fontStyle,
    // textDecoration: props.textDecoration,
    // textAlign: props.textAlign,
    // color: props.color,
    // ...height,
  }
})
const handleClick = () => {
  currentSelectWidgetId.value = props.id
}
</script>
