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
        <span class="title">绑定微信</span>
        <el-icon class="closeIcon" @click="handleClose"><Close /></el-icon>
      </div>
      <div class="content">
        <div class="qrCodeWrapper">
          <div class="loadingBox" v-if="isLoading">
            <!--            <img src="@/assets/img/qr_code_loading.jpg" alt="" />-->
          </div>
          <div class="qrcodeContentBox" v-else>
            <img
              v-if="qrCodeStatus === QR_CODE_STATUS.SUCCESS"
              :src="loginQrCodeUrl"
              alt=""
              style="width: 100%"
            />
            <div class="qrCodeStatusBox" v-else>
              <div class="qrCodeStatusContent">
                <span class="refreshBtn" @click="onRefreshQrCode"></span>
                <span class="txt">{{
                  qrCodeStatus === QR_CODE_STATUS.EXPIRE ? '二维码已过期' : '获取失败'
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="tips">请使用微信扫描二维码登录</p>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { bindWechat, getLoginQrCode } from '@/api'
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'

const QR_CODE_STATUS = {
  SUCCESS: 'success',
  FAIL: 'fail',
  EXPIRE: 'expire',
}
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
const visible = ref(props.visible)
const qrCodeStatus = ref(QR_CODE_STATUS.PENDING)
const loginQrCodeUrl = ref('')
const isLoading = ref(false)
const checkLoginStatusTimer = ref(null)

const hide = () => {
  visible.value = false
}
const afterClose = () => {
  clearTimeout(checkLoginStatusTimer.value)
  props.afterClose?.()
}
const handleClose = () => {
  hide()
  props.onClose?.()
}
const loopCheckLoginStatus = (ticket, expire_seconds, startTime) => {
  clearTimeout(checkLoginStatusTimer.value)
  let currentTime = new Date().getTime()
  if ((currentTime - startTime) / 1000 > expire_seconds) {
    // TODO: 二维码已过期
    qrCodeStatus.value = QR_CODE_STATUS.EXPIRE
    return
  }
  checkLoginStatusTimer.value = setTimeout(async () => {
    let r = await bindWechat(ticket)
    if (r.data.status === 0) {
      props.onBindSuccess?.()
      clearTimeout(checkLoginStatusTimer.value)
    } else if (r.data.status === 1009) {
      props.onBindFail?.(r.data)
      clearTimeout(checkLoginStatusTimer.value)
      await handleGetLoginQrCode() // 重新获取二维码
    } else {
      loopCheckLoginStatus(ticket, expire_seconds, startTime)
    }
  }, 1500)
}
const handleGetLoginQrCode = async () => {
  isLoading.value = true
  try {
    let res = await getLoginQrCode()
    if (res.data.status === 0) {
      let { ticket, expire_seconds } = res.data.data
      if (ticket) {
        let src = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`
        let startTime = new Date().getTime()
        qrCodeStatus.value = QR_CODE_STATUS.SUCCESS
        loginQrCodeUrl.value = src
        loopCheckLoginStatus(ticket, expire_seconds, startTime)
      } else {
        // 获取二维码失败
        qrCodeStatus.value = QR_CODE_STATUS.FAIL
      }
    } else {
      // 获取二维码失败
      qrCodeStatus.value = QR_CODE_STATUS.FAIL
    }
  } catch (e) {
    qrCodeStatus.value = QR_CODE_STATUS.FAIL
  } finally {
    isLoading.value = false
  }
}
const onRefreshQrCode = async () => {
  await handleGetLoginQrCode()
}
handleGetLoginQrCode()
</script>
<style scoped lang="less">
@import url('./main.less');
</style>
