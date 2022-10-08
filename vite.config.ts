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
		//Mock环境
      '/campus_api': {
        target: 'https://mock.mengxuegu.com/mock/633edb39b316cf5b3d7e6291/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
	  // 测试环境 （发布上线时切换为线上环境）
	  '/api': {
		  target: 'http://127.0.0.1:8083/',
		  // target:'https://campus-rd.koto-marvelous.com/',
		  changeOrigin: true,
	  }
    },
  },
})
