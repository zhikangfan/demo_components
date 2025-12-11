import Main from './main.vue'
import { createApp } from 'vue'
let instance = null
const Login = (options, props) => {
  if (instance) {
    return instance
  }
  const div = document.createElement('div')
  document.body.appendChild(div)
  options = options || {}
  const loginApp = createApp(Main, {
    ...options,
    visible: true,
    afterClose: () => {
      options?.afterClose?.()
      loginApp.unmount()
      document.body.removeChild(div)
      instance = null
    },
  })
  instance = loginApp
  loginApp.mount(div)
}

export default Login
