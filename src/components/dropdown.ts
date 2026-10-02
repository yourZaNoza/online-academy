// Выпадающий список в стиле сайта вместо системного <select>.
// Разметка: .dropdown > input[type=hidden] + button.dropdown__toggle + ul.dropdown__list > li[data-value].
// Выбранное значение пишется в скрытый input — его видит FormData, как обычное поле формы.

let uid = 0;

export function initDropdown(root: HTMLElement): void {
  const input = root.querySelector<HTMLInputElement>('input[type="hidden"]')!;
  const toggle = root.querySelector<HTMLButtonElement>('.dropdown__toggle')!;
  const valueEl = root.querySelector<HTMLElement>('.dropdown__value')!;
  const list = root.querySelector<HTMLUListElement>('.dropdown__list')!;
  const options = [...list.querySelectorAll<HTMLLIElement>('[role="option"]')];
  const placeholder = valueEl.textContent ?? '';
  let active = -1;

  const id = `dropdown-${++uid}`;
  list.id = `${id}-list`;
  toggle.setAttribute('aria-controls', list.id);
  options.forEach((option, i) => (option.id = `${id}-opt-${i}`));

  const isOpen = (): boolean => root.classList.contains('is-open');

  const highlight = (index: number): void => {
    active = Math.max(0, Math.min(index, options.length - 1));
    options.forEach((option, i) => option.classList.toggle('is-active', i === active));
    list.setAttribute('aria-activedescendant', options[active].id);
    options[active].scrollIntoView({ block: 'nearest' });
  };

  const open = (): void => {
    if (isOpen()) return;
    root.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    const selected = options.findIndex((o) => o.getAttribute('aria-selected') === 'true');
    highlight(selected === -1 ? 0 : selected);
    list.focus();
  };

  const close = (focusToggle = true): void => {
    if (!isOpen()) return;
    root.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    list.removeAttribute('aria-activedescendant');
    if (focusToggle) toggle.focus();
  };

  const select = (index: number): void => {
    const option = options[index];
    options.forEach((o) => o.setAttribute('aria-selected', String(o === option)));
    input.value = option.dataset.value ?? '';
    valueEl.textContent = option.dataset.label ?? option.textContent?.trim() ?? '';
    root.classList.add('has-value');
    // Чтобы форма могла перепроверить поля, как при обычном вводе
    input.dispatchEvent(new Event('input', { bubbles: true }));
    close();
  };

  toggle.addEventListener('click', () => (isOpen() ? close() : open()));

  toggle.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      open();
    }
  });

  list.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowDown':
        highlight(active + 1);
        break;
      case 'ArrowUp':
        highlight(active - 1);
        break;
      case 'Home':
        highlight(0);
        break;
      case 'End':
        highlight(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        select(active);
        break;
      case 'Escape':
        close();
        break;
      case 'Tab':
        close(false);
        return;
      default:
        return;
    }
    e.preventDefault();
  });

  list.addEventListener('mousemove', (e) => {
    const index = options.indexOf((e.target as HTMLElement).closest('li')!);
    if (index !== -1 && index !== active) highlight(index);
  });

  list.addEventListener('click', (e) => {
    const index = options.indexOf((e.target as HTMLElement).closest('li')!);
    if (index !== -1) select(index);
  });

  document.addEventListener('pointerdown', (e) => {
    if (!root.contains(e.target as Node)) close(false);
  });

  // Сброс формы возвращает подсказку
  input.form?.addEventListener('reset', () => {
    input.value = '';
    valueEl.textContent = placeholder;
    root.classList.remove('has-value');
    options.forEach((o) => o.setAttribute('aria-selected', 'false'));
  });
}
