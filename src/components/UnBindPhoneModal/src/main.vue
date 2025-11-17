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
        <span class="title">更换手机号</span>
        <el-icon class="closeIcon" @click="handleClose"><Close /></el-icon>
      </div>
      <div class="content">
        <div class="contentText">更换后即可使用该手机号登录</div>
        <el-form :model="ruleForm" ref="form" @submit.native.prevent>
          <el-form-item prop="phoneNumber">
            <div class="modal_item">
              <div class="dropBox">+86</div>
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
        </el-form>
      </div>
      <div slot="footer" class="btnGroups">
        <button class="rightBtn btn" @click="onClickBind">确认更换</button>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { getUnbindCode, unbindPhoneNumber } from '@/api'
// import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
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
  onUnBindSuccess: {
    type: Function,
    default: () => {},
  },
  onUnBindFail: {
    type: Function,
    default: () => {},
  },
})
const visible = ref(props.visible)
const timer = ref(null)
const isCountDown = ref(false)
const seconds = ref(60)
const ruleForm = ref({
  phoneNumber: '',
  code: '',
})
const btnTxt = computed(() => {
  return isCountDown.value ? `${seconds.value}S后获取` : '获取验证码'
})

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

    let res = await getUnbindCode(ruleForm.value.phoneNumber.trim())
    if (res.data.status !== 0) {
      let txt = ''
      switch (res.data.status) {
        case 1011:
          txt = '请更换新的手机号！'
          break
        default:
          txt = '验证码发送失败！'
          break
      }
      ElMessage.error(txt)

      return
    }
  }
}
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
const onClickBind = async () => {
  if (checkPhoneNumber() && checkCode()) {
    let res = await unbindPhoneNumber({
      mobile_phone: ruleForm.value.phoneNumber,
      code: ruleForm.value.code,
    })
    switch (res.data.status) {
      case 0:
        props.onUnBindSuccess?.()
        hide()
        break
      default:
        props.onUnBindFail?.(res)
        break
    }
  }
}
</script>
<style scoped lang="less">
@import url('./main.less');
</style>
