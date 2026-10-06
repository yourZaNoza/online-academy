// Контент главной страницы. Чтобы добавить работу или отзыв — допишите объект в массив.

import type { Tone } from "./types";

export interface Work {
  /** Путь к картинке из public/, например '/images/works/1-klass/ivanova.jpg' */
  image?: string;
  title?: string;
  /** Иконка-заглушка, пока нет картинки */
  icon?: string;
  tone: Tone;
  /** Автор, возраст и преподаватель — для карточки на странице «Галерея» */
  author: WorkAuthor;
}

export interface WorkAuthor {
  /** Фамилия и имя ученика */
  name: string;
  /** Возраст на момент работы, лет */
  age: number;
  /** ФИО преподавателя */
  teacher: string;
}

/** Заготовка, пока у работы не указаны автор и преподаватель */
export const WORK_AUTHOR_PLACEHOLDER: WorkAuthor = {
  name: "Иванов Иван Иванович",
  age: 10,
  teacher: "Петров Петр Петрович",
};

export interface Review {
  name: string;
  text: string;
  date: string;
  rating: number;
  link: string;
  /** Фото к отзыву из public/ (необязательно) */
  photo?: string;
}

export const GRADES = [1, 2, 3, 4, 5] as const;
export type Grade = (typeof GRADES)[number];

/** Класс, выбранный по умолчанию (как на макете) */
export const DEFAULT_GRADE: Grade = 5;

/**
 * Работы класса из папки public/images/<папка>: [имя файла без .png, название, автор] — в порядке показа.
 * Автора можно не указывать — тогда на карточке в «Галерее» будет WORK_AUTHOR_PLACEHOLDER.
 */
const gallery = (dir: string, items: [string, string, WorkAuthor?][]): Work[] =>
  items.map(([file, title, author], i) => ({
    image: `/images/${dir}/${file}.png`,
    title,
    tone: (["peach", "cream", "lavender"] as const)[i % 3],
    author: author ?? WORK_AUTHOR_PLACEHOLDER,
  }));

export const WORKS: Record<Grade, Work[]> = {
  1: gallery("1_class", [
    ["image 49", "Яблоко в акварели"],
    ["image 48", "Овощи в акварели"],
    ["image 51", "Построение натюрморта"],
    ["image 56", "Стеклянная струя"],
    ["image 55", "Гора Кольцо"],
    ["image 46", "Натюрморт с вазой в акварели"],
    ["image 47", "Тыква в акварели"],
    [
      "image 54",
      "Декоративный натюрморт",
      {
        name: "Челнокова Кира",
        age: 10,
        teacher: "Трусова Виктория Викторовна",
      },
    ],
  ]),
  2: gallery("2_class", [
    ["image 41", "Город в графике"],
    ["image 45", "Декоративный натюрморт"],
    ["image 52", "Этюд: овощи на доске"],
    ["image 27", "Драпировка, рисунок"],
    ["image 40", "Натюрморт в акварекарандашли по-сырому"],
    ["image 43", "Композиция «Коллонада»"],
    ["image 50", "Геометрические тела"],
    ["image 39", "Натюрморт из трех предметов с драпировкой"],
  ]),
  3: gallery("3_class", [
    ["image 30", "Кувшин, куб и яблоко, рисунок"],
    ["image 23", "Лиса в пастели"],
    ["image 25", "Драпировка, акварель"],
    ["image 36", "Ваза и пиалы, рисунок"],
    ["image 24", "Натюрморт с цветами и тыквой"],
    ["image 28", "Натюрморт с вазой, грибом и рябиной"],
    ["image 35", "Тыквы и свеча"],
    ["image 33", "Натюрморт с чёрным кувшином и тыквой"],
  ]),
  4: gallery("4_class", [
    ["image 62", "Веранда с букетом и кошкой"],
    ["image 58", "Бутылка и кубы на фоне драпировки, рисунок"],
    ["image 22", "Ваза, куб и яблоко, рисунок"],
    ["image 37", "Декоративный натюрморт с чайником"],
    ["image 34", "Натюрморт с кофемолкой и кувшином"],
    ["image 29", "Нарзанная галерея"],
    ["image 31", "Город в графике"],
    ["image 26", "Натюрморт с парусником и ракушками"],
  ]),
  5: gallery("5_class", [
    ["image 14", "Натюрморт с кувшином, бутылкой и кубом"],
    ["image 15", "Русский натюрморт"],
    ["image 19", "Натюрморт с кувшином и тыквой"],
    ["image 61", "Аполлон Бельведерский в профиль"],
    ["image 17", "Декоративный натюрморт"],
    ["image 16", "Осьминог в морских водорослях"],
    ["image 57", "Осенний лес"],
    ["image 18", "Цапля в декоративном панно"],
  ]),
};

export interface License {
  /** Путь к скану из public/ */
  image: string;
  title: string;
}

