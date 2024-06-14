import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react()],
  };

  if (mode === 'development') {
    config.server = {
      proxy: {
        "/api/": "http://localhost:5000",
        "/uploads/": "http://localhost:5000",
      },
    };
  }

  return config;
});
