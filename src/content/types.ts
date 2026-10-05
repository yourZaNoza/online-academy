// Общие типы контента.

/** Цвет фона карточки/обложки */
export type Tone = 'peach' | 'cream' | 'lavender';

/** Метки карточки: для кого и какой уровень — по ним работают фильтры каталога */
export type Audience = 'beginners' | 'applicants' | 'easy' | 'medium' | 'advanced';

export const AUDIENCES: Record<Audience, string> = {
  beginners: 'Для начинающих',
  applicants: 'Для поступающих',
  easy: 'Легкий уровень',
  medium: 'Средний уровень',
  advanced: 'Продвинутый уровень',
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
  /** Какая часть картинки видна на обложке, если она не помещается целиком: 'top', 'bottom'. По умолчанию — центр */
  imagePosition?: string;
  /** Увеличение картинки на обложке, чтобы спрятать края (рамку): 1.2 — на 20% крупнее */
  imageZoom?: number;
  /** ФИО преподавателя; пока не указано — показывается TEACHER_PLACEHOLDER */
  teacher?: string;
}

/** Заготовка, пока у курса или мастер-класса не указан преподаватель */
export const TEACHER_PLACEHOLDER = 'Иванов Иван Иванович';

/** Раздел программы в блоке «Подробнее»: модуль курса или этап мастер-класса */
export interface ProgramModule {
  title: string;
  lessons: string[];
}
