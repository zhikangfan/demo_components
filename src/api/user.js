import { authAxios, noAuthAxios } from '@/api'
import { SOFT_CHANNEL, SOFT_CODE } from '@/config'

/**
 * @description 登录（已废弃）
 * @param code
 * @returns {Promise<AxiosResponse<any>>}
 */
export function userLogin(code) {
  return noAuthAxios.get('/api/wxlogin?code=' + code)
}

/**
 * @description 扣除用户下载次数
 * @param count 要扣除的次数
 * @returns {Promise<AxiosResponse<any>>}
 */
export function duce(count = 1) {
  return authAxios.post(
    '/imageformatV2/duce',
    {
      c: count,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}

/**
 * 获取用户信息
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUserInfo() {
  return authAxios.post('/imageformatV2/getuserinfo')
}

/**
 * 获取登录二维码
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getLoginQrCode() {
  return noAuthAxios.post('/api/wxgetqrcode')
}

/**
 * 检查微信登录状态
 * @param union_str
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getLoginStatus(union_str) {
  return noAuthAxios.post('/apiv2/wechatcheck', {
    code: SOFT_CODE,
    soft_channel: SOFT_CHANNEL,
    union_str: union_str,
  })
}

/**
 * 手机号码登录
 * @param mobile_phone 手机号
 * @param smscode 验证码
 * @returns {Promise<AxiosResponse<any>>}
 */
export const checkPhoneNumberLoginStatus = ({ mobile_phone, smscode }) => {
  return noAuthAxios.post('/apiv2/smslogin', {
    code: SOFT_CODE,
    soft_channel: SOFT_CHANNEL,
    mobile_phone: mobile_phone,
    smscode: smscode,
  })
}
/**
 * 获取手机验证码
 * @param mobile_phone 手机号
 */
export const getMobileCode = (mobile_phone) => {
  return noAuthAxios.post('/api/code', {
    mobile_phone,
    code: SOFT_CODE,
  })
}

/**
 * 游客登录
 */
export const visitorLogin = () => {
  return noAuthAxios.post('/apiv2/guestlogin', {
    code: SOFT_CODE,
    soft_channel: SOFT_CHANNEL,
  })
}
