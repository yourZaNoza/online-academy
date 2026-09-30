import { $, asset } from '../../utils/dom';
import { REVIEWS, type Review } from './data';

const TONES = ['orange', 'dark', 'yellow'] as const;

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

function reviewCard(review: Review, index: number): string {
  const tone = TONES[index % TONES.length];
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  const shot = review.screenshot
    ? `<img src="${asset(review.screenshot)}" alt="Скриншот отзыва" loading="lazy" />`
    : '';

  return `
    <article class="review review--${tone}">
      <header class="review__author">
        <span class="review__avatar text-xs font-bold">${initials(review.name)}</span>
        <span class="text-sm font-bold">${review.name}</span>
      </header>
      <p class="review__text text-lg leading-tight">${review.text}</p>
      <a href="${review.link}" class="text-xs font-bold underline underline-offset-2">Перейти к отзыву</a>
      <div class="review__shot">${shot}</div>
      <footer class="review__meta text-xs font-bold">
        <span class="tracking-widest" aria-label="Оценка ${review.rating} из 5">${stars}</span>
        <time>${review.date}</time>
      </footer>
    </article>`;
}

/** Слайдер отзывов: стрелки, счётчик и свайп на телефоне */
export function initReviews(section: HTMLElement): void {
  const viewport = $('.reviews__viewport', section);
  const track = $('.reviews__track', section);
  const prev = $<HTMLButtonElement>('[data-prev]', section);
  const next = $<HTMLButtonElement>('[data-next]', section);
  const counter = $('[data-counter]', section);

  track.innerHTML = REVIEWS.map(reviewCard).join('');
  const cards = Array.from(track.children) as HTMLElement[];
  let index = 0;

  const maxIndex = (): number => {
    const first = cards[0];
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const perView = Math.max(1, Math.round((viewport.clientWidth + gap) / (first.offsetWidth + gap)));
    return Math.max(0, cards.length - perView);
  };

  const update = (): void => {
    const max = maxIndex();
    index = Math.min(index, max);
    track.style.transform = `translateX(${-(cards[index]?.offsetLeft ?? 0)}px)`;
    counter.textContent = `${index + 1} / ${max + 1}`;
    prev.disabled = index === 0;
    next.disabled = index === max;
  };

  const go = (step: number): void => {
    index = Math.min(Math.max(index + step, 0), maxIndex());
    update();
  };

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  window.addEventListener('resize', update);

  // Свайп пальцем
  let startX: number | null = null;
  viewport.addEventListener('pointerdown', (e) => (startX = e.clientX));
  viewport.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  });

  update();
}
