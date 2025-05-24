import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Product_Marketplace_Admin_Panel",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
