import Msg from './src/main.js'
export default {
  install(app, options) {
    // 创建全局方法 $Msg
    app.config.globalProperties.$Msg = Msg
    // 添加到 provide/inject 系统
    app.provide('$Msg', Msg)
  },
}
