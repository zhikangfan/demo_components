/**
 * @description 移除token
 */
export function removeToken() {
  localStorage.removeItem('SID')
}
/**
 * @description 获取token
 */
export function getToken() {
  return localStorage.getItem('SID')
}
/**
 * @description 设置token
 */
export function setToken(token) {
  localStorage.setItem('SID', token)
}
