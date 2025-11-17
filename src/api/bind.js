import { authAxios } from '@/api'

/**
 * 获取绑定手机验证码
 * @param phoneNumber 手机号码
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBindCode = (phoneNumber) => {
  return authAxios.post('/imageformatV2/codebind', {
    mobile_phone: phoneNumber,
  })
}
/**
 * 获取解除手机绑定的验证码
 * @param phoneNumber 手机号码
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUnbindCode = (phoneNumber) => {
  return authAxios.post('/imageformatV2/codeunbind', {
    mobile_phone: phoneNumber,
  })
}
/**
 * 绑定手机号
 * @param mobile_phone 手机号码
 * @param code 验证码
 * @returns {Promise<AxiosResponse<any>>}
 */
export const bindPhoneNumber = ({ mobile_phone, code }) => {
  return authAxios.post('imageformatV2/bindmobile', {
    mobile_phone: mobile_phone,
    smscode: code,
  })
}
/**
 * 解除绑定手机号
 * @param mobile_phone 手机号码
 * @returns {Promise<AxiosResponse<any>>}
 */
export const unbindPhoneNumber = ({ mobile_phone, code }) => {
  return authAxios.post('/imageformatV2/unbindmobile', {
    mobile_phone: mobile_phone,
    smscode: code,
  })
}
/**
 * 绑定微信
 * @param union_str 微信uuid
 * @returns {Promise<AxiosResponse<any>>}
 */
export const bindWechat = (union_str) => {
  return authAxios.post('/imageformatV2/bindwechat', {
    union_str: union_str,
  })
}
/**
 * 导入订单号数据
 * @param order_id 订单ID
 * @returns {Promise<AxiosResponse<any>>}
 */
export const bindOrder = (order_id) => {
  return authAxios.post('/imageformatV2/transactionidlogin', {
    transaction_id: order_id,
  })
}
