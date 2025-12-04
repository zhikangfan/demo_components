import { getRandomInt, shuffleArray } from '@/core/utils.ts'
import { Decimal } from 'decimal.js-light'

export const generateConversionItem = ({
  selectedUnits = [], // 选择的单位
  units = [],
  multiplier = false, // 是否多级换算
  min = 1,
  max = 100,
}) => {
  if (units.length === 0 || selectedUnits.length === 0) {
    return []
  }
  const maxUnit = Math.max(...units.map((item) => item.value)) // 找到单位的最大值
  const maxNumber = getRandomInt(min, max)
  // units.find(item => item.value === maxUnit)
  const minResult = maxNumber * maxUnit // 得到最小单位的换算值
  const result = units
    .filter((item) => selectedUnits.includes(item.value))
    .map((item) => {
      return {
        ...item,
        value: new Decimal(minResult).dividedBy(item.value).toNumber(),
      }
    })
  const shuffledResult = shuffleArray(result)
  if (multiplier) {
    return {
      list: shuffledResult,
    }
  }
  return {
    list: shuffledResult.slice(0, 2),
  }
}
