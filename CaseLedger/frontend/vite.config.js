import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': JSON.stringify(process.env)
  },
  plugins: [react()],
})
