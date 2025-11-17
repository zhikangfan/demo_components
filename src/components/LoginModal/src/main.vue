<template>
  <el-dialog
    class="loginBox loginContainer"
    v-model="visible"
    width="780px"
    :append-to-body="true"
    :show-close="false"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="false"
    @closed="handleClose"
    :destroy-on-close="true"
  >
    <div class="loginMain">
      <el-icon class="closeIcon" @click="handleClickClose"><Close /></el-icon>
      <div class="mainLeft"></div>
      <div class="mainRight" v-if="type === 0">
        <div class="rightTitle">
          <span class="wxIcon"></span>
          微信扫码登录注册
        </div>
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
        <p class="tips">微信扫一扫关注公众号登录，1步极速注册登录</p>
        <div class="btnGroups">
          <div class="changeBtn visitorLoginBtn" @click="onClickVisitorLogin">
            游客一键登录
            <img
              src="https://cdn1.ruanqing.com/img_geshicn/img/visitor_ico.svg"
              alt=""
              class="icon"
            />
          </div>
          <div @click="changeLoginType(1)" class="changeBtn changePhoneBtn">手机号登录</div>
        </div>
      </div>
      <div class="mainRight loginPhone" v-if="type === 1">
        <div class="rightTitle">手机号登录注册</div>
        <el-form :model="ruleForm" ref="form" @submit.native.prevent class="formBox">
          <el-form-item prop="phoneNumber">
            <div class="modal_item">
              <el-input
                v-model="ruleForm.phoneNumber"
                autocomplete="off"
                placeholder="请输入手机号码"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="code">
            <div class="code_item">
              <el-input
                v-model="ruleForm.code"
                autocomplete="off"
                placeholder="请输入短信中的验证码"
              ></el-input>
              <button
                type="button"
                :class="{ getCodeBtn: true, disabled: isCountDown }"
                :disabled="isCountDown"
                @click="getCode"
              >
                {{ btnTxt }}
              </button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              @click="handleLoginByPhoneNumber"
              class="loginBtn"
              >登录/注册</el-button
            >
          </el-form-item>
        </el-form>
        <div class="btnGroups">
          <div class="changeBtn visitorLoginBtn" @click="onClickVisitorLogin">
            游客一键登录
            <img
              src="https://cdn1.ruanqing.com/img_geshicn/img/visitor_ico.svg"
              alt=""
              class="icon"
            />
          </div>
          <div @click="changeLoginType(0)" class="changeBtn">微信登录</div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, computed } from 'vue'
