import axios from 'axios'
import { getToken, removeToken } from '@/utils'
import { useUserStore } from '@/stores/index.js'
const authAxios = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
  timeout: 0,
})

authAxios.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers['token'] = getToken()
  }
  return config
})

authAxios.interceptors.response.use((response) => {
  /**
   * TODO token失效处理
   */
  if (response.data.status === 401 || response.data.status === 2000) {
    removeToken()
    const userStore = useUserStore()
    userStore.logout()
    // return Promise.reject(response)
  }
  return response
})

const noAuthAxios = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
  timeout: 0,
})

export { authAxios, noAuthAxios }
