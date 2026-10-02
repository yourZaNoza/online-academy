import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

const pagesDir = resolve(import.meta.dirname, 'pages');

// Страницы сайта: папка с index.html внутри pages/ → адрес /папка/.
// Новую страницу добавьте сюда, иначе она не попадёт в сборку.
const pages = ['courses', 'masterclasses', 'contests', 'contacts'];

export default defineConfig({
  // HTML-страницы лежат в pages/, код — в src/, картинки и иконки — в public/
  root: pagesDir,
  publicDir: resolve(import.meta.dirname, 'public'),
  // «/src/...» в HTML указывает на папку src/ в корне проекта, а не внутри pages/
  resolve: {
    alias: [{ find: /^\/src\//, replacement: `${resolve(import.meta.dirname, 'src')}/` }],
  },
  plugins: [tailwindcss()],
  appType: 'mpa',
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(pagesDir, 'index.html'),
        ...Object.fromEntries(pages.map((page) => [page, resolve(pagesDir, page, 'index.html')])),
      },
    },
  },
});
