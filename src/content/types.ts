// Общие типы контента.

/** Цвет фона карточки/обложки */
export type Tone = 'peach' | 'cream' | 'lavender';

/** Для кого курс или мастер-класс — по этим меткам работают фильтры каталога */
export type Audience = 'kids' | 'adults' | 'applicants' | 'beginners' | 'masters';

export const AUDIENCES: Record<Audience, string> = {
  kids: 'Для детей',
  adults: 'Для взрослых',
  applicants: 'Для поступающих',
  beginners: 'Для начинающих',
  masters: 'Для мастеров',
};

/** Карточка каталога: курс или мастер-класс */
export interface CatalogItem {
  title: string;
  description: string;
  age: number;
  audience: Audience[];
  price: number;
  /** Подпись под ценой: «за курс», «за месяц», «длительность - 2 часа» */
  priceNote: string;
  tone: Tone;
  /** Иконка-заглушка на обложке, пока нет картинки */
  icon: string;
  /** Картинка обложки из public/ (необязательно) */
  image?: string;
}

/** Раздел программы в блоке «Подробнее»: модуль курса или этап мастер-класса */
export interface ProgramModule {
  title: string;
  lessons: string[];
}
