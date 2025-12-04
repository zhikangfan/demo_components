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
  // 生成所有数字
  const numbers = new Array(count).fill(0).map(() => getSingleNumber(range, digits, exclude))

  // 构建表达式列表并计算结果
  let result = new Decimal(numbers[0]) // 使用 Decimal 初始化
  const list = [
    {
      type: 'number',
      value: numbers[0],
    },
  ]

  for (let i = 1; i < numbers.length; i++) {
    let symbol = ''
    if (type === 'add') {
      symbol = '+'
    } else if (type === 'subtract') {
      symbol = '-'
    } else if (type === 'mix') {
      symbol = Math.random() > 0.5 ? '+' : '-'
    }

    // 根据符号使用 Decimal 计算结果
    if (symbol === '+') {
      result = result.plus(numbers[i])
    } else {
      result = result.minus(numbers[i])
    }

    // 添加到表达式列表
    list.push({
      type: 'symbol',
      value: symbol,
    })
    list.push({
      type: 'number',
      value: numbers[i],
    })
  }

  return {
    result: result.toNumber(), // 转换为普通数字返回
    list: list,
  }
}
