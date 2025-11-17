import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig((mode) => {
  return {
    build: {
      outDir: 'dist/web'
    },
    plugins: [
      vue(),
      vueDevTools(),
      AutoImport({
        // imports: ['vue'], // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        resolvers: [
          ElementPlusResolver(), // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          })
        ],
      }),
      Icons({
        autoInstall: true,
      }),
      createHtmlPlugin({
        minify: true,
        entry: 'src/main.js',
        template: 'public/index.html',
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
