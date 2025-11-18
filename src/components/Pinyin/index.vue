<template>
  <div
    class="pinyin"
    :style="{
      height: `${props.height}px`,
      fontSize: `${props.fontSize}px`,
      fontFamily: `${props.fontFamily}`,
      color: `${props.color}`,
      lineHeight: `${props.lineHeight}%`,
      letterSpacing: `${props.letterSpacing}px`,
    }"
  >
    <div class="pinyinBg">
      <PinYinLine :outer-line="props.outerLine" :inner-line="props.innerLine" />
    </div>
    {{ props.text }}
  </div>
</template>
<script setup>
import PinYinLine from '@/components/Icon/PinYinLine.vue'
import PinyinProps from './props.js'
const props = defineProps(PinyinProps)
</script>
<style scoped lang="less">
.pinyin {
  position: relative;
  overflow: hidden;
  width: 100%;
  text-align: center;
  .pinyinBg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
