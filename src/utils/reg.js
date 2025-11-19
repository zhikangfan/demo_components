/**
 * 判断是否是汉字
 * @param str
 * @returns {boolean}
 */
export const isChinese = (str) => {
  return /^[\u4e00-\u9fa5]+$/.test(str)
}
/**
 * 判断是否是英文
 * @param str
 * @returns {boolean}
 */
export const isEnglish = (str) => {
  return /^[a-zA-Z]+$/.test(str)
}
/**
 * 判断是否是数字
 * @param str
 * @returns {boolean}
 */
export const isNumber = (str) => {
  return /^[0-9]+$/.test(str)
}
/**
 * 判断是否是汉字符号
 * @param str
 * @returns {boolean}
 */
export const isChineseSymbol = (str) => {
  return /^[\u3000-\u303F\uFF00-\uFFEF]$/.test(str)
}
/**
 * 是否是英文字符
 * @param char
 * @returns {boolean}
 */
export const isEnglishSymbol = (char) => {
  return /^[\x20-\x7E]$/.test(char) && !/[A-Za-z0-9]/.test(char)
}
