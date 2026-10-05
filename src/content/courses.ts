// Каталог курсов. Чтобы добавить курс или поменять цену — допишите объект в массив.
// Программа курса (модули и уроки) — в course-programs.ts.
// Обложка: положите картинку в public/images/courses/ и впишите путь в image, например '/images/courses/golova.jpg'.
// Пока image пустой — на обложке иконка icon.

import type { CatalogItem } from "./types";

export interface Course extends CatalogItem {
  /** Ссылка на страницу курса */
  href: string;
}

export const COURSES: Course[] = [
  {
    title: "Рисунок с нуля",
    description:
      "Постановка руки и штриховки, контроль линий, техника скетчинга, композиция линий, градации света и тени — без художественного опыта.",
    age: 9,
    audience: ["beginners", "easy"],
    price: 4900,
    priceNote: "за курс",
    tone: "peach",
    icon: "/icons/brush.svg",
    image: "/images/courses/risunok_s nula.png",
    imagePosition: "top",
    href: "#",
  },
  {
    title: "Маленький творец",
    description:
      "Программа для детей в доступной форме: знакомство с цветами, формами и первыми техниками.",
    age: 6,
    audience: ["beginners", "easy"],
    price: 3600,
    priceNote: "за курс",
    tone: "cream",
    icon: "/icons/point.svg",
    image: "/images/courses/malenkii_tvoretz.jpg",
    href: "#",
  },
  {
    title: "ПредПрофи. Поступление",
    description:
      "Продвинутый уровень для тех, кто хочет отточить мастерство и собрать портфолио для поступления на направления: дизайн, худграф.",
    age: 14,
    audience: ["applicants", "advanced"],
    price: 45900,
    priceNote: "за курс",
    tone: "lavender",
    icon: "/icons/picture.svg",
    image: "/images/courses/postuplenie.jpg",
    href: "#",
  },
  {
    title: "Композиция с нуля",
    description:
      "Основные законы создания картины, построение перспективы — без художественного опыта.",
    age: 9,
    audience: ["beginners", "easy"],
    price: 4900,
    priceNote: "за курс",
    tone: "cream",
    icon: "/icons/gallery.svg",
    image: "/images/courses/composizia_s_nula.png",
    href: "#",
  },
  {
    title: "Сказочный мир",
    description:
      "Набор работ по композиции с сюжетами популярных сказок: от замка доброй феи, до динозавров.",
    age: 6,
    audience: ["beginners", "easy"],
    price: 4600,
    priceNote: "за курс",
    tone: "lavender",
    icon: "/icons/message.svg",
    image: "/images/courses/skazochni_mir.jpg",
    href: "#",
  },
  {
    title: "Античная голова",
    description: "12 античных голов – пошаговое построение и штриховка",
    age: 14,
    audience: ["applicants", "advanced"],
    price: 16900,
    priceNote: "за курс",
    tone: "peach",
    icon: "/icons/nav.svg",
    image: "/images/courses/golova.jpg",
    href: "#",
  },
  {
    title: "Живопись с нуля",
    description:
      "Основы цветоведения, материалы, приемы живописи, лепка объема фигуры – без художественного опыта",
    age: 9,
    audience: ["beginners", "easy"],
    price: 4900,
    priceNote: "за курс",
    tone: "lavender",
    icon: "/icons/brush.svg",
    image: "/images/courses/zhivopis_s_nula.jpg",
    href: "#",
  },
  {
    title: "Изобразительная грамота '4 в 1'",
    description:
      "Основы академического рисунка, живописи, композиции и дизайна - без художественного опыта",
    age: 11,
    audience: ["medium"],
    price: 11500,
    priceNote: "за курс",
    tone: "peach",
    icon: "/icons/point.svg",
    image: "/images/courses/4in1.jpg",
    href: "#",
  },
  {
    title: "ПредПрофи. Акварель",
    description:
      "Работы в технике акварель - пошаговое продвижение к продвинутому уровню живописи. Для тех, кто уже знаком с основами живописи.",
    age: 14,
    audience: ["advanced"],
    price: 8900,
    priceNote: "за курс",
    tone: "cream",
    icon: "/icons/nav.svg",
    image: "/images/courses/ackvarel.jpg",
    href: "#",
  },
  {
    title: "Дизайн с нуля",
    description:
      "Стилизация объектов, шрифты, словообраз — без художественного опыта.",
    age: 11,
    audience: ["beginners", "easy"],
    price: 4900,
    priceNote: "за курс",
    tone: "peach",
    icon: "/icons/brush.svg",
    image: "/images/courses/design_s_nula.jpg",
    imagePosition: "top",
    href: "#",
  },
  {
    title: "На пути к мастеру",
    description:
      "Тематические натюрморты по рисунку, живописи. Композиции конкурсного уровня. Для тех, кто уже знаком с основами живописи.",
    age: 11,
    audience: ["medium"],
    price: 8500,
    priceNote: "за курс",
    tone: "cream",
    icon: "/icons/point.svg",
    image: "/images/courses/na_puti_k_masterstvu.jpg",
    href: "#",
  },
  {
    title: "ПредПрофи. Гуашь",
    description:
      "Работы в технике гуашь - пошаговое продвижение к продвинутому уровню живописи. Для тех, кто уже знаком с основами живописи.",
    age: 14,
    audience: ["advanced"],
    price: 8900,
    priceNote: "за курс",
    tone: "lavender",
    icon: "/icons/picture.svg",
    image: "/images/courses/guash.jpeg",
    href: "#",
  },
  {
    title: "Скульптура",
    description:
      "Материаловедение, передача формы, фактуры, детализация — без художественного опыта.",
    age: 9,
    audience: ["beginners", "easy"],
    price: 4900,
    priceNote: "за курс",
    tone: "peach",
    icon: "/icons/brush.svg",
    image: "/images/courses/skulpture_s_nula.jpg",
    href: "#",
  },
  {
    title: "Портрет с нуля",
    description:
      "Изучение анатомии человека, силуэт человека, написание портрета с нуля. Для тех, кто знаком с основами рисунка.",
    age: 11,
    audience: ["medium"],
    price: 7900,
    priceNote: "за курс",
    tone: "lavender",
    icon: "/icons/brush.svg",
    image: "/images/courses/portret.jpg",
    href: "#",
  },
  {
    title: "ПредПрофи. Графика",
    description:
      "Работы в технике карандаш, соус, уголь, тушь, перо. Для тех, кто уже знаком с основами рисунка.",
    age: 14,
    audience: ["advanced"],
    price: 10900,
    priceNote: "за курс",
    tone: "cream",
    icon: "/icons/picture.svg",
    image: "/images/courses/graphick.jpg",
    href: "#",
  },
];
