import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:5000/",
      // "/uploads/": "https://ecomm-backend-2jri.onrender.com/",
    }
  }
})