import {
  checkPhoneNumberLoginStatus,
  getLoginQrCode,
  getLoginStatus,
  getMobileCode,
  trackLogin,
  visitorLogin,
} from '@/api/index.js'
import { Close } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/index.js'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  afterClose: {
    type: Function,
    default: () => {},
  },
  onCancel: {
    type: Function,
    default: () => {},
  },
  onSuccess: {
    type: Function,
    default: () => {},
  },
  onLoginFail: {
    type: Function,
    default: () => {},
  },
})
let visible = ref(props.visible)
let isLoading = ref(false)
const QR_CODE_STATUS = {
  SUCCESS: 'success',
  FAIL: 'fail',
  EXPIRE: 'expire',
}
const qrCodeStatus = ref(QR_CODE_STATUS.PENDING)
const loginQrCodeUrl = ref('')
const checkLoginStatusTimer = ref(null)
const type = ref(0) // 0: 微信登录 1: 手机号登录
const timer = ref(null)
const isCountDown = ref(false)
const seconds = ref(60)
const ruleForm = ref({
  phoneNumber: '',
  code: '',
})
const userStore = useUserStore()
const btnTxt = computed(() => {
  return isCountDown.value ? seconds.value + 'S后获取' : '获取验证码'
})
const handleGetLoginQrCode = async () => {
  isLoading.value = true
  try {
    let res = await getLoginQrCode()
    if (res.data.status === 0) {
      let { ticket, expire_seconds } = res.data.data
      if (ticket) {
        let src = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`
        let startTime = new Date().getTime()
        // 二维码获取成功
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

const handleClickClose = () => {
  props.onCancel?.()
  hide()
}
const handleClose = () => {
  props.afterClose?.()
  clearTimeout(checkLoginStatusTimer.value)
}
const hide = () => {
  visible.value = false
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
    let r = await getLoginStatus(ticket)
    if (r.data.status === 0) {
      userStore.setUserInfo(r.data.data)
      trackLogin()
      ElMessage({
        type: 'success',
        message: '登录成功！',
      })

      clearTimeout(checkLoginStatusTimer.value)
      localStorage.setItem('open_c', '0')
      props.onSuccess?.()
      hide()
    } else {
      loopCheckLoginStatus(ticket, expire_seconds, startTime)
    }
  }, 1500)
}
const onRefreshQrCode = async () => {
  await handleGetLoginQrCode()
}
const validatePhoneNumber = (str) => {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(str)
}
const checkPhoneNumber = () => {
  if (ruleForm.value.phoneNumber.trim().length === 0) {
    ElMessage.error('请输入手机号！')
    return false
  }
  let checkStatus = validatePhoneNumber(ruleForm.value.phoneNumber.trim())
  if (!checkStatus) {
    ElMessage.error('请输入正确格式的手机号！')
    return false
  }
  return true
}
const checkCode = () => {
  if (ruleForm.value.code.trim().length === 0) {
    ElMessage.error('请输入验证码！')
    return false
  }
  return true
}
const getCode = async () => {
  if (!isCountDown.value) {
    // TODO 校验手机号
    let flag = checkPhoneNumber()
    if (!flag) {
      return
    }

    seconds.value = 60
    isCountDown.value = true
    timer.value = setInterval(() => {
      if (seconds.value <= 0) {
        clearInterval(timer.value)
        seconds.value = 0
        isCountDown.value = false
        return
      }
      seconds.value = seconds.value - 1
    }, 1000)

    let res = await getMobileCode(ruleForm.value.phoneNumber.trim())
    if (res.data.status !== 0) {
      ElMessage.error('验证发送失败！')
      return
    }
  }
}
/**
 * 游客登录
 * @returns {Promise<void>}
 */
const onClickVisitorLogin = async () => {
  let r = await visitorLogin()
  if (r.data.status === 0) {
    userStore.setUserInfo(r.data.data)
    trackLogin()
    hide()
    ElMessage({
      type: 'success',
      message: '登录成功！',
    })

    clearTimeout(checkLoginStatusTimer.value)
    localStorage.setItem('open_c', '0')
    props.onSuccess?.()
  }
}
/**
 * 切换登录方式
 * @param type
 * @returns {Promise<void>}
 */
const changeLoginType = async (typeNumber) => {
  type.value = typeNumber
  if (typeNumber === 0) {
    clearTimeout(timer.value)
    // this.$refs.form.resetFields()
    isCountDown.value = false
    seconds.value = 60
    ruleForm.value = {
      phoneNumber: '',
      code: '',
    }
    await handleGetLoginQrCode()
  } else {
    clearTimeout(checkLoginStatusTimer.value)
  }
}
const handleLoginByPhoneNumber = async () => {
  if (checkPhoneNumber() && checkCode()) {
    let res = await checkPhoneNumberLoginStatus({
      smscode: ruleForm.value.code,
      mobile_phone: ruleForm.value.phoneNumber,
    })
    if (res.data.status === 0) {
      userStore.setUserInfo(res.data.data)
      trackLogin()
      hide()
      ElMessage({
        type: 'success',
        message: '登录成功！',
      })
      props.onSuccess?.()
    } else {
      if (res.data.status === 1001) {
        ElMessage({
          type: 'error',
          message: '验证码错误！',
        })
      } else {
        ElMessage({
          type: 'error',
          message: '登录失败！',
        })
      }
      props.onLoginFail?.()
    }
  }
}
handleGetLoginQrCode()
</script>
<style scoped lang="less">
@import url('./main.less');
</style>
