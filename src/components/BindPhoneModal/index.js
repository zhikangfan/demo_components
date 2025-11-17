import BindPhone from './src/main'

export default {
  install(app) {
    app.config.globalProperties.$BindPhone = BindPhone
    // 添加到 provide/inject 系统
    app.provide('$BindPhone', BindPhone)
  },
}
