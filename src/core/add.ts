import { getSingleNumber } from './utils.ts'
import { Decimal } from 'decimal.js-light'
// 或者更通用的按位检查方法
function hasCarryDetailed(num1, num2) {
  const str1 = num1.toString()
  const str2 = num2.toString()
  const maxLength = Math.max(str1.length, str2.length)

  // 补齐位数
  const padded1 = str1.padStart(maxLength, '0')
  const padded2 = str2.padStart(maxLength, '0')

  // 从低位到高位检查
  for (let i = maxLength - 1; i >= 0; i--) {
    const digitSum = new Decimal(parseInt(padded1[i])).plus(parseInt(padded2[i])).toNumber()
    if (digitSum >= 10) {
      return true
    }
  }
  return false
}

export function generateAddItem({
  range = { min: 1, max: 9 },
  exclude = [],
  digits = 0,
  carry = false,
}) {
  let first = getSingleNumber(range, digits, exclude)
  let second = getSingleNumber(range, digits, exclude)
  if (!carry) {
    // 是否可进位
    // 当个位相加
    while (hasCarryDetailed(first, second)) {
      first = getSingleNumber(range, digits, exclude)
      second = getSingleNumber(range, digits, exclude)
    }
  }
  return {
    result: new Decimal(first).plus(second).toNumber(),
    list: [
      {
        type: 'number',
        value: first,
      },
      {
        type: 'symbol',
        value: '+',
      },
      {
        type: 'number',
        value: second,
      },
    ],
  }
}
