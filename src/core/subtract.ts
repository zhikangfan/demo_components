import { getSingleNumber } from '@/core/utils.ts'
import { Decimal } from 'decimal.js-light'
function hasBorrow(num1, num2) {
  // 确保num1 >= num2，否则交换顺序
  if (num1 < num2) {
    ;[num1, num2] = [num2, num1]
  }

  const str1 = num1.toString()
  const str2 = num2.toString()
  const maxLength = Math.max(str1.length, str2.length)

  // 补齐位数
  const padded1 = str1.padStart(maxLength, '0')
  const padded2 = str2.padStart(maxLength, '0')

  // 从低位到高位检查
  for (let i = maxLength - 1; i >= 0; i--) {
    const digit1 = parseInt(padded1[i])
    const digit2 = parseInt(padded2[i])

    // 如果被减数当前位小于减数当前位，则需要退位
    if (digit1 < digit2) {
      return true
    }
  }
  return false
}
export function generateSubtractItem({
  range = { min: 1, max: 9 },
  exclude = [],
  digits = 0,
  borrow = false,
}) {
  let first = getSingleNumber(range, digits, exclude)
  let second = getSingleNumber(range, digits, exclude)

  // 确保第一个数大于等于第二个数
  if (first < second) {
    ;[first, second] = [second, first]
  }

  if (!borrow) {
    // 不允许退位
    while (hasBorrow(first, second)) {
      first = getSingleNumber(range, digits, exclude)
      second = getSingleNumber(range, digits, exclude)
      if (first < second) {
        ;[first, second] = [second, first]
      }
    }
  }

  return {
    result: new Decimal(first).minus(second).toNumber(),
    list: [
      {
        type: 'number',
        value: first,
      },
      {
        type: 'symbol',
        value: '-',
      },
      {
        type: 'number',
        value: second,
      },
    ],
  }
}
