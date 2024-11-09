import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/chat':"https://chat-app-new-ncrs.onrender.com"
    },
  },
  plugins: [
    react(),
  ],
})
