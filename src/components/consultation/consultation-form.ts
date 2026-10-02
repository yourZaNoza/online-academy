// Форма «Получите консультацию»: маска телефона, проверка полей, отправка заявки на почту.
// Письмо отправляет public/api/send.php (на хостинге с PHP; в `npm run dev` отправка не работает).

import { CONTACTS } from '../../content/site';
import { initDropdown } from '../dropdown';

type FieldName = 'name' | 'phone' | 'email' | 'callTime' | 'message' | 'consent';

const MESSAGE_MAX = 500;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SEND_URL = '/api/send.php';

/** «9281234567» → «+7 (928) 123-45-67» */
function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (value.trim().startsWith('+7')) digits = digits.slice(1);
  else if (digits.length === 11 && /^[78]/.test(digits)) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (!digits) return '';

  let out = `+7 (${digits.slice(0, 3)}`;
  if (digits.length > 3) out += `) ${digits.slice(3, 6)}`;
  if (digits.length > 6) out += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) out += `-${digits.slice(8, 10)}`;
  return out;
}

const phoneDigits = (value: string): number => value.replace(/\D/g, '').length;

function validate(form: HTMLFormElement): Partial<Record<FieldName, string>> {
  const data = new FormData(form);
  const errors: Partial<Record<FieldName, string>> = {};
  const name = String(data.get('name') ?? '').trim();
  const phone = String(data.get('phone') ?? '');
  const email = String(data.get('email') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();

  if (name.length < 2) errors.name = 'Введите имя';
  if (phoneDigits(phone) !== 11) errors.phone = 'Введите номер полностью';
  if (!email) errors.email = 'Введите почту';
  else if (!EMAIL_RE.test(email)) errors.email = 'Проверьте адрес почты';
  if (!data.get('callTime')) errors.callTime = 'Выберите время звонка';
  if (!message) errors.message = 'Напишите ваше обращение';
  else if (message.length > MESSAGE_MAX) errors.message = `Не больше ${MESSAGE_MAX} символов`;
  if (!data.get('consent')) errors.consent = 'Нужно согласие на обработку данных';
  return errors;
}

function showErrors(form: HTMLFormElement, errors: Partial<Record<FieldName, string>>): void {
  form.querySelectorAll<HTMLElement>('[data-field]').forEach((field) => {
    const name = field.dataset.field as FieldName;
    const message = errors[name];
    field.classList.toggle('is-invalid', Boolean(message));
    const slot = field.querySelector<HTMLElement>('.field__error');
    if (slot) slot.textContent = message ?? '';
  });
}

export function initConsultationForm(form: HTMLFormElement): void {
  const phone = form.elements.namedItem('phone') as HTMLInputElement;
  const message = form.elements.namedItem('message') as HTMLTextAreaElement;
  const counter = form.querySelector<HTMLElement>('.field__counter');
  let submitted = false;

  form.querySelectorAll<HTMLElement>('[data-dropdown]').forEach(initDropdown);

  phone.addEventListener('input', () => {
    phone.value = formatPhone(phone.value);
  });

  message.addEventListener('input', () => {
    // Поле растёт вместе с текстом (до max-height из CSS)
    message.style.height = 'auto';
    message.style.height = `${message.scrollHeight}px`;
    if (!counter) return;
    counter.textContent = `${message.value.length} / ${MESSAGE_MAX}`;
    counter.classList.toggle('is-near-limit', message.value.length >= MESSAGE_MAX * 0.9);
  });

  // После первой попытки отправки — проверяем «на лету»
  form.addEventListener('input', () => {
    if (submitted) showErrors(form, validate(form));
  });

  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const status = form.querySelector<HTMLElement>('.form-error')!;
  const submitLabel = submit.textContent ?? '';
  let sending = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    submitted = true;
    const errors = validate(form);
    showErrors(form, errors);
    if (Object.keys(errors).length) {
      form.querySelector<HTMLElement>('.is-invalid :is(input:not([type="hidden"]), textarea, button)')?.focus();
      return;
    }

    sending = true;
    submit.disabled = true;
    submit.textContent = 'Отправляем…';
    status.hidden = true;

    try {
      const response = await fetch(SEND_URL, { method: 'POST', body: new FormData(form) });
      const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (!response.ok || !result?.ok) throw new Error(`Ошибка отправки: ${response.status}`);
    } catch (error) {
      console.error(error);
      // Введённые данные остаются в форме — можно попробовать ещё раз
      status.hidden = false;
      sending = false;
      submit.disabled = false;
      submit.textContent = submitLabel;
      return;
    }

    form.innerHTML = `
      <div class="form-success animate-fade-up" role="status">
        <h3 class="font-display font-bold text-2xl m-0">Спасибо, заявка отправлена!</h3>
        <p class="text-base m-0">Наш специалист свяжется с вами в ближайшее время.</p>
      </div>`;
  });
}

/** Сообщение об ошибке отправки — вставляется в разметку формы над кнопкой */
export function formErrorMarkup(): string {
  const tel = CONTACTS.hotline.replace(/[^\d+]/g, '');
  return `<p class="form-error text-sm font-semibold" role="alert" hidden>
    Похоже, на сервере возникли проблемы с отправкой. Позвоните нам напрямую
    <a href="tel:${tel}" class="underline underline-offset-2 whitespace-nowrap">${CONTACTS.hotline}</a>
  </p>`;
}
