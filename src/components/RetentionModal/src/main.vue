<template>
  <el-dialog
    class="purchaseBox purchaseWrapper"
    :close-on-click-modal="false"
    v-model="visible"
    width="480px"
    :append-to-body="true"
    :show-close="false"
    :modal-append-to-body="false"
    :close-on-press-escape="false"
    :lock-scroll="false"
    @closed="handleClose"
    :destroy-on-close="true"
  >
    <div class="purchaseModalMain">
      <el-icon class="closeIcon" @click="onClickClose"><Close /></el-icon>
      <img src="./assets/img/retentionPopBg.png" alt="" class="popBg" />
      <div class="countDownBox">
        <span class="countDownTitle">优惠仅剩：</span>
        <div class="timeBox">
          <div class="time">
            <span>{{ formattedTime.hours }}</span>
          </div>
          <span class="semicolon">:</span>
          <div class="time">
            <span>{{ formattedTime.minutes }}</span>
          </div>
          <span class="semicolon">:</span>
          <div class="time">
            <span>{{ formattedTime.seconds }}</span>
          </div>
          <span class="semicolon">:</span>
          <div class="time">
            <span>{{ formattedTime.milliseconds }}</span>
          </div>
        </div>
      </div>
      <div class="contentBox">
        <div class="packageList">
          <div
            class="packageItem"
            @click="checkPurchase(item.id)"
            :class="{ packageItem: true, active: checkId === item.id }"
            v-for="item in packages"
            :key="item.id"
          >
            <div class="corner" v-if="item.corner">{{ item.corner }}</div>
            <div class="packageItemContainer">
              <div class="packageTitle">{{ item.title }}</div>
              <div class="priceBox">
                <div class="currentPrice">
                  ￥<span class="price_1">{{ item.unitPrice }}</span>
                </div>
                <div class="originPrice_1" v-if="item.originPrice">¥{{ item.originPrice }}</div>
              </div>
              <div class="packageDesc">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <span class="price">
        <span class="unit">¥</span>
        <span>{{ price }}</span>
      </span>

      <div class="payTitle">扫码立即开通</div>
      <div class="payChannelBox">
        <span class="wechat_icon"></span>
        <span class="ali_icon"></span>
        <span>扫码支付</span>
      </div>
      <div class="qrCodeBox">
        <img :src="qrCodeSrc" alt="" class="qrCodeImg" v-if="!loading" />
        <div class="loading" v-else>
          <img src="./assets/img/loading.png" alt="" class="loadingImg" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import QRCode from 'qrcode'
import { createOrder, getPayStatus, trackOrder } from '@/api'
import { retentionList, retentionList2 } from '@/config'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/index.js'
import { Close } from '@element-plus/icons-vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  onCancel: {
    type: Function,
    default: () => {},
  },
  afterClose: {
    type: Function,
    default: () => {},
  },
  onPaySuccess: {
    type: Function,
    default: () => {},
  },
  onPayFail: {
    type: Function,
    default: () => {},
  },
})
const userStore = useUserStore()

const visible = ref(props.visible)
const loading = ref(false)
const qrCodeSrc = ref('')
const price = ref(0)
const pollCount = ref(0) // 轮询次数
const payResultTimer = ref(null)
const timer = ref(null)
const checkId = ref('')
const startTime = ref(null)
const retentionListOne = ref(retentionList)
const retentionListTwo = ref(retentionList2)
const remainingTime = ref(3600000) // 1 hour in milliseconds
const beginTime = ref(new Date().getTime())
const expiredTime = ref(1 * 60 * 1000)
const packages = ref([])

const allCert = computed(() => userStore.allCert)
const isVip = computed(() => userStore.isVip)
const formattedTime = computed(() => {
  const hours = Math.floor(remainingTime.value / 3600000)
  const minutes = Math.floor((remainingTime.value % 3600000) / 60000)
  const seconds = Math.floor((remainingTime.value % 60000) / 1000)
  const milliseconds = Math.floor((remainingTime.value % 1000) / 10)
  return {
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    milliseconds: padMilliseconds(milliseconds),
  }
})

