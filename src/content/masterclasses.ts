// Мастер-классы. Чтобы добавить мастер-класс или поменять цену — допишите объект в массив.
// Обложка: положите картинку в public/images/ и впишите путь в image, например '/images/winter.png'.
// Пока image пустой — на обложке иконка icon.
// program — этапы и шаги для блока «Подробнее». Слово «Шаг N:» перед шагом добавляется само.

import type { CatalogItem, ProgramModule } from './types';

export interface Masterclass extends Omit<CatalogItem, 'priceNote'> {
  /** «2 часа» — показывается под ценой и в блоке «Подробнее» */
  duration: string;
  format: string;
  program: ProgramModule[];
}

const RAW: Masterclass[] = [
  {
    title: 'Гуси в лаванде',
    description: 'Работа в технике масло с использованием мастихина. Импрессионизм.',
    age: 16,
    audience: ['adults'],
    price: 2900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'lavender',
    icon: '/icons/brush.svg',
    image: '/images/gooses.png',
    program: [
      { title: 'Этап 1: подготовка', lessons: ['Холст, масло и мастихин', 'Эскиз композиции'] },
      { title: 'Этап 2: живопись мастихином', lessons: ['Фон и лавандовое поле', 'Фигуры гусей', 'Блики и финальные акценты'] },
    ],
  },
  {
    title: 'Каналы Венеции',
    description: 'Живописные просторы чарующего города Венеция.',
    age: 10,
    audience: ['adults', 'beginners'],
    price: 2900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'cream',
    icon: '/icons/picture.svg',
    image: '/images/kanaly-venecii.png',
    program: [
      { title: 'Этап 1: композиция', lessons: ['Перспектива канала', 'Эскиз домов и воды'] },
      { title: 'Этап 2: цвет', lessons: ['Небо и вода', 'Фасады и отражения', 'Детали и лодки'] },
    ],
  },
  {
    title: 'Зимняя сказка',
    description: 'Зимний пейзаж, заряженный магией предстоящего чуда Нового Года.',
    age: 14,
    audience: ['beginners'],
    price: 2900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'lavender',
    icon: '/icons/gallery.svg',
    image: '/images/winter.png',
    program: [
      { title: 'Этап 1: подготовка', lessons: ['Материалы и палитра', 'Эскиз пейзажа'] },
      { title: 'Этап 2: зимний пейзаж', lessons: ['Небо и снежные сугробы', 'Домик и ели', 'Свет в окнах и снегопад'] },
    ],
  },
  {
    title: 'Репродукция «Звездная ночь»',
    description: 'Репродукция великой картины Винцента Ван Гога.',
    age: 10,
    audience: ['adults'],
    price: 2900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'lavender',
    icon: '/icons/picture.svg',
    image: '/images/staringnight.png',
    program: [
      { title: 'Этап 1: знакомство с картиной', lessons: ['История и композиция', 'Перенос рисунка на холст'] },
      { title: 'Этап 2: живопись в манере Ван Гога', lessons: ['Закрученное небо', 'Город и кипарис', 'Звёзды и луна'] },
    ],
  },
  {
    title: 'Графический образ дерева. Силуэт.',
    description: 'Графика и работа с формами, размышление о природе деревьев через силуэт.',
    age: 14,
    audience: ['kids', 'beginners'],
    price: 2900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'cream',
    icon: '/icons/brush.svg',
    image: '/images/tree.png',
    program: [
      { title: 'Этап 1: наблюдение', lessons: ['Формы деревьев', 'Силуэт и пятно'] },
      { title: 'Этап 2: графика', lessons: ['Композиция из деревьев', 'Фактура и орнамент', 'Финальная подача'] },
    ],
  },
  {
    title: 'Батик',
    description: 'Рисунок на поверхности ткани в стиле тропической природы.',
    age: 14,
    audience: ['adults', 'applicants'],
    price: 3200,
    duration: '3 часа',
    format: 'видео-урок',
    tone: 'peach',
    icon: '/icons/nav.svg',
    image: '',
    program: [
      { title: 'Этап 1: подготовка', lessons: ['Ткань, рама и краски', 'Эскиз тропического мотива'] },
      { title: 'Этап 2: роспись', lessons: ['Резерв по контуру', 'Заливка цветом', 'Закрепление рисунка'] },
    ],
  },
  {
    title: 'Оливки, лимоны, гранаты - барельеф',
    description: 'Три композиции к разбору на выбор. В технике: масло, золотая паталь, мастихин.',
    age: 16,
    audience: ['beginners', 'adults'],
    price: 2900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'lavender',
    icon: '/icons/brush.svg',
    image: '',
    program: [
      { title: 'Этап 1: подготовка', lessons: ['Выбор композиции', 'Рельеф пастой'] },
      { title: 'Этап 2: живопись', lessons: ['Масло и мастихин', 'Золотая поталь', 'Финальные акценты'] },
    ],
  },
  {
    title: 'Витраж',
    description: 'Сказочный пейзаж на стекле с использованием французских витражных техник.',
    age: 14,
    audience: ['adults', 'applicants'],
    price: 6900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'cream',
    icon: '/icons/picture.svg',
    image: '',
    program: [
      { title: 'Этап 1: эскиз', lessons: ['Сюжет сказочного пейзажа', 'Перенос на стекло'] },
      { title: 'Этап 2: роспись стекла', lessons: ['Контур', 'Заливка витражными красками', 'Детали и сушка'] },
    ],
  },
  {
    title: 'Маска папье-маше',
    description: 'Декоративная маска в стиле венецианского карнавала.',
    age: 9,
    audience: ['kids', 'beginners'],
    price: 3500,
    duration: '3 часа',
    format: 'видео-урок',
    tone: 'peach',
    icon: '/icons/point.svg',
    image: '',
    program: [
      { title: 'Этап 1: основа', lessons: ['Форма маски', 'Слои папье-маше'] },
      { title: 'Этап 2: декор', lessons: ['Грунт и основной цвет', 'Роспись в венецианском стиле', 'Украшения'] },
    ],
  },
  {
    title: 'Скульптуры',
    description: 'Фрукты, фантастические и домашние животные, ваза с букетом, шкатулки — без художественного опыта.',
    age: 16,
    audience: ['beginners', 'kids'],
    price: 4900,
    duration: '4 часа',
    format: 'видео-урок',
    tone: 'lavender',
    icon: '/icons/brush.svg',
    image: '',
    program: [
      { title: 'Этап 1: основы лепки', lessons: ['Материал и инструменты', 'Простые формы'] },
      { title: 'Этап 2: работа на выбор', lessons: ['Фрукты или ваза с букетом', 'Животные', 'Шкатулка и роспись'] },
    ],
  },
];

export const MASTERCLASSES = RAW.map((item) => ({ ...item, priceNote: `длительность - ${item.duration}` }));
