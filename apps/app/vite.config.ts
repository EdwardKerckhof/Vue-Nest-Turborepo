import vue from '@vitejs/plugin-vue'
import icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import pages from 'vite-plugin-pages'
import layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
  },
  plugins: [
    vue(),
    // https://github.com/antfu/unplugin-icons (icon set from Icônes)
    icons(),
    // https://github.com/hannoeru/vite-plugin-pages (file system based routing)
    pages(),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts (layouts for pages)
    layouts()
  ],
})
