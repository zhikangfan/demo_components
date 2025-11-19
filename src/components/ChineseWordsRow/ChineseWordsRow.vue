<template>
  <div class="chineseWordsRow" ref="containerRef">
    <div style="display: flex; width: 100%; flex-wrap: nowrap">
      <ChineseCell
        v-for="(cell, idx) in cells"
        :key="idx"
        :show-pinyin="props.showPinyin"
        :style="{ marginLeft: `${margin}px`, marginRight: `${margin}px` }"
        :chinese-props="cell.chineseProps"
        :pinyin-props="cell.pinyinProps"
        :cell-width="cellWidth"
      />
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import ChineseCell from '@/components/ChineseCell/index.vue'
import chineseWordsRowProps from '@/components/chineseWordsRow/props.js'
import { pinyin } from 'pinyin-pro'

const props = defineProps(chineseWordsRowProps)
const resizeObserver = ref(null)
const containerRef = ref(null)
const containerWidth = ref(0)

const margin = computed(() => {
  return props.spacing * 2
})
// 计算总的span数量
const totalCell = computed(() => {
  return Math.floor(containerWidth.value / cellWidth.value)
})

const cells = computed(() => {
  const totalCellArr = new Array(totalCell.value).fill('')
  let filledTextArr = [] // 填充单元格
  let unfilledTextArr = [] // 未填充单元格
  const allPinyin = pinyin(props.words, { type: 'all' })
  for (let i = 0; i < props.filledNumber; i++) {
    filledTextArr = [...filledTextArr, ...allPinyin]
  }
  for (let i = 0; i < props.unfilledNumber; i++) {
    unfilledTextArr = [...unfilledTextArr, ...allPinyin]
  }
  const allText = [...filledTextArr, ...unfilledTextArr]
  return totalCellArr.map((text, idx) => {
    return {
      pinyinProps: {
        ...props.pinyinProps,
        text: allText[idx]?.pinyin || '',
        color: idx < filledTextArr.length ? props.filledColor : props.unfilledColor,
      },
      chineseProps: {
        ...props.chineseProps,
        // text: allText[idx]?.origin,
        color: idx < filledTextArr.length ? props.filledColor : props.unfilledColor,
        text: '<svg viewBox="0 0 1024 1024" width="38" height="38"><g transform="scale(1, -1) scale(0.9) translate(56.88888888888889, -1000)"><path d="M 350 571 Q 380 593 449 614 Q 465 615 468 623 Q 471 633 458 643 Q 439 656 396 668 Q 381 674 370 672 Q 363 668 363 657 Q 364 621 200 527 Q 196 518 201 516 Q 213 516 290 546 Q 303 550 316 556 L 350 571 Z" fill="#cbcfd6ff"></path><path d="M 584 466 Q 666 485 734 497 Q 746 496 754 511 Q 755 524 729 533 Q 693 554 622 527 Q 598 520 575 511 L 537 499 Q 518 495 500 488 Q 442 472 386 457 L 337 446 Q 327 446 179 416 Q 148 409 173 392 Q 212 365 241 376 Q 287 389 339 404 L 387 416 Q 460 438 545 457 L 584 466 Z" fill="#cbcfd6ff"></path><path d="M 386 457 Q 387 493 398 517 Q 405 535 390 548 Q 371 564 350 571 C 323 583 303 583 316 556 Q 315 556 316 555 Q 338 519 337 478 Q 337 462 337 446 L 339 404 Q 340 343 339 289 L 338 241 Q 337 180 334 133 Q 333 115 323 109 Q 317 105 250 119 Q 238 122 239 114 Q 240 108 249 100 Q 309 42 328 6 Q 341 -10 357 3 Q 390 36 390 126 Q 387 169 387 265 L 387 306 Q 387 355 387 416 L 386 457 Z" fill="#cbcfd6ff"></path><path d="M 339 289 Q 254 261 161 229 Q 139 222 101 221 Q 86 220 85 207 Q 84 192 94 184 Q 119 166 157 147 Q 169 144 182 154 Q 239 199 338 241 L 387 265 Q 477 314 484 318 Q 499 327 498 337 Q 492 343 479 340 Q 434 324 387 306 L 339 289 Z" fill="#cbcfd6ff"></path><path d="M 635 195 Q 690 75 797 -14 Q 876 -62 898 -47 Q 920 -37 914 3 Q 905 34 899 152 Q 900 174 894 178 Q 890 179 884 160 Q 857 75 838 60 Q 823 56 785 88 Q 710 155 670 226 L 644 279 Q 599 381 584 466 L 575 511 Q 547 659 576 752 Q 586 779 543 805 Q 509 827 489 825 Q 470 824 479 795 Q 503 752 507 707 Q 517 601 537 499 L 545 457 Q 573 334 612 245 L 635 195 Z" fill="#cbcfd6ff"></path><path d="M 612 245 Q 558 197 452 138 Q 442 132 448 128 Q 455 124 468 126 Q 523 135 574 160 Q 608 175 635 195 L 670 226 Q 706 260 747 317 Q 762 336 778 354 Q 788 361 785 374 Q 781 386 753 410 Q 734 428 723 428 Q 708 427 707 411 Q 701 354 644 279 L 612 245 Z" fill="#cbcfd6ff"></path><path d="M 687 669 Q 718 648 754 623 Q 770 613 786 615 Q 798 618 801 632 Q 802 648 789 678 Q 780 697 746 708 Q 665 726 651 715 Q 647 711 651 697 Q 655 687 687 669 Z" fill="#dd000066"></path></g></svg>',
      },
    }
  })
})

// 计算单元格宽度
const cellWidth = computed(() => {
  return props.chineseProps.size + margin.value * 2
})
// 初始化容器宽度
onMounted(() => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth

    // 使用 ResizeObserver 监听容器尺寸变化
    resizeObserver.value = new ResizeObserver((entries) => {
      console.log(entries)
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
.chineseWordsRow {
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
