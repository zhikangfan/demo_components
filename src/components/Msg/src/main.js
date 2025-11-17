import Main from './main.vue'
import { createApp } from 'vue'
const Msg = (options) => {
  // 创建容器
  const div = document.createElement('div')
  document.body.appendChild(div)
  const msgApp = createApp(Main, {
    ...options,
    visible: true,
    ref: 'msgInstance',
    // 重写 afterClose 加入销毁逻辑
    afterClose: (ctx) => {
      options?.afterClose?.()
      msgApp.unmount()
      document.body.removeChild(div)
    },
  })

  // 挂载并显示弹窗
  msgApp.mount(div)
}

export default Msg
