<template>
  <div class="userInfoWrapper" @mouseenter="handleMouseEnter">
    <img src="@/assets/images/user_avatar.png" alt="" class="avatar" />
    <div class="userInfoContainer">
      <div class="userInfoBox">
        <img src="@/assets/images/user_avatar.png" alt="" class="userAvatar" />
        <div class="userInfoBoxRight">
          <div class="nickname">{{ userInfo?.uid }}</div>
          <div class="user">
            <span class="tag" v-if="!isVip">免费用户</span>
            <span class="vipTag" v-else>VIP会员</span>
            <div class="userIdBox">
              <span class="userId">ID: {{ userInfo?.uid }}</span>
              <span class="copyBtn" @click="handleCopy"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="residualEquity">
        <div class="countBox">
          <span>{{ descTxt }}</span>
        </div>
        <button
          v-if="allCert?.vip !== VIP_LEVEL.PERMANENT_VIP"
          class="purchaseButton"
          @click="openPurchaseModal"
        >
          {{ btnTxt }}
        </button>
      </div>
      <a href="/account/setting" class="settingLink">账号设置</a>
      <button @click="handleLogout" class="logoutBtn">退出登录</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, inject } from 'vue'
import { useUserStore } from '@/stores/index.js'
import { VIP_LEVEL } from '@/config/index.js'
import copy from 'copy-to-clipboard'
// import { ElMessage } from 'element-plus'
const $Login = inject('$Login')
const $PurchaseModal = inject('$PurchaseModal')
const userStore = useUserStore()
const allCert = computed(() => userStore.allCert)
const userInfo = computed(() => userStore.userInfo)
const isLogin = computed(() => {
  return userStore.isLogin
})
const isVip = computed(() => userStore.isVip)
const btnTxt = computed(() => (isVip.value ? '续费会员' : '开通会员'))
const descTxt = computed(() => {
  if (
    userStore.allCert?.vip === VIP_LEVEL.TIME_VIP ||
    userStore.allCert?.vip === VIP_LEVEL.THREE_DAY_VIP
  ) {
    return `到期时间：${userStore.allCert?.vip_expiration_date}`
  } else if (userStore.allCert?.vip === VIP_LEVEL.PERMANENT_VIP) {
    return `到期时间：永久`
  } else {
    return '开通会员解锁全部功能'
  }
})

const handleMouseEnter = async () => {
  await userStore.updateUserInfo()
}
const handleLogout = () => {
  userStore.logout()
}
const openPurchaseModal = () => {
  if (isLogin.value) {
    $PurchaseModal()
  } else {
    $Login({
      onSuccess() {
        $PurchaseModal()
      },
    })
  }
}
const handleCopy = () => {
  ElMessage({
    type: 'success',
    message: '复制成功',
    duration: 0,
  })
  copy(userInfo.value?.uid, { format: 'text/plain' })
}
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
