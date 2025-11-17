import Login from './src/main'
export default {
  install(app, props) {
    // 创建全局方法 $Login
    app.config.globalProperties.$Login = (options) => {
      Login(options, props)
    }
    // 添加到 provide/inject 系统
    app.provide('$Login', (options) => {
      Login(options, props)
    })
  },
}
