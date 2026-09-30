import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

// Страницы сайта: папка с index.html → адрес /папка/.
// Новую страницу добавьте сюда, иначе она не попадёт в сборку.
const pages = ['courses', 'masterclasses', 'contests', 'contacts'];

export default defineConfig({
  plugins: [tailwindcss()],
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        ...Object.fromEntries(pages.map((page) => [page, resolve(import.meta.dirname, page, 'index.html')])),
      },
    },
  },
});
