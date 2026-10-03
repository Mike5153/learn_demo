import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    vue(),
    // 适配 iPad mini 2 (最高支持到 iOS 12.5.7) 的关键插件配置
    legacy({
      targets: ['ios >= 12', 'Safari >= 12'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  server: {
    host: '0.0.0.0', // 方便 iPad 在同一局域网通过 Wi-Fi 直接访问调试
    port: 3000
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      safari10: true
    }
  }
});
