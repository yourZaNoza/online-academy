// Форма «Получите консультацию»: маска телефона, проверка полей, сообщение об успехе.
// Отправки на сервер пока нет — см. TODO в onSubmit.

type FieldName = 'name' | 'phone' | 'email' | 'consent';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  if (name.length < 2) errors.name = 'Введите имя';
  if (phoneDigits(phone) !== 11) errors.phone = 'Введите номер полностью';
  if (email && !EMAIL_RE.test(email)) errors.email = 'Проверьте адрес почты';
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
  let submitted = false;

  phone.addEventListener('input', () => {
    phone.value = formatPhone(phone.value);
  });

  // После первой попытки отправки — проверяем «на лету»
  form.addEventListener('input', () => {
    if (submitted) showErrors(form, validate(form));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitted = true;
    const errors = validate(form);
    showErrors(form, errors);
    if (Object.keys(errors).length) {
      form.querySelector<HTMLElement>('.is-invalid input')?.focus();
      return;
    }

    // TODO: отправить данные на сервер/в CRM, например fetch('/api/lead', { method: 'POST', body: new FormData(form) })
    form.innerHTML = `
      <div class="form-success animate-fade-up">
        <h3 class="font-display font-bold text-2xl m-0">Спасибо, заявка отправлена!</h3>
        <p class="text-base m-0">Наш специалист свяжется с вами в ближайшее время.</p>
      </div>`;
  });
}
