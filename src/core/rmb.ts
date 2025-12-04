// 生成换算题目
// 人民币面额定义
import { getRandomInt } from '@/core/utils.ts'

const RMB_DENOMINATIONS = [
  { name: '100元', value: 10000 },
  { name: '50元', value: 5000 },
  { name: '20元', value: 2000 },
  { name: '10元', value: 1000 },
  { name: '5元', value: 500 },
  { name: '1元', value: 100 },
  { name: '5角', value: 50 },
  { name: '1角', value: 10 },
  { name: '1分', value: 1 },
]

export function formatToYuanJiaoFen(total: number): string {
  const yuan = Math.floor(total / 100) // 元
  const jiao = Math.floor((total % 100) / 10) // 角
  const fen = total % 10 // 分

  let result = ''
  if (yuan > 0) result += `${yuan}元`
  if (jiao > 0) result += `${jiao}角`
  if (fen > 0) result += `${fen}分`

  return result || '0元'
}

export function generateRMBBreakdownItem({ selectedUnits = [] }) {
  const maxUnit = Math.max(...selectedUnits.map((item) => item)) // 找到单位的最大值
  // const minUnit = Math.min(...selectedUnits.map((item) => item)) // 找到单位的最大值
  const minUnit = getRandomInt(1, selectedUnits.length - 2) // 从选择的单位中随机最小值，但要去除最大值
  const total = getRandomInt(minUnit * 10, maxUnit * 10, [0])
  let minResult = total
  // 过滤出需要使用的面额
  const denominationsToUse = RMB_DENOMINATIONS.filter((item) => selectedUnits.includes(item.value))
  const result = []
  // 按面额从大到小进行分解
  for (const denomination of denominationsToUse) {
    const count = Math.floor(minResult / denomination.value)
    if (count > 0) {
      result.push({
        unitName: denomination.name,
        count: count,
        value: denomination.value,
      })
      minResult -= count * denomination.value // 减去已分配的金额
    }
  }
  return {
    totalAmount: total,
    totalFormat: formatToYuanJiaoFen(total),
    list: result,
  }
}
