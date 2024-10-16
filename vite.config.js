import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jwt-decode', '@mui/material', '@mui/icons-material'],
  },
  server: {
    port: 5173
  }
});
