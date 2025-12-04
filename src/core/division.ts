import { getSingleNumberWithSpecify } from '@/core/utils.ts'
import { Decimal } from 'decimal.js-light'
import { generateMultiplyItem } from '@/core/multiply.ts'

/**
 * 获取除法题
 * @param range 范围设置
 * @param exclude 排除数字
 * @param digits 小数位数
 * @param type 题目类型: integer(整除) | round(四舍五入) | remainder(带余数)
 */
export const generatetDivisionItem = ({
  range = {
    min: 1,
    max: 9,
  },
  exclude = [],
  digits = 0,
  type = 'integer',
}) => {
  let first, second

  // 生成符合条件的除法题目
  if (type === 'integer') {
    // 整除题目：确保结果为整数
    let result
    do {
      first = getSingleNumberWithSpecify(range.min, exclude, digits)
      second = getSingleNumberWithSpecify(range.max, [...exclude, 0], digits)

      // 确保第一个数大于等于第二个数
      if (first < second) {
        ;[first, second] = [second, first]
      }

      result = new Decimal(first).dividedBy(second)
    } while (!result.isInteger())

    return {
      result: result.toNumber(),
      list: [
        {
          type: 'number',
          value: first,
        },
        {
          type: 'symbol',
          value: '÷',
        },
        {
          type: 'number',
          value: second,
        },
      ],
    }
  } else if (type === 'round') {
    // 四舍五入题目：生成有小数结果的除法，要求四舍五入到指定位置
    let result
    let roundedResult

    do {
      first = getSingleNumberWithSpecify(range.min, exclude, digits)
      second = getSingleNumberWithSpecify(range.max, [...exclude, 0], digits)

      result = new Decimal(first).dividedBy(second)
      roundedResult = result.toDecimalPlaces(0, Decimal.ROUND_HALF_UP) // 四舍五入到整数
    } while (result.equals(roundedResult) || result.isInteger()) // 避免生成整除的情况

    return {
      result: roundedResult.toNumber(),
      originalResult: result.toNumber(), // 保留原始结果用于显示
      list: [
        {
          type: 'number',
          value: first,
        },
        {
          type: 'symbol',
          value: '÷',
        },
        {
          type: 'number',
          value: second,
        },
      ],
    }
  } else if (type === 'remainder') {
    // 带余数题目：返回商和余数
    let quotient, remainder

    do {
      first = getSingleNumberWithSpecify(range.min, exclude, digits)
      second = getSingleNumberWithSpecify(range.max, [...exclude, 0], digits)

      if (first < second) {
        ;[first, second] = [second, first]
      }

      quotient = new Decimal(first).dividedToIntegerBy(second)
      remainder = new Decimal(first).modulo(second)
    } while (remainder.isZero()) // 避免生成整除的情况

    return {
      result: quotient.toNumber(),
      list: [
        {
          type: 'number',
          value: first,
        },
        {
          type: 'symbol',
          value: '÷',
        },
        {
          type: 'number',
          value: second,
        },
        {
          type: 'symbol',
          value: '......',
        },
        {
          type: 'number',
          value: remainder.toNumber(),
        },
      ],
    }
  }
}
