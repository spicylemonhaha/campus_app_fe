import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
    },
  },
  optimizeDeps: {
    entries: ['@dcloudio/uni-ui'],
  },
  server: {
    cors: true,
    port: 6900,
    proxy: {
      '/campus_api': {
        target: 'https://mock.mengxuegu.com/mock/633edb39b316cf5b3d7e6291/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
