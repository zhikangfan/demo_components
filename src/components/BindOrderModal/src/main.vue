<template>
  <el-dialog
    class="messageDialogBox messageDialogContainer"
    v-model="visible"
    width="400px"
    :append-to-body="true"
    :show-close="true"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="false"
    :destroy-on-close="true"
    @closed="afterClose"
  >
    <div class="bindDialog">
      <div class="titleBox">
        <span class="title">绑定订单号</span>
        <el-icon class="closeIcon" @click="handleClose"><Close /></el-icon>
      </div>
      <div class="content">
        <div class="contentText">绑定后可使用微信扫码登录</div>
        <el-form ref="form">
          <el-form-item prop="orderId">
            <el-input
              v-model="form.orderId"
              autocomplete="off"
              placeholder="请输入交易订单号(长)"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="btnGroups">
        <button class="rightBtn btn" @click="onClickBind">绑定</button>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { bindOrder } from '@/api'
import router from '@/router'
import { ref } from 'vue'
import { useUserStore } from '@/stores/index.js'
import { Close } from '@element-plus/icons-vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  onClose: {
    type: Function,
    default: () => {},
  },
  afterClose: {
    type: Function,
    default: () => {},
  },
  onBindSuccess: {
    type: Function,
    default: () => {},
  },
  onBindFail: {
    type: Function,
    default: () => {},
  },
})
const userStore = useUserStore()
const visible = ref(props.visible)
const form = ref({
  orderId: '',
})

const hide = () => {
  visible.value = false
}
const afterClose = () => {
  props.afterClose?.()
}
const handleClose = () => {
  hide()
  props.onClose?.()
}
const checkOrderId = () => {
  if (form.value.orderId.trim().length === 0) {
    ElMessage.error('请输入订单号！')
    return false
  }
  return true
}
const onClickBind = async () => {
  if (checkOrderId()) {
    let res = await bindOrder(form.value.orderId)
    if (res.data.status === 0) {
      ElMessage.success('绑定成功！')
      handleClose()
      props.onBindSuccess?.()
      await userStore.updateUserInfo()
      await router.push('/')
    } else {
      if (res.data.status === 400) {
        ElMessage.error('订单号错误！')
      } else if (res.data.status === 2005) {
        ElMessage.error('该订单号已被使用！')
      } else if (res.data.status === 2002) {
        ElMessage.error('该账号已是VIP！')
      } else if (res.data.status === 2001) {
        ElMessage.error('请退出当前游客登录，使用微信扫码登录再进行绑定操作！')
      } else if (res.data.status === 2006) {
        ElMessage.error('订单号错误！')
      } else {
        ElMessage.error('绑定失败！')
      }
      props.onBindFail?.(res)
    }
  }
}
</script>
<style scoped lang="less">
@import url('./main.less');
</style>
