import Purchase from './src/main'
export default {
  install(app) {
    // 创建全局方法 $Msg
    app.config.globalProperties.$PurchaseModal = Purchase
    // 添加到 provide/inject 系统
    app.provide('$PurchaseModal', Purchase)
  },
}
