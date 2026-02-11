import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'maskable.svg'],
      manifest: {
        name: 'Markdown Cleaner',
        short_name: 'MD Cleaner',
        description: 'Free online tool to strip Markdown formatting from text. Remove bold, italics, links, code blocks, headers, and lists instantly with real-time processing.',
        categories: ['productivity', 'utilities'],
        theme_color: '#1b2738',
        background_color: '#f9f6f1',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        lang: 'en',
        dir: 'ltr',
        icons: [
          {
            src: '/icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/maskable.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