const getPackages = () => {
  let data = retentionListOne.value
  if (!isVip.value) {
    const count = localStorage.getItem('_APP_COUNT') ?? 1
    data = Number(count) > 1 ? data : retentionListTwo.value
    localStorage.setItem('_APP_COUNT', Number(count) + 1)
  }
  return data.filter((item) => item.level.includes(allCert.value?.vip))
}
/**
 * @description 转换二维码
 * @param path 路径信息
 * @returns {Promise<unknown>}
 */
const toQRCode = async (path) => {
  return QRCode.toDataURL(path)
}
/**
 * @description 轮询，获取支付状态
 * @param orderId 订单ID
 */
const lookup = (orderId) => {
  clearTimeout(payResultTimer.value)

  if (new Date().getTime() - beginTime.value >= expiredTime.value) {
    checkPurchase(checkId.value)
    return
  }

  payResultTimer.value = setTimeout(async () => {
    let r = await getPayStatus(orderId)
    if (r.data.status === 0 && r.data.data.order.status === 1) {
      // 查询成功 并且 状态为1 或者支付超时
      await userStore.updateUserInfo()
      props.onPaySuccess?.()
      ElMessage({
        type: 'success',
        message: '支付成功',
      })
      clearTimeout(payResultTimer.value)
      trackOrder(id.value, orderId, r.data.data.money.cash_total)
      hide()
    } else {
      lookup(orderId)
    }
  }, 1500)

  pollCount.value = pollCount.value + 1 // 增加轮询次数
}
/**
 * @description 切换套餐
 * @param idx 选中的索引
 * @returns {Promise<void>}
 */
const checkPurchase = async (id) => {
  let target = packages.value.find((item) => item.id === id)
  loading.value = true
  price.value = target.price
  checkId.value = id
  let res = await createOrder(id)
  if (res.data.status === 0) {
    beginTime.value = new Date().getTime()
    let src = await toQRCode(res.data.data)
    qrCodeSrc.value = src
    loading.value = false
    pollCount.value = 0 // 清空轮询次数
    let s = res.data.data.split('/')
    let orderId = s[s.length - 1]
    lookup(orderId)
  } else {
    // 二维码获取失败
  }
}
/**
 * @description 关闭窗口
 */
const handleClose = () => {
  props.afterClose?.()
}
const hide = () => {
  clearInterval(payResultTimer.value)
  clearInterval(timer.value)
  visible.value = false
}
const onClickClose = () => {
  props.onCancel?.()
  ElMessageBox.confirm('您目前拥有优惠购买特权，退出后将无法享用?', '温馨提示', {
    confirmButtonText: '继续支付',
    cancelButtonText: '确定放弃',
    customClass: 'my_dialog',
    type: 'warning',
    showClose: false,
  }).catch(() => {
    hide()
  })
}
/**
 * @description 打开窗口
 */
const onOpenDialog = async () => {
  packages.value = getPackages()
  let target = packages.value.find((item) => item.defaultChecked)
  target = target ? target : packages.value[0]
  await checkPurchase(target?.id)

  const savedStartTime = localStorage.getItem('countdownStartTime')
  if (savedStartTime) {
    startTime.value = parseInt(savedStartTime, 10)
  } else {
    startTime.value = Date.now()
    localStorage.setItem('countdownStartTime', startTime.value)
  }
  startCountdown()
}
const pad = (number) => {
  return number < 10 ? '0' + number : number
}
const padMilliseconds = (number) => {
  if (number < 10) {
    return '0' + number
  } else if (number < 100) {
    return number
  }
  return number
}
const startCountdown = () => {
  const now = Date.now()
  const elapsed = now - startTime.value
  remainingTime.value = 5 * 60 * 1000 - elapsed
  if (remainingTime.value <= 0) {
    resetCountdown()
  } else {
    countdown()
  }
}
const countdown = () => {
  timer.value = setInterval(() => {
    remainingTime.value -= 10
    if (remainingTime.value <= 0) {
      resetCountdown()
    }
  }, 10)
}
const resetCountdown = () => {
  clearInterval(timer.value)
  startTime.value = Date.now()
  localStorage.setItem('countdownStartTime', startTime.value)
  remainingTime.value = 5 * 60 * 1000
  countdown()
}
onOpenDialog()
</script>
<style scoped lang="less">
@import './main.less';
</style>
