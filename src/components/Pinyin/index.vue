<template>
  <div class="pinyin">
    <div class="pinyinBg">
      <PinYinLine :outer-line="props.outerLine" :inner-line="props.innerLine"/>
    </div>
    {{props.text}}
  </div>
</template>
<script setup>
  const props = defineProps({
    text: String,
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
  })
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
