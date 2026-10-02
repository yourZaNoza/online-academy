// Форматы обучения (тарифы).

import { PLANS, type Plan } from '../../content/plans';
import { $, asset } from '../../utils/dom';
import { plural, rub } from '../../utils/format';

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

export function renderPlans(): void {
  $('#plans-grid').innerHTML = PLANS.map(planCard).join('');
  $('#plans-count').textContent = `${PLANS.length} ${plural(PLANS.length, ['тариф', 'тарифа', 'тарифов'])}`;
}
