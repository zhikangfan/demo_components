<template>
  <el-dialog
    class="messageDialogBox messageDialogContainer"
    v-model="visible"
    width="384px"
    :append-to-body="true"
    :show-close="false"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="false"
    :destroy-on-close="true"
    @closed="afterClose"
  >
    <div class="messageDialog">
      <div class="titleBox">
        <span class="title" v-html="props.title"></span>
        <el-icon class="closeIcon" @click="handleClose"><Close /></el-icon>
      </div>
      <div class="content" v-html="props.content"></div>
      <div slot="footer" class="btnGroups" v-if="props.showLeft || props.showRight">
        <button class="leftBtn btn" @click="handleClickLeftBtn" v-if="props.showLeft">
          {{ props.leftBtnTxt }}
        </button>
        <button class="rightBtn btn" @click="handleClickRightBtn" v-if="props.showRight">
          {{ props.rightBtnTxt }}
        </button>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '温馨提示',
  },
  content: {
    type: String,
    default: '',
  },
  leftBtnTxt: {
    type: String,
    default: '取消',
  },
  rightBtnTxt: {
    type: String,
    default: '确定',
  },
  showLeft: {
    type: Boolean,
    default: true,
  },
  showRight: {
    type: Boolean,
    default: true,
  },
  onClickLeftBtn: {
    type: Function,
    default: () => {},
  },
  onClickRightBtn: {
    type: Function,
    default: () => {},
  },
  onClose: {
    type: Function,
    default: () => {},
  },
  afterClose: {
    type: Function,
    default: () => {},
  },
})
const visible = ref(props.visible)
const handleClose = () => {
  visible.value = false
  props.onClose?.()
}
const afterClose = () => {
  props.afterClose?.()
}
const handleClickLeftBtn = () => {
  visible.value = false
  props.onClickLeftBtn?.()
}
const handleClickRightBtn = () => {
  visible.value = false
  props.onClickRightBtn?.()
}
</script>
<style scoped lang="less">
@import url('./main.less');
</style>
