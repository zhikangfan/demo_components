/**
 * @Description 套餐配置
 * @Author zhikangfan
 */

/**
 * VIP 等级定义
 */
export const VIP_LEVEL = {
  NON_VIP: 0, // 非vip
  COUNT_VIP: 5, // 次数vip
  TIME_VIP: 10, // 时间vip
  PERMANENT_VIP: 100, // 永久会员
  THREE_DAY_VIP: 7, // 3天会员
  YEAR_VIP: 10, // 年会员
}

/**
 * 普通套餐
 */
export const packageList = [
  {
    id: 133,
    title: '终身会员',
    feature: '',
    description: '¥0.01/天',
    unitPrice: 29, // 单价
    originPrice: '229',
    discountPriceNum: '200',
    price: 29,
    discountPrice: '直降200元',
    unit: '',
    corner: '限时促销',
    cornerImg: 'https://cdn1.ruanqing.com/img_geshicn/img/500.svg',
    defaultChecked: true,
    activity: true,
    showCountDown: true, // 是否显示倒计时
    level: [
      VIP_LEVEL.NON_VIP,
      VIP_LEVEL.THREE_DAY_VIP,
      VIP_LEVEL.YEAR_VIP,
      VIP_LEVEL.PERMANENT_VIP,
    ],
  },
  {
    id: 134,
    title: '年会员',
    description: '≈ 1 杯咖啡',
    unitPrice: 19, // 单价
    originPrice: '119',
    price: 19,
    discountPrice: '立减100元',
    unit: '',
    corner: '',
    defaultChecked: false,
    level: [
      VIP_LEVEL.NON_VIP,
      VIP_LEVEL.THREE_DAY_VIP,
      VIP_LEVEL.YEAR_VIP,
      VIP_LEVEL.PERMANENT_VIP,
    ],
  },
  {
    id: 135,
    title: '7天会员',
    description: ' ≈ 1 杯奶茶',
    unitPrice: 9.9, // 单价
    originPrice: '19.9',
    price: 9.9,
    discountPrice: '立减10元',
    unit: '',
    corner: '',
    defaultChecked: false,
    level: [
      VIP_LEVEL.NON_VIP,
      VIP_LEVEL.THREE_DAY_VIP,
      VIP_LEVEL.YEAR_VIP,
      VIP_LEVEL.PERMANENT_VIP,
    ],
  },
]

/**
 * 挽留套餐
 */
export const retentionList = [
  {
    id: 5,
    title: '终身会员',
    description: '永久使用，限时促销',
    unitPrice: 39, // 单价
    originPrice: '569', // 原价
    price: 39, // 售价
    discountPrice: '',
    unit: '',
    corner: '一年仅一次',
    defaultChecked: true,
    level: [VIP_LEVEL.NON_VIP, VIP_LEVEL.COUNT_VIP],
  },
  {
    id: 11,
    title: '3天会员',
    description: '不限次数',
    unitPrice: 19.9, // 单价
    originPrice: '', // 原价
    price: 19.9, // 售价
    discountPrice: '',
    unit: '',
    corner: '',
    defaultChecked: false,
    level: [VIP_LEVEL.NON_VIP, VIP_LEVEL.COUNT_VIP],
  },
]
/**
 * 挽留套餐，但是必须只有前两次打开使用
 */
export const retentionList2 = [
  {
    id: 49,
    title: '终身会员',
    description: '永久使用，限时促销',
    unitPrice: 59, // 单价
    originPrice: '569', // 原价
    price: 59, // 售价
    discountPrice: '',
    unit: '',
    corner: '一年仅一次',
    defaultChecked: true,
    level: [VIP_LEVEL.NON_VIP, VIP_LEVEL.COUNT_VIP],
  },
  {
    id: 11,
    title: '3天会员',
    description: '不限次数',
    unitPrice: 19.9, // 单价
    originPrice: '', // 原价
    price: 19.9, // 售价
    discountPrice: '',
    unit: '',
    corner: '',
    defaultChecked: false,
    level: [VIP_LEVEL.NON_VIP, VIP_LEVEL.COUNT_VIP],
  },
]
