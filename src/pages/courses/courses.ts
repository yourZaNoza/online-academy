import { bootstrap } from '../../main';
import { $, asset } from '../../utils/dom';
import { plural, rub } from '../../utils/format';
import { initReveal } from '../../utils/reveal';
import { AUDIENCES, COURSES, PLANS, type Audience, type Course, type Plan } from './data';
import './courses.css';

bootstrap('courses');

// ---------- Каталог курсов ----------

type Filter = Audience | 'all';

function courseCard(course: Course, index: number): string {
  const cover = course.image
    ? `<img src="${asset(course.image)}" alt="" class="course__image" loading="lazy" />`
    : `<img src="${asset(course.icon)}" alt="" class="course__icon" />`;
  const tags = course.audience
    .map((a) => `<li class="course__tag text-xs font-extrabold uppercase">${AUDIENCES[a]}</li>`)
    .join('');

  return `
    <article class="course animate-fade-up" style="animation-delay:${index * 50}ms">
      <span class="course__age text-sm font-extrabold uppercase">от ${course.age} лет</span>
      <div class="course__cover course__cover--${course.tone}">${cover}</div>
      <ul class="course__tags">${tags}</ul>
      <h3 class="font-display font-bold text-2xl leading-tight m-0">${course.title}</h3>
      <p class="course__text text-sm leading-normal">${course.description}</p>
      <div class="course__footer">
        <div>
          <p class="font-display font-extrabold text-lg leading-none m-0">${rub(course.price)}</p>
          <p class="text-xs font-semibold text-ink-soft m-0 mt-1">${course.priceNote}</p>
        </div>
        <a href="${course.href}" class="btn btn--sm text-sm font-bold">Подробнее</a>
      </div>
    </article>`;
}

function initCatalog(): void {
  const filters = $('#course-filters');
  const grid = $('#course-grid');
  const counter = $('#course-count');
  let current: Filter = 'all';

  const options: [Filter, string][] = [['all', 'Все курсы'], ...(Object.entries(AUDIENCES) as [Audience, string][])];
  filters.innerHTML = options
    .map(
      ([id, label]) =>
        `<button type="button" class="pill text-sm font-bold" role="tab" data-filter="${id}" aria-selected="${id === current}">${label}</button>`,
    )
    .join('');

  const render = (): void => {
    const list = current === 'all' ? COURSES : COURSES.filter((c) => c.audience.includes(current as Audience));
    counter.textContent = `${list.length} ${plural(list.length, ['курс', 'курса', 'курсов'])}`;
    grid.innerHTML = list.length
      ? list.map(courseCard).join('')
      : `<p class="courses__empty text-lg font-semibold animate-fade-in">Скоро здесь появятся новые курсы. Оставьте заявку — подберём программу индивидуально.</p>`;
    filters.querySelectorAll<HTMLButtonElement>('.pill').forEach((btn) => {
      btn.setAttribute('aria-selected', String(btn.dataset.filter === current));
    });
  };

  filters.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.pill');
    if (!btn || btn.dataset.filter === current) return;
    current = btn.dataset.filter as Filter;
    render();
  });

  render();
}

// ---------- Форматы обучения ----------

function planCard(plan: Plan, index: number): string {
  const features = plan.features
    .map((item) => `<li class="${item.included ? 'is-included' : 'is-excluded'}">${item.text}</li>`)
    .join('');

  const price =
    typeof plan.price === 'string'
      ? `<p class="plan__free font-display font-extrabold text-2xl leading-tight m-0">${plan.price}</p>`
      : `<p class="plan__old font-display font-semibold text-2xl line-through m-0">${rub(plan.price.old)}</p>
         <p class="plan__extra font-display font-extrabold text-4xl leading-none whitespace-nowrap m-0">+ ${rub(plan.price.extra)}</p>
         <p class="font-display font-bold text-lg m-0">к стоимости курса</p>`;

  return `
    <article class="plan card card--${plan.tone}" data-reveal data-reveal-delay="${index * 100}">
      <img src="${asset(plan.decor)}" alt="" class="plan__decor" aria-hidden="true" />
      <h3 class="plan__name plan__name--${plan.badge} font-display font-extrabold text-2xl xl:text-[28px] whitespace-nowrap m-0">${plan.name}</h3>
      <ul class="plan__features text-[15px] font-semibold leading-snug">${features}</ul>
      <div class="plan__price">${price}</div>
      <a href="/#consultation" class="btn text-sm font-bold uppercase tracking-wide">Оставить заявку</a>
    </article>`;
}

function renderPlans(): void {
  $('#plans-grid').innerHTML = PLANS.map(planCard).join('');
  $('#plans-count').textContent = `${PLANS.length} ${plural(PLANS.length, ['тариф', 'тарифа', 'тарифов'])}`;
}

initCatalog();
renderPlans();
initReveal();
