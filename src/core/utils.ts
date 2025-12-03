export function getRandomInt(min, max, exclude = []) {
  // 确保min和max都是整数
  min = Math.ceil(min)
  max = Math.floor(max)
  // 生成[min, max]范围内的随机整数
  let result
  do {
    result = Math.floor(Math.random() * (max - min + 1)) + min
  } while (exclude.includes(result))
  return result
}

export function getRandomDecimal(digits, exclude = []) {
  if (digits <= 0) {
    return 0
  }
  // 生成指定位数的数字
  const min = Math.pow(10, digits - 1)
  const max = Math.pow(10, digits) - 1
  let result
  do {
    result = Math.floor(Math.random() * (max - min + 1)) + min
  } while (exclude.includes(result))
  return result
}

export function getSingleNumber(range = { min: 1, max: 9 }, digits = 0, exclude = []) {
  return Number(getRandomInt(range.min, range.max, exclude) + '.' + getRandomDecimal(digits))
}

/**
 * 生成指定的长度的数字
 * @param length
 * @param exclude
 * @param digits
 */
export function getSingleNumberWithSpecify(length = 1, exclude = [], digits = 0) {
  return Number(getRandomDecimal(length, exclude) + '.' + getRandomDecimal(digits))
}
