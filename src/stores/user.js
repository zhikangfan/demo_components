import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { removeToken, setToken } from '@/utils/index.js'
import { getUserInfo } from '@/api/index.js'
import { VIP_LEVEL } from '@/config/index.js'

export const useUserStore = defineStore('userInfo', () => {
  const userInfo = ref(null)
  const allCert = ref(null)
  const isLogin = computed(() => {
    return !!userInfo.value?.uid
  })
  const isVip = computed(() => {
    return [VIP_LEVEL.PERMANENT_VIP, VIP_LEVEL.TIME_VIP, VIP_LEVEL.THREE_DAY_VIP].includes(
      allCert.value?.vip,
    )
  })
  const setUserInfo = (payload) => {
    if (payload?.token) {
      setToken(payload.token)
    }
    userInfo.value = payload
    allCert.value = payload?.money_info
  }
  // 退出登录
  const logout = () => {
    userInfo.value = null
    allCert.value = null
    removeToken()
  }

  // 更新用户信息
  const updateUserInfo = async () => {
    let res = await getUserInfo()
    if (res.data.status === 0) {
      const payload = res.data.data
      userInfo.value = {
        ...userInfo.value,
        money_info: {
          ...userInfo.value?.money_info,
          ...payload,
        },
        uid: payload?.uid,
      }
      allCert.value = {
        ...allCert.value,
        ...payload,
      }
    }
  }
  return { userInfo, allCert, isLogin, isVip, setUserInfo, logout, updateUserInfo }
})
