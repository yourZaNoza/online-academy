import { asset } from './dom';
import './lightbox.css';

export interface LightboxImage {
  /** Путь к картинке из public/ */
  src: string;
  alt: string;
}

const ICON = (path: string): string =>
  `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="${path}" /></svg>`;

let dialog: HTMLDialogElement | null = null;
let images: LightboxImage[] = [];
let index = 0;
/** Только что был свайп — следующий клик не должен закрыть просмотр */
let swiped = false;

function show(): void {
  if (!dialog) return;
  const item = images[index];
  const img = dialog.querySelector<HTMLImageElement>('.lightbox__image')!;
  img.src = asset(item.src);
  img.alt = item.alt;
  dialog.querySelector('.lightbox__count')!.textContent = `${index + 1} / ${images.length}`;
  dialog.classList.toggle('lightbox--single', images.length < 2);
}

const step = (delta: number): void => {
  index = (index + delta + images.length) % images.length;
  show();
};

/** Один общий <dialog> на страницу — создаём при первом открытии */
function ensureDialog(): HTMLDialogElement {
  if (dialog) return dialog;
  dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Просмотр изображения');
  dialog.innerHTML = `
    <img alt="" class="lightbox__image" />
    <button type="button" class="lightbox__btn lightbox__close" data-close aria-label="Закрыть">${ICON('m3 3 10 10M13 3 3 13')}</button>
    <button type="button" class="lightbox__btn lightbox__nav lightbox__nav--prev" data-step="-1" aria-label="Предыдущее изображение">${ICON('M10 3 5 8l5 5')}</button>
    <button type="button" class="lightbox__btn lightbox__nav lightbox__nav--next" data-step="1" aria-label="Следующее изображение">${ICON('m6 3 5 5-5 5')}</button>
    <span class="lightbox__count text-sm font-bold" aria-live="polite"></span>`;
  document.body.append(dialog);

  // Крестик или клик по фону — закрыть, стрелки — листать (Esc закрывает сам <dialog>)
  dialog.addEventListener('click', (e) => {
    if (swiped) {
      swiped = false;
      return;
    }
    const target = e.target as HTMLElement;
    const nav = target.closest<HTMLElement>('[data-step]');
    if (nav) step(Number(nav.dataset.step));
    else if (target.closest('[data-close]') || !target.closest('.lightbox__image')) dialog!.close();
  });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  // Свайп пальцем по картинке
  let startX: number | null = null;
  dialog.addEventListener('pointerdown', (e) => (startX = e.clientX));
  dialog.addEventListener('pointerup', (e) => {
    if (startX === null || images.length < 2) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) <= 50) return;
    step(dx < 0 ? 1 : -1);
    swiped = true;
    setTimeout(() => (swiped = false));
  });

  return dialog;
}

/** Открывает картинку на весь экран; если передан набор — между ними можно листать */
export function openLightbox(gallery: LightboxImage[], start = 0): void {
  if (!gallery.length) return;
  const el = ensureDialog();
  images = gallery;
  index = start;
  show();
  el.showModal();
}
