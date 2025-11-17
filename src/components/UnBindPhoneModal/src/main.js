import { createApp } from 'vue'
import Main from './main.vue'

const BindPhone = (options) => {
  // 创建容器
  const div = document.createElement('div')
  document.body.appendChild(div)
  const myApp = createApp(Main, {
    ...options,
    visible: true,
    afterClose: (ctx) => {
      options?.afterClose?.()
      myApp.unmount()
      document.body.removeChild(div)
    },
  })
  // 挂载并显示弹窗
  myApp.mount(div)
}

export default BindPhone
