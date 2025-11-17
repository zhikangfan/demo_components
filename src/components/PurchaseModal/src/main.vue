<template>
  <el-dialog
    class="purchaseBox purchaseWrapper"
    :close-on-click-modal="false"
    v-model="visible"
    width="900px"
    :append-to-body="true"
    :show-close="false"
    :modal-append-to-body="false"
    :close-on-press-escape="false"
    :lock-scroll="false"
    @closed="handleClose"
    :destroy-on-close="true"
  >
    <div class="purchaseModalMain">
      <div class="mainHeader">
        <div class="userInfo">
          <img src="./assets/img/user_avatar.png" alt="" class="avatar" />
          <div class="userInfoRight">
            <div class="userId">ID: {{ userInfo?.uid }}</div>
            <div class="tag" v-if="!isVip">普通用户</div>
            <div class="vipTag" v-else>VIP会员</div>
          </div>
        </div>
        <el-icon class="closeIcon" @click="handleCancel"><Close /></el-icon>
      </div>
      <div class="purchaseModalContainer">
        <div class="modalContainerLeft">
          <div class="titleBox">
            <div class="title"><span>会员专属权益</span></div>
            <div class="subtitle">覆盖全站所有功能</div>
          </div>
          <ul class="entitlementTable">
            <li>
              <span class="icon"></span>
              微信对话生成器
            </li>
            <li>
              <span class="icon"></span>
              转账、红包制作
            </li>
            <li>
              <span class="icon"></span>
              模拟恶搞微信、银行卡余额
            </li>
            <li>
              <span class="icon"></span>
              海量模板免费使用
            </li>
            <li>
              <span class="icon"></span>
              高清无水印输出图片
            </li>
          </ul>
        </div>
        <div class="modalContainerRight">
          <div class="packageList">
            <div
              class="packageItem"
              @click="selectPackage(item)"
              :class="{ packageItem: true, active: checkID === item.id, activity: !!item.activity }"
              v-for="item in packages"
              :key="item.id"
            >
              <img class="cornerImg" v-if="item.cornerImg" :src="item.cornerImg" />
              <div class="packageItemContainer" v-if="!!item.activity">
                <div class="packageItemTopWrap">
                  <div class="packageItemTop">
                    <div class="packageTitle">{{ item.title }}</div>
                    <div class="desc">
                      {{ item.description }}
                      <img src="@/assets/images/xianshi.svg" alt="" class="pic" />
                    </div>
                    <div class="featureText" v-if="item.feature">{{ item.feature }}</div>
                  </div>
                </div>
                <div class="discountContainer">
                  <div class="p1">
                    <div class="p_title">日常价</div>
                    <div class="p_box">
                      <span class="p_unit">¥</span>
                      <span>{{ item.originPrice }}</span>
                    </div>
                  </div>
                  <div class="p1">
                    <div class="p_title" style="margin-left: 5px">折扣减</div>
                    <div class="p_box">
                      <span style="margin-right: 4px">-</span>
                      <span class="p_unit">¥</span>
                      <span>{{ item.discountPriceNum }}</span>
                    </div>
                  </div>
                  <div class="activityPriceBox">
                    <span class="p_title">补贴价</span>
                    <div class="p_box">
                      <span class="p_unit">¥</span>
                      <span class="p_price">{{ item.price }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="packageItemContainer" v-else>
                <div class="packageItemTopWrap">
                  <div class="packageItemTop">
                    <div class="packageTitle">{{ item.title }}</div>
                    <div class="priceBox">
                      <div class="currentPrice">
                        <span v-if="item.divisor">≈</span>￥<span class="price">{{
                          item.unitPrice
                        }}</span>
                        <!--                        <img src="@/assets/img/xianshi.svg" alt="" class="xianshi">-->
                        <span class="unit" v-if="item.unit">{{ item.unit }}</span>
                      </div>
                      <div class="originPrice" v-if="item.originPrice">{{ item.originPrice }}</div>
                    </div>
                  </div>
                </div>

                <div class="packageDesc">{{ item.description }}</div>
              </div>
            </div>
          </div>

          <div class="payInfoBox">
            <div class="qrCodeBox">
              <img :src="qrCodeSrc" alt="" class="qrCodeImg" v-if="!loading" />
              <div class="loading" v-else>
                <img src="@/assets/images/loading.png" alt="" class="loadingImg" />
              </div>
            </div>
            <div class="payInfo">
              <div class="info">
                <span>实付金额：</span>
                <span class="price">￥{{ price }}</span>
                <div class="discounts" v-if="discountPrice">{{ discountPrice }}</div>
                <div v-if="showCountDown" class="timeBox">
                  <div>优惠仅剩</div>
                  <div class="number">00</div>
                  <span class="symbol">:</span>
                  <div class="number">
                    {{
                      remainingTime.minutes < 10
                        ? '0' + remainingTime.minutes
                        : remainingTime.minutes
                    }}
                  </div>
                  <span class="symbol">:</span>
                  <div class="number">
                    {{
                      remainingTime.seconds < 10
                        ? '0' + remainingTime.seconds
                        : remainingTime.seconds
                    }}.{{
                      remainingTime.milliseconds < 10
                        ? '0' + remainingTime.milliseconds
                        : remainingTime.milliseconds
                    }}
                  </div>
                </div>
                <div class="payInfoTips" v-else>购买后可联系客服开具发票</div>
              </div>
              <div class="channelTips">
                <span class="wxPay"></span>
                <span class="aliPay"></span>
                <span>请使用微信/支付宝扫码支付</span>
              </div>
              <div class="payUserInfo">
                <ul class="payUserList" style="height: 48px">
                  <li>用户139****7468 12分钟前购买了 终身会员</li>
                  <li>用户136****8012 10分钟前购买了 终身会员</li>
                  <li>用户156****9735 12分钟前购买了 终身会员</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="tipsBox">
            <div class="tipsTitle">购买须知</div>
            <p class="tipsItem"><span class="blue">没有自动续费</span>，请放心购买</p>
            <p class="tipsItem">
              开通任一会员，会员有效期内所有功能 <span class="blue">不限使用、不限张数</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import QRCode from 'qrcode'
import { createOrder, getPayStatus } from '@/api'
import { trackOrder } from '@/api'
import { packageList as packageListData } from '@/config'
import { ref, computed, inject } from 'vue'
import { useUserStore } from '@/stores/index.js'
import { Close } from '@element-plus/icons-vue'
import Login from '@/components/LoginModal/src/main.js'
const $Login = Login
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
const checkIndex = ref(0)
const purchaseList = ref([])
const qrCodeSrc = ref('')
const pollCount = ref(0) // 轮询次数
const payResultTimer = ref(null)
const checkID = ref(0)
const price = ref(0)
const discountPrice = ref(0)
const packageList = ref(packageListData)
const startTime = ref(new Date().getTime())
const expiredTime = ref(1 * 60 * 1000) // 过期时间，默认1分钟
const timer = ref(null) // 存储计时器实例
const remainingTime = ref({
  minutes: 10,
  seconds: 59,
  milliseconds: 59,
}) // 剩余时间显示，包括毫秒
const showCountDown = ref(false) // 是否显示倒计时

const userInfo = computed(() => userStore.userInfo)
const isVip = computed(() => userStore.isVip)

const packages = computed(() =>
  packageList.value.filter((item) => item.level.includes(userStore.allCert?.vip)),
)

const countDown = (id) => {
  const time = 5 * 60 * 1000 // 倒计时时长（5分钟）

  // 获取当前时间和结束时间
  const currentTime = new Date().getTime()
  let currentDate = localStorage.getItem('E_TIME')
  let endTime = currentTime + time

  if (currentDate) {
    let d = JSON.parse(currentDate)
    if (typeof d !== 'object' || d === null) {
      d = {} // 如果解析结果不是对象，则重置为对象
    }
    if (d[`t_${id}`]) {
      endTime = d[`t_${id}`]
    } else {
      d[`t_${id}`] = currentTime + time
      localStorage.setItem('E_TIME', JSON.stringify(d))
    }
  } else {
    // 保存结束时间到 localStorage
    let d = {}
    d[`t_${id}`] = endTime
    localStorage.setItem('E_TIME', JSON.stringify(d))
  }

  // 清除之前的计时器（防止多次启动）
  if (timer.value) {
    clearInterval(timer.value)
  }

  // 启动倒计时
  timer.value = setInterval(() => {
    const currentRemainingTime = endTime - new Date().getTime()

    if (currentRemainingTime <= 0) {
      // 更新结束时间并保存到 localStorage
      endTime = new Date().getTime() + time
      localStorage.setItem('E_TIME', endTime)
      // 重新开始倒计时
      countDown()
    } else {
      // 更新界面上的倒计时（例如显示剩余时间）
      remainingTime.value = formatTime(currentRemainingTime)
    }
  }, 10)
}

// 格式化时间显示（可选）
const formatTime = (ms) => {
  const minutes = Math.floor(ms / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)
  const milliseconds = Math.floor((ms % 1000) / 10) // 取两位毫秒
  return {
    minutes: minutes,
    seconds,
    milliseconds,
  }
}

// 停止倒计时
const stopCountDown = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
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
  // 判断二维码是否过期
  if (new Date().getTime() - startTime.value >= expiredTime.value) {
    checkPurchase(checkID.value)
    return
  }

  payResultTimer.value = setTimeout(async () => {
    let r = await getPayStatus(orderId)
    if (r.data.status === 0 && r.data.data.order.status === 1) {
      // 查询成功 并且 状态为1 或者支付超时
      await userStore.updateUserInfo()
      ElMessage({
        type: 'success',
        message: '支付成功',
      })
      trackOrder(checkID.value, orderId, r.data.data.money.cash_total)
      props.onPaySuccess?.()
      hide()
    } else {
      lookup(orderId)
    }
  }, 1500)

  pollCount.value = pollCount.value + 1 // 增加轮询次数
}
const selectPackage = (item) => {
  showCountDown.value = !!item?.showCountDown
  if (item?.showCountDown) {
    countDown(item.id)
  }
  checkPurchase(item.id)
}
/**
 * @description 切换套餐
 * @param idx 选中的索引
 * @returns {Promise<void>}
 */
