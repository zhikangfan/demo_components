import { getSingleNumber } from '@/core/utils.ts'
import { Decimal } from 'decimal.js-light'
/**
 * 生成连续加减题
 * @param range 运算范围
 * @param exclude 排除的运算数
 * @param digits 小数位
 * @param type add(加) | subtract(减) | mix(混合)
 * @param count 参与运算的数字的数量
 */
export const generateContinuousAddOrSubtractItem = ({
  range = {
    min: 1,
    max: 9,
  },
  exclude = [],
  digits = 0,
  type = 'mix',
  count = 3,
}) => {
  // 生成第一个数字
  const firstNumber = getSingleNumber(
    {
      min: type === 'subtract' ? range.min : range.min * count,
      max: range.max,
    },
    digits,
    exclude,
  )
  let prev = firstNumber
  // 构建表达式列表并计算结果
  let result = new Decimal(firstNumber) // 使用 Decimal 初始化
  const list = [
    {
      type: 'number',
      value: firstNumber,
    },
  ]

  for (let i = 1; i < count; i++) {
    let symbol = ''
    let number = getSingleNumber(range, digits, exclude)
    if (type === 'add') {
      symbol = '+'
    } else if (type === 'subtract') {
      symbol = '-'
      number = getSingleNumber(
        {
          min: range.min,
          max: prev,
        },
        digits,
        exclude,
      )
      prev = prev - number
    } else if (type === 'mix') {
      symbol = Math.random() > 0.5 ? '+' : '-'
    }

    // 根据符号使用 Decimal 计算结果
    if (symbol === '+') {
      result = result.plus(number)
    } else {
      result = result.minus(number)
    }

    list.push(
      {
        type: 'symbol',
        value: symbol,
      },
      {
        type: 'number',
        value: number,
      },
    )
  }

  return {
    result: result.toNumber(), // 转换为普通数字返回
    list: list,
  }
}
