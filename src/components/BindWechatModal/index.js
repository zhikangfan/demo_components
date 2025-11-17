import BindWechat from './src/main'

export default {
  install(app) {
    // 创建全局方法 $BindWechat
    app.config.globalProperties.$BindWechat = BindWechat
    // 添加到 provide/inject 系统
    app.provide('$BindWechat', BindWechat)
  },
}
