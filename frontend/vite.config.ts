import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // src配下を @/ で参照できるようにする(Feature-Sliced Designのレイヤー間importで使う)
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