// Чтобы добавить документ — положите файл в public/images/img_licenses и допишите строку
const LICENSE_DIR = "/images/img_licenses";
export const LICENSES: License[] = [
  {
    image: `${LICENSE_DIR}/реестр 1.png`,
    title: "Выписка из реестра лицензий, стр. 1",
  },
  {
    image: `${LICENSE_DIR}/реестр 2.png`,
    title: "Выписка из реестра лицензий, стр. 2",
  },
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => ({
    image: `${LICENSE_DIR}/грамота ${n}.jpg`,
    title: `Грамота ${n}`,
  })),
];

export const REVIEWS: Review[] = [
  {
    name: "Зоя Никифорова",
    text: "Потрясающая академия с великолепными преподавателями и бесконечно талантливыми детьми. Добрая и семейная атмосфера при этом никак не мешает профессиональному погружению в мир искусства.",
    date: "08.07.2025",
    rating: 5,
    link: "https://yandex.ru/maps/org/69341118567/reviews?reviews%5BpublicId%5D=zhamnzphw0d6k1bru2w0rr5qtg&si=jfger70b3bjny3zw3hf2j47x7m&utm_source=review",
    photo: "/images/reviews/nikiforova-zoya.jpg",
  },
  {
    name: "Елизавета Х",
    text: "Бесконечно рада, что мой ребёнок занимается в этой Академии искусств. Очень благодарна Елене Геннадьевне за то, что проявила участие и организовала занятия по рисованию для моего особенного ребёнка. Огромное спасибо нашему педагогу Татьяне Алексеевне за терпение и мягкость.",
    date: "27.01.2024",
    rating: 5,
    link: "https://yandex.ru/maps/org/69341118567/reviews?reviews%5BpublicId%5D=KhubievaElizaveta&si=jfger70b3bjny3zw3hf2j47x7m&utm_source=review",
  },
  {
    name: "Вероника Лященко",
    text: "Это лучшая академия города. Все преподаватели, профисионалы своего дела. Если вас тянет к искусству, лучше всего развивать его именно здесь",
    date: "21.06.2025",
    rating: 5,
    link: "https://yandex.ru/maps/org/69341118567/reviews?reviews%5BpublicId%5D=e29dqr5x20e0w971zzhvzg1c9c&si=jfger70b3bjny3zw3hf2j47x7m&utm_source=review",
    photo: "/images/reviews/lyashchenko.jpg",
  },
  {
    name: "Анна Джигарханова",
    text: "Трусовой Виктории Викторовне, Спасибо за ваш труд, вы преподаватель от бога, дай бог вам здоровья и долгих лет жизни!!!",
    date: "01.08.2026",
    rating: 5,
    link: "https://vk.ru/wall-219874819_424",
    photo: "/images/reviews/dzhigarkhanova.jpg",
  },
  {
    name: "Гриша Перельман",
    text: "Мы рады видеть, как наши дети находят себя через музыку, танцы и изобразительное искусство. Профессиональные педагоги создают тёплую и поддерживающую атмосферу, где наши дети раскрывают свои таланты и чувствуют себя в своей тарелке. Это место, где искусство становится важной частью их жизни, и мы благодарны за это каждый день",
    date: "03.02.2024",
    rating: 5,
    link: "https://yandex.ru/maps/org/69341118567/reviews?reviews%5BpublicId%5D=r3kc0dfphm1nbu4gf07d59cx8w&si=jfger70b3bjny3zw3hf2j47x7m&utm_source=review",
  },
  {
    name: "Faina Nikiforova",
    text: "Чудесная школа! В ней я смогла расширить не только свои навыки рисования, но и больше узнала о мире искусства. Преподаватели - настоящие профессионалы и прекрасные люди, которые всегда готовы помочь и обсудить любые вопросы.",
    date: "10.06.2025",
    rating: 5,
    link: "https://yandex.ru/maps/org/69341118567/reviews?reviews%5BpublicId%5D=ezvy8dey5wyb4ktbjwzwyqhjmr&si=jfger70b3bjny3zw3hf2j47x7m&utm_source=review",
    photo: "/images/reviews/nikiforova-faina.jpg",
  },
  {
    name: "Базилевс",
    text: "Был с дочкой на мастер-классе по рисованию. Академия понравилась. Внимательные педагоги.",
    date: "03.02.2024",
    rating: 5,
    link: "https://yandex.ru/maps/org/69341118567/reviews?reviews%5BpublicId%5D=213xjvh0d2cvj8uf8fawqhpanr&si=jfger70b3bjny3zw3hf2j47x7m&utm_source=review",
    photo: "/images/reviews/bazilevs.jpg",
  },
  {
    name: "Роман Рыжков",
    text: "Очень красивое чистое и опрятное место я рад что здесь учусь",
    date: "02.02.2024",
    rating: 5,
    link: "https://yandex.ru/maps/org/69341118567/reviews?reviews%5BpublicId%5D=7ec28w1cw1d67fzt89p94xq314&si=jfger70b3bjny3zw3hf2j47x7m&utm_source=review",
    photo: "/images/reviews/ryzhkov.jpg",
  },
];
