import { $, asset } from '../../utils/dom';
import { REVIEWS, type Review } from '../../content/academy';
import { initCarousel } from '../../utils/carousel';

const TONES = ['orange', 'dark', 'yellow'] as const;

function reviewCard(review: Review, index: number): string {
  const tone = TONES[index % TONES.length];
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  const photo = review.photo
    ? `<div class="review__shot"><img src="${asset(review.photo)}" alt="Фото к отзыву" loading="lazy" /></div>`
    : '';

  return `
    <article class="review review--${tone}">
      <header class="review__author text-sm font-bold">${review.name}</header>
      <p class="review__text text-lg leading-tight">${review.text}</p>
      <a href="${review.link}" target="_blank" rel="noopener" class="text-xs font-bold underline underline-offset-2">Перейти к отзыву</a>
      ${photo}
      <footer class="review__meta text-xs font-bold">
        <span class="tracking-widest" aria-label="Оценка ${review.rating} из 5">${stars}</span>
        <time>${review.date}</time>
      </footer>
    </article>`;
}

/** Слайдер отзывов: бесконечная прокрутка стрелками и свайпом */
export function initReviews(section: HTMLElement): void {
  const track = $('.reviews__track', section);
  track.innerHTML = REVIEWS.map(reviewCard).join('');
  initCarousel(section, $('.reviews__viewport', section), track, { loop: true });
}
