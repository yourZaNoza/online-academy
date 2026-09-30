/** 4900 → «4 900 ₽» */
export const rub = (value: number): string => `${value.toLocaleString('ru-RU')} ₽`;

/** plural(5, ['курс', 'курса', 'курсов']) → «курсов» */
export function plural(n: number, [one, few, many]: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}