const checkPurchase = async (id) => {
  loading.value = true
  checkID.value = id
  let target = packages.value.find((item) => item.id === id)
  price.value = target?.price
  discountPrice.value = target?.discountPrice
  let res = await createOrder(id)
  startTime.value = new Date().getTime()
  clearTimeout(payResultTimer.value)
  if (res.data.status === 0) {
    let src = await toQRCode(res.data.data)
    qrCodeSrc.value = src
    loading.value = false
    pollCount.value = 0 // 清空轮询次数
    let s = res.data.data.split('/')
    let orderId = s[s.length - 1]
    lookup(orderId)
  } else {
    // 二维码获取失败
    if (!userStore.isLogin) {
      handleCancel()
      $Login()
    }
  }
}
/**
 * 取消
 */
const handleCancel = () => {
  props.onCancel?.()
  hide()
}
/**
 * @description 关闭窗口
 */
const handleClose = () => {
  props.afterClose?.()
}
const hide = () => {
  clearInterval(payResultTimer.value)
  visible.value = false
}

/**
 * @description 打开窗口
 */
const onOpenDialog = async () => {
  // 默认选择当前用户等级推荐的
  let target = packages.value.find((item) => item.defaultChecked)
  target = target ? target : packages.value[0]
  selectPackage(target)
}
onOpenDialog()
</script>
<style scoped lang="less">
@import './main.less';
</style>
