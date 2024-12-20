import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/upload': 'http://localhost:3000',
            '/output': 'http://localhost:3000',
            '/ws': {
                target: 'ws://localhost:3000',
                ws: true,
            }
        }
    }
}) 