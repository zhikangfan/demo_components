import { getSingleNumberWithSpecify } from '@/core/utils.ts'
import { Decimal } from 'decimal.js-light'

/**
 * 乘法题生成
 * @param range
 * @param exclude
 * @param digits
 */
export const generateMultiplyItem = ({ range = { min: 1, max: 1 }, exclude = [], digits = 0 }) => {
  let first = getSingleNumberWithSpecify(range.min, exclude, digits)
  let second = getSingleNumberWithSpecify(range.max, exclude, digits)
  return {
    result: new Decimal(first).times(second).toNumber(),
    list: [
      {
        type: 'number',
        value: first,
      },
      {
        type: 'symbol',
        value: 'x',
      },
      {
        type: 'number',
        value: second,
      },
    ],
  }
}
