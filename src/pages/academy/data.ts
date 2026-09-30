// Контент главной страницы. Чтобы добавить работу или отзыв — допишите объект в массив.

export type Tone = 'peach' | 'cream' | 'lavender';

export interface Work {
  /** Путь к картинке из public/, например '/images/works/1-klass/ivanova.jpg' */
  image?: string;
  title?: string;
  /** Иконка-заглушка, пока нет картинки */
  icon?: string;
  tone: Tone;
}

export interface Review {
  name: string;
  text: string;
  date: string;
  rating: number;
  link: string;
  /** Скриншот отзыва из соцсети (необязательно) */
  screenshot?: string;
}

export const GRADES = [1, 2, 3, 4, 5] as const;
export type Grade = (typeof GRADES)[number];

/** Класс, выбранный по умолчанию (как на макете) */
export const DEFAULT_GRADE: Grade = 5;

// Заглушки-плитки как на макете — заменяются реальными работами
const PLACEHOLDERS: Work[] = [
  { tone: 'peach', icon: '/icons/brush.svg' },
  { tone: 'cream' },
  { tone: 'cream' },
  { tone: 'lavender', icon: '/icons/picture.svg' },
  { tone: 'peach', icon: '/icons/gallery.svg' },
  { tone: 'cream' },
  { tone: 'lavender', icon: '/icons/nav.svg' },
  { tone: 'peach', icon: '/icons/person.svg' },
];

export const WORKS: Record<Grade, Work[]> = {
  1: PLACEHOLDERS,
  2: PLACEHOLDERS,
  3: PLACEHOLDERS,
  4: PLACEHOLDERS,
  5: PLACEHOLDERS,
};

export const LICENSES: { tone: Tone; icon: string; image?: string; title?: string }[] = [
  { tone: 'cream', icon: '/icons/camera.svg' },
  { tone: 'peach', icon: '/icons/gallery.svg' },
  { tone: 'lavender', icon: '/icons/point.svg' },
];

export const REVIEWS: Review[] = [
  {
    name: 'Наталия Лауэрвальд',
    text: 'Дочь занимается у вас в первом классе уже 9-й месяц, мы все очень довольны. Нравится структура — есть программа, всё чётко и понятно.',
    date: '01.01.2026',
    rating: 5,
    link: '#',
  },
  {
    name: 'Анастасия Бородина',
    text: 'Дочь уже около года занимается в художественной школе онлайн. Занятия проходят очень интересно, задают домашние задания.',
    date: '01.04.2025',
    rating: 5,
    link: '#',
  },
  {
    name: 'Елена Гольдберг',
    text: 'Занимаемся второй год. Замечательные преподаватели, отлично выстроенная система обратной связи. Программа академическая.',
    date: '01.04.2025',
    rating: 5,
    link: '#',
  },
];
