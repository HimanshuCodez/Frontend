import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://backend-h759.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})