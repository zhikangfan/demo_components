import BindOrder from './src/main'

export default {
  install(app) {
    // 创建全局方法 $BindOrder
    app.config.globalProperties.$BindOrder = BindOrder
    // 添加到 provide/inject 系统
    app.provide('$BindOrder', BindOrder)
  },
}
