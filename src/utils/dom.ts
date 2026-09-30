/** Находит элемент или бросает понятную ошибку, если разметка сломана. */
export function $<T extends HTMLElement = HTMLElement>(selector: string, scope: ParentNode = document): T {
  const el = scope.querySelector<T>(selector);
  if (!el) throw new Error(`Элемент не найден: ${selector}`);
  return el;
}

/** Путь к файлу из public/ — кодирует пробелы и кириллицу в имени. */
export const asset = (path: string): string => encodeURI(path);
