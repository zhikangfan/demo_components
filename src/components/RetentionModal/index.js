import Retention from './src/main'
export default {
  install(app) {
    // 创建全局方法 $RetentionModal
    app.config.globalProperties.$RetentionModal = Retention
    // 添加到 provide/inject 系统
    app.provide('$RetentionModal', Retention)
  },
}
