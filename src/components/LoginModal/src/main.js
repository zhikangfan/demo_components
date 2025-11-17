import Main from './main.vue'
import { createApp } from 'vue'

const Login = (options, props) => {
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
    },
  })
  loginApp.mount(div)
}

export default Login
