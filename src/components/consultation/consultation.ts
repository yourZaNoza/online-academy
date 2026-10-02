// Блок «Получите консультацию»: форма обратной связи и пояснение справа.
// Используется на страницах «Академия» и «Связь».
// В HTML достаточно пустой секции: <section class="section section--paper consult" id="consultation"></section>

import { CONTACTS } from '../../content/site';
import { formErrorMarkup, initConsultationForm } from './consultation-form';
import { $ } from '../../utils/dom';
import './consultation.css';

export function renderConsultation(root: HTMLElement): void {
  const phoneHref = CONTACTS.phone.replace(/[^\d+]/g, '');

  root.innerHTML = `
      <span class="blob blob--peach" style="width: 520px; height: 320px; top: -200px; left: 26%"></span>
      <span class="blob blob--peach" style="width: 300px; height: 300px; bottom: -120px; left: -140px"></span>
      <span class="blob blob--yellow" style="width: 460px; height: 300px; bottom: -150px; right: -80px"></span>

      <div class="container consult__grid">
        <div class="form-card" data-reveal>
          <img src="/icons/Star%205.svg" alt="" class="deco deco--star-violet animate-spin-c [animation-delay:-5s]" aria-hidden="true" />
          <h2 class="font-display font-bold text-2xl sm:text-3xl m-0">Получите консультацию</h2>
          <form class="form text-sm font-semibold" id="consultation-form" novalidate>
            <label class="field" data-field="name">
              <input type="text" name="name" placeholder="Ваше имя" autocomplete="name" aria-label="Ваше имя" />
              <span class="field__error text-xs"></span>
            </label>
            <label class="field" data-field="phone">
              <span class="field__flag" aria-hidden="true"></span>
              <input type="tel" name="phone" placeholder="Телефон" autocomplete="tel" inputmode="tel" aria-label="Телефон" />
              <span class="field__error text-xs"></span>
            </label>
            <label class="field" data-field="email">
              <input type="email" name="email" placeholder="Email" autocomplete="email" aria-label="Email" />
              <span class="field__error text-xs"></span>
            </label>
            <div class="field field--select" data-field="callTime">
              <svg class="field__icon" viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 5.5V10l3 2"/></svg>
              <div class="dropdown" data-dropdown>
                <input type="hidden" name="callTime" value="" />
                <button type="button" class="dropdown__toggle" aria-haspopup="listbox" aria-expanded="false" aria-label="Удобное время звонка">
                  <span class="dropdown__value">Удобное время звонка</span>
                  <svg class="dropdown__chevron" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>
                </button>
                <ul class="dropdown__list" role="listbox" tabindex="-1" aria-label="Удобное время звонка">
                  <li role="option" data-value="9-12" data-label="Утром, 9:00 – 12:00" aria-selected="false">
                    <span class="dropdown__option-title">Утром</span><span class="dropdown__option-note">9:00 – 12:00</span>
                  </li>
                  <li role="option" data-value="12-15" data-label="Днём, 12:00 – 15:00" aria-selected="false">
                    <span class="dropdown__option-title">Днём</span><span class="dropdown__option-note">12:00 – 15:00</span>
                  </li>
                  <li role="option" data-value="15-18" data-label="Вечером, 15:00 – 18:00" aria-selected="false">
                    <span class="dropdown__option-title">Вечером</span><span class="dropdown__option-note">15:00 – 18:00</span>
                  </li>
                </ul>
              </div>
              <span class="field__error text-xs"></span>
            </div>
            <label class="field field--textarea" data-field="message">
              <textarea name="message" rows="3" maxlength="500" placeholder="Ваше обращение" aria-label="Ваше обращение" aria-describedby="message-counter"></textarea>
              <span class="field__counter text-xs" id="message-counter" aria-live="polite">0 / 500</span>
              <span class="field__error text-xs"></span>
            </label>
            <label class="consent text-xs font-medium leading-normal" data-field="consent">
              <input type="checkbox" name="consent" />
              <span>
                Соглашаюсь на обработку моих персональных данных в соответствии с
                <a href="${CONTACTS.links.privacy}" class="font-bold underline underline-offset-2" target="_blank">Политикой обработки персональных данных</a> и
                <a href="${CONTACTS.links.consent}" class="font-bold underline underline-offset-2" target="_blank">Согласием</a>.
              </span>
              <span class="field__error text-xs"></span>
            </label>
            <!-- Ловушка для спам-ботов: людям не видна -->
            <input type="text" name="website" class="form-trap" tabindex="-1" autocomplete="off" aria-hidden="true" />
            ${formErrorMarkup()}
            <button type="submit" class="btn text-sm font-bold uppercase tracking-wide">Отправить</button>
          </form>
        </div>

        <div class="consult__aside text-base xl:text-[17px] leading-snug" data-reveal data-reveal-delay="150">
          <p>
            Заполните форму, и наш специалист свяжется с вами, проведёт презентацию и проконсультирует по
            интересующим вас&nbsp;вопросам.
          </p>
          <p>Или позвоните по телефону <a href="tel:${phoneHref}" class="font-extrabold whitespace-nowrap">${CONTACTS.phone}</a></p>
          <figure class="artwork">
            <img
              src="/images/image%2011.png"
              alt="Работа ученика академии: натюрморт с самоваром, кувшинами и фруктами"
              class="artwork__img"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
`;

  initConsultationForm($<HTMLFormElement>('#consultation-form', root));
}
