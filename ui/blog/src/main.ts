import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import './assets/iconfont/iconfont.css'
import App from './App.vue'
import '@/styles/base.scss'
// 引入路由
import router, { setupRouter } from '@/router'
// 引入状态管理
import { setupStore } from '@/store'

const setupAll = async () => {
    const app = createApp(App)

    // 注册状态管理
    setupStore(app)

    // 注册路由
    setupRouter(app)

    await router.isReady()

    app.mount('#app')
}

setupAll()
