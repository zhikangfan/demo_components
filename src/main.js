import './assets/base.css'
import 'ant-design-vue/dist/reset.css'
import 'vue-draggable-resizable/style.css'
import 'gridstack/dist/gridstack.min.css'
import './assets/test.css'
import './assets/preflight.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Msg from '@/components/Msg/index.js'
import Login from '@/components/LoginModal/index.js'
import PurchaseModal from '@/components/PurchaseModal/index.js'
import RetentionModal from '@/components/RetentionModal/index.js'
import BindOrderModal from '@/components/BindOrderModal/index.js'
import BindPhoneModal from '@/components/BindPhoneModal/index.js'
import BindWechatModal from '@/components/BindWechatModal/index.js'
import UnBindPhoneModal from '@/components/UnBindPhoneModal/index.js'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Msg)
app.use(Login)
app.use(PurchaseModal)
app.use(RetentionModal)
app.use(BindOrderModal)
app.use(BindPhoneModal)
app.use(UnBindPhoneModal)
app.use(BindWechatModal)
app.mount('#app')
