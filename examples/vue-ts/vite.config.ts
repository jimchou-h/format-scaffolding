import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    // 6000–6063 会被 Chrome / Edge 拦截（ERR_UNSAFE_PORT）
    port: 6100,
    strictPort: true,
  },
});
