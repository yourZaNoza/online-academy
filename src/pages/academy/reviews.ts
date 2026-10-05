import { $, asset } from '../../utils/dom';
import { REVIEWS, type Review } from '../../content/academy';
import { initCarousel } from '../../utils/carousel';

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
  const track = $('.reviews__track', section);
  track.innerHTML = REVIEWS.map(reviewCard).join('');
  initCarousel(section, $('.reviews__viewport', section), track);
}
