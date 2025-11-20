<template>
  <div class="chineseRow" ref="containerRef">
    <div
      style="display: flex; align-items: center; margin-bottom: -1px"
      v-if="props.showChineseStroke"
    >
      <div
        :class="{ pinyinBox: true, normal: !props.chineseProps.text }"
        :style="{ width: cellWidth + 'px' }"
        v-if="props.showPinyin"
        @click="
          () => {
            props.chineseProps.text && handleOpen()
          }
        "
      >
        <Pinyin v-bind="props.pinyinProps" />
      </div>
      <div :class="ss.strokeBox">
        <svg
          viewBox="0 0 1024 1024"
          :width="props.chineseStrokeSize"
          :height="props.chineseStrokeSize"
          v-for="(stroke, idx) in props.chineseStrokes"
          :key="idx"
        >
          <g transform="scale(1, -1) translate(0, -900)">
            <path
              v-for="(path, pathIndex) in stroke.path"
              :key="pathIndex"
              :d="path"
              :fill="pathIndex < idx ? '#000000ff' : '#dd0000ff'"
            ></path>
          </g>
        </svg>
      </div>
    </div>
    <div style="display: flex; width: 100%; flex-wrap: nowrap">
      <ChineseCell
        v-for="(cell, idx) in cells"
        :key="idx"
        :style="{ marginLeft: `${margin}px`, marginRight: `${margin}px` }"
        v-bind="cell"
        @ok="(value) => handleOk(value, cell, idx)"
        @cancel="() => handleCancel(cell, idx)"
        @afterClose="() => handleAfterClose(cell, idx)"
      />
    </div>
    <PinyinEditorModal
      v-model:open="open"
      :pinyin="props.pinyinProps.text"
      :chinese="props.chineseProps.text"
      title="编辑"
      @ok="
        (value) => {
          open = false
          handleOk(value, cells[0], 0)
        }
      "
      @cancel="
        () => {
          open = false
          handleCancel(cells[0], 0)
        }
      "
      @afterClose="() => handleAfterClose(cells[0], 0)"
      cancelText="取消"
      okText="确定"
    />
  </div>
</template>
<script setup>
import { computed, ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import ss from '@/views/HomeView/index.module.less'
import Pinyin from '@/components/Pinyin/index.vue'
import ChineseCell from '@/components/ChineseCell/index.vue'
import ChineseRowProps from '@/components/ChineseRow/props.js'
import PinyinEditorModal from '@/components/PinyinEditorModal.vue'

const props = defineProps(ChineseRowProps)
const emit = defineEmits(['ok', 'cancel', 'afterClose'])
const resizeObserver = ref(null)
const containerRef = ref(null)
const containerWidth = ref(0)
const open = ref(false)
const margin = computed(() => {
  return props.spacing * 2
})

const handleOpen = () => {
  open.value = true
}
const handleOk = (value, cell, columnIndex) => {
  emit('ok', value, cell, columnIndex)
}
const handleCancel = (cell, columnIndex) => {
  emit('cancel', cell, columnIndex)
}
const handleAfterClose = (cell, columnIndex) => {
  emit('afterClose', cell, columnIndex)
}

// 计算单元格宽度
const cellWidth = computed(() => {
  return props.chineseProps.size + margin.value * 2
})
// 计算总的span数量
const totalCell = computed(() => {
  return Math.floor(containerWidth.value / cellWidth.value)
})
const cells = computed(() => {
  return new Array(totalCell.value).fill('').map((item, idx) => {
    return {
      canEdit: idx === 0 && props.chineseProps.text !== '',
      cellWidth: cellWidth.value,
      groupId: props.word.id,
      pinyinProps: {
        ...props.pinyinProps,
        text: idx < props.filledNumber + props.unfilledNumber ? props.pinyinProps.text : '',
        color: idx === 0 ? props.filledColor : props.unfilledColor,
      },
      chineseProps: {
        ...props.chineseProps,
        text: idx < props.filledNumber + props.unfilledNumber ? props.chineseProps.text : '',
        color: idx === 0 ? props.filledColor : props.unfilledColor,
      },
      showPinyin: !props.showChineseStroke && props.showPinyin,
    }
  })
})

// 初始化容器宽度
onMounted(() => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth

    // 使用 ResizeObserver 监听容器尺寸变化
    resizeObserver.value = new ResizeObserver((entries) => {
      for (let entry of entries) {
        containerWidth.value = entry.contentRect.width
      }
    })

    resizeObserver.value.observe(containerRef.value)
  }
})
onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
  }
})
</script>
<style scoped lang="less">
.chineseRow {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.pinyinBox {
  &:hover {
    background: #b9dccc;
    cursor: pointer;

    &.normal {
      background: transparent;
      cursor: initial;
    }
  }
}
</style>
