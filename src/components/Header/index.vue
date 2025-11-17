<script setup>
import ss from './index.module.less'
import { useRoute, useRouter } from 'vue-router'
import { ref, inject, computed } from 'vue'
import { useTemplateStore, useUserStore } from '@/stores/index.js'
import { VIP_LEVEL } from '@/config/index.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const templateStore = useTemplateStore()
const $Msg = inject('$Msg')
const $Login = inject('$Login')
const $PurchaseModal = inject('$PurchaseModal')

const allCert = computed(() => userStore.allCert)
const isVip = computed(() => userStore.isVip)
const isLogin = computed(() => {
  return userStore.isLogin
})
const templateData = computed(() => {
  return templateStore.templates
})
const templates = ref(templateData.value)
const visible = ref(false)

const btnTxt = computed(() => {
  return allCert.value?.vip === VIP_LEVEL.TIME_VIP ||
    allCert.value?.value === VIP_LEVEL.THREE_DAY_VIP
    ? '续费会员'
    : '开通会员'
})

const handleLogin = () => {
  $Login({
    onCancel: () => {
      $Msg({
        showLeft: true,
        showRight: true,
        leftBtnTxt: '退出',
        rightBtnTxt: '继续登录',
        title: '温馨提示',
        content: `确认退出吗？登录即可享限时活动哦～`,
        onClose: () => {},
        onClickLeftBtn: () => {},
        onClickRightBtn: () => {
          handleLogin()
        },
      })
    },
  })
}
const handleBuy = () => {
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
const handleBlur = () => {
  visible.value = false
}
const handleFocus = () => {
  visible.value = true
}
const handleInput = (e) => {
  const txt = e.target.value
  templates.value = templateData.value?.filter((template) => template.name.indexOf(txt) !== -1)
}
const jump = (id) => {
  router.push({
    name: 'template',
    params: {
      id: id,
    },
  })
}
</script>
<template>
  <header :class="ss.headerWrapper">
    <div :class="ss.headerContainer">
      <RouterLink to="/" :class="ss.logoBox">
        <img src="@/assets/images/logo.svg" alt="" :class="ss.logo" />
        <img src="@/assets/images/logo_img.svg" alt="" :class="ss.logoImg" />
      </RouterLink>
      <nav :class="ss.navList">
        <RouterLink to="/" :class="{ [ss.navItem]: true, [ss.active]: route.fullPath === '/' }"
          >首页
        </RouterLink>
        <RouterLink
          to="/chat"
          :class="{ [ss.navItem]: true, [ss.active]: route.fullPath === '/chat' }"
          >模拟聊天转账
        </RouterLink>
        <RouterLink
          to="/category"
          :class="{ [ss.navItem]: true, [ss.active]: route.fullPath === '/category' }"
          >分类
        </RouterLink>
      </nav>
      <div :class="ss.searchBox">
        <el-popover
          :visible="visible"
          placement="bottom"
          title=""
          :width="266"
          popper-class="searchPopper"
        >
          <template #reference>
            <div :class="ss.searchInputBox">
              <input
                type="text"
                :class="ss.input"
                placeholder="微信零钱余额"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="handleInput"
              />
              <img src="@/assets/images/search.png" alt="" :class="ss.searchIcon" />
            </div>
          </template>
          <el-scrollbar max-height="266px">
            <ul class="searchList" v-if="templates.length > 0">
              <li
                class="searchItem"
                v-for="template in templates"
                :key="template.id"
                @click="jump(template.id)"
              >
                {{ template.name }}
              </li>
            </ul>
            <el-empty :image-size="60" v-else description="暂无相关模板" />
          </el-scrollbar>
        </el-popover>
      </div>
      <div :class="ss.btnGroups">
        <button :class="ss.buyBtn" @click="handleBuy" v-if="!isVip">
          {{ btnTxt }}
          <img
            src="https://cdn1.ruanqing.com/img_geshicn/img/activity.svg"
            :class="ss.activity_img"
          />
        </button>
        <div :class="ss.loginBox" v-if="!isLogin" @click="handleLogin">
          <button :class="ss.loginBtn">登录/注册</button>
          <img src="@/assets/images/login_tips.svg" :class="ss.tips" alt="" />
        </div>
        <UserInfo v-else />
      </div>
    </div>
  </header>
</template>
