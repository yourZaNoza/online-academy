import { $, asset } from '../../utils/dom';
import { initCarousel } from '../../utils/carousel';
import { openLightbox } from '../../utils/lightbox';
import { LICENSES, type License } from '../../content/academy';

const TONES = ['cream', 'peach', 'lavender'] as const;

function licenseCard(item: License, index: number): string {
  return `
    <li class="card card--${TONES[index % TONES.length]} license">
      <button type="button" class="license__open" data-index="${index}" aria-label="Открыть: ${item.title}">
        <img src="${asset(item.image)}" alt="${item.title}" class="license__image" loading="lazy" draggable="false" />
      </button>
    </li>`;
}

/** «Лицензии и грамоты»: карусель сканов, по клику документ открывается крупно */
export function initLicenses(section: HTMLElement): void {
  const track = $('.licenses__track', section);
  track.innerHTML = LICENSES.map(licenseCard).join('');
  initCarousel(section, $('.licenses__viewport', section), track, { loop: true });

  const gallery = LICENSES.map((item) => ({ src: item.image, alt: item.title }));
  track.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.license__open');
    if (btn) openLightbox(gallery, Number(btn.dataset.index));
  });
}
