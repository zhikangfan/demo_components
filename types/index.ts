export interface Paper<T> {
  id: string,
  config: {
    width: number,
    height: number,
    padding: {
      top: number,
      left: number,
      right: number,
      bottom: number
    }
  },
  widgets: Widget<T>[]
}
export enum WidgetType {
  Text,
  Info,
  Pinyin,
  ChineseFont,
  ChineseWord,
  ChineseParagraph,
  ChineseStroke,
  MathAdd,
  MathSubtraction,
  MathMultiplication,
  MathDivision,
  MathDivisionInTable, // 表内除法
  MathMakeTen, // 凑10法
  MathBreakTen, // 破10法
  MathUnitConversionLength, // 长度单位换算
  MathUnitConversionWeight, // 重量单位换算
  MathUnitConversionTime, // 时间单位换算
  MathUnitConversionRMB, // 人名币单位换算
  MathRMBExchange, // 人名币兑换
  EngWord,
  EngParagraph,
}

export interface Widget<T> {
  id: string,
  key: WidgetsType
  w: number,
  h: number,
  x: number,
  y: number,
  padding: {
    top: number,
    left: number,
    right: number,
    bottom: number
  },
  config: T
}


