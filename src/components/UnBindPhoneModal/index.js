import UnBindPhone from './src/main'

export default {
  install(app) {
    // 创建全局方法 $UnBindPhone
    app.config.globalProperties.$UnBindPhone = UnBindPhone
    // 添加到 provide/inject 系统
    app.provide('$UnBindPhone', UnBindPhone)
  },
}
