import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://ecomm-backend-4l7o.onrender.com",
      "/uploads/": "https://ecomm-backend-4l7o.onrender.com",
    }
  }
})
