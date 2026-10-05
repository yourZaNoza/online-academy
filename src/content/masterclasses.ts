// Мастер-классы. Чтобы добавить мастер-класс или поменять цену — допишите объект в массив.
// Обложка: положите картинку в public/images/master_class/ и впишите путь в image, например '/images/master_class/winter.jpg'.
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
    description: 'Композиция животных в поле в технике: акрил.',
    age: 16,
    audience: ['medium'],
    price: 2900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'peach',
    icon: '/icons/brush.svg',
    image: '/images/master_class/gooses.jpg',
    imagePosition: '50% 30%',
    program: [
      { title: 'Этап 1: подготовка', lessons: ['Холст, масло и мастихин', 'Эскиз композиции'] },
      { title: 'Этап 2: живопись мастихином', lessons: ['Фон и лавандовое поле', 'Фигуры гусей', 'Блики и финальные акценты'] },
    ],
  },
  {
    title: 'Каналы Венеции',
    description: 'Живописные просторы чарующего города Венеция в технике: масло',
    age: 10,
    audience: ['medium'],
    price: 2900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'cream',
    icon: '/icons/picture.svg',
    image: '/images/master_class/kanaly-venecii.jpg',
    program: [
      { title: 'Этап 1: композиция', lessons: ['Перспектива канала', 'Эскиз домов и воды'] },
      { title: 'Этап 2: цвет', lessons: ['Небо и вода', 'Фасады и отражения', 'Детали и лодки'] },
    ],
  },
  {
    title: 'Зимняя сказка',
    description: 'Зимний пейзаж, заряженный магией предстоящего чуда Нового Года в технике: масло',
    age: 14,
    audience: ['easy'],
    price: 2900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'lavender',
    icon: '/icons/gallery.svg',
    image: '/images/master_class/winter.jpg',
    program: [
      { title: 'Этап 1: подготовка', lessons: ['Материалы и палитра', 'Эскиз пейзажа'] },
      { title: 'Этап 2: зимний пейзаж', lessons: ['Небо и снежные сугробы', 'Домик и ели', 'Свет в окнах и снегопад'] },
    ],
  },
  {
    title: 'Репродукция «Звездная ночь»',
    description: 'Репродукция великой картины Винцента Ван Гога в технике: акрил',
    age: 10,
    audience: ['advanced'],
    price: 2900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'cream',
    icon: '/icons/picture.svg',
    image: '/images/master_class/night.jpg',
    program: [
      { title: 'Этап 1: знакомство с картиной', lessons: ['История и композиция', 'Перенос рисунка на холст'] },
      { title: 'Этап 2: живопись в манере Ван Гога', lessons: ['Закрученное небо', 'Город и кипарис', 'Звёзды и луна'] },
    ],
  },
  {
    title: 'Графический образ дерева. Силуэт.',
    description: 'Графика и работа с формами, размышление о природе деревьев через силуэт в технике: ручка, акриловые маркеры',
    age: 14,
    audience: ['easy'],
    price: 2900,
    duration: '2 часа',
    format: 'видео-урок',
    tone: 'lavender',
    icon: '/icons/brush.svg',
    image: '/images/master_class/tree.png',
    program: [
      { title: 'Этап 1: наблюдение', lessons: ['Формы деревьев', 'Силуэт и пятно'] },
      { title: 'Этап 2: графика', lessons: ['Композиция из деревьев', 'Фактура и орнамент', 'Финальная подача'] },
    ],
  },
  {
    title: 'Батик',
    description: 'Рисунок на поверхности ткани в стиле тропической природы в технике: роспись ткани',
    age: 14,
    audience: ['advanced'],
    price: 3200,
    duration: '4 часа',
    format: 'видео-урок',
    tone: 'peach',
    icon: '/icons/nav.svg',
    image: '/images/master_class/batick.jpg',
    program: [
      { title: 'Этап 1: подготовка', lessons: ['Ткань, рама и краски', 'Эскиз тропического мотива'] },
      { title: 'Этап 2: роспись', lessons: ['Резерв по контуру', 'Заливка цветом', 'Закрепление рисунка'] },
    ],
  },
  {
    title: 'Оливки и лимоны - барельеф',
    description: 'Две композиции к разбору на выбор в технике: масло, золотая паталь, мастихин.',
    age: 16,
    audience: ['easy'],
    price: 2900,
    duration: '4 часа',
    format: 'видео-урок',
    tone: 'lavender',
    icon: '/icons/brush.svg',
    image: '/images/master_class/olives_lemons.jpg',
    program: [
      { title: 'Этап 1: подготовка', lessons: ['Выбор композиции', 'Рельеф пастой'] },
      { title: 'Этап 2: живопись', lessons: ['Масло и мастихин', 'Золотая поталь', 'Финальные акценты'] },
    ],
  },
  {
    title: 'Витраж',
    description: 'Сказочный пейзаж на стекле с использованием французских витражных техник',
    age: 14,
    audience: ['medium'],
    price: 6900,
    duration: '4 часа',
    format: 'видео-урок',
    tone: 'cream',
    icon: '/icons/picture.svg',
    image: '/images/master_class/glass.jpg',
    imagePosition: '50% 38%',
    imageZoom: 1.18,
    program: [
      { title: 'Этап 1: эскиз', lessons: ['Сюжет сказочного пейзажа', 'Перенос на стекло'] },
      { title: 'Этап 2: роспись стекла', lessons: ['Контур', 'Заливка витражными красками', 'Детали и сушка'] },
    ],
  },
  {
    title: 'Маска папье-маше',
    description: 'Декоративная маска в стиле венецианского карнавала',
    age: 9,
    audience: ['medium'],
    price: 3500,
    duration: '4 часа',
    format: 'видео-урок',
    tone: 'peach',
    icon: '/icons/point.svg',
    image: '/images/master_class/mask.jpeg',
    program: [
      { title: 'Этап 1: основа', lessons: ['Форма маски', 'Слои папье-маше'] },
      { title: 'Этап 2: декор', lessons: ['Грунт и основной цвет', 'Роспись в венецианском стиле', 'Украшения'] },
    ],
  },
  {
    title: 'Гранаты',
    description: 'Фруктовый натюрморт в технике: масло, золотая паталь, мастихин.',
    age: 16,
    audience: ['easy'],
    price: 4900,
    duration: '3 часа',
    format: 'видео-урок',
    tone: 'lavender',
    icon: '/icons/brush.svg',
    image: '/images/master_class/promengranate.jpg',
    imagePosition: '50% 62%',
    program: [
      { title: 'Этап 1: подготовка', lessons: ['Эскиз натюрморта', 'Рельеф пастой'] },
      { title: 'Этап 2: живопись', lessons: ['Масло и мастихин', 'Золотая поталь', 'Финальные акценты'] },
    ],
  },
  {
    title: 'Велосипед в сирени',
    description: 'Нежный весенний этюд в технике: масло, золотая паталь.',
    age: 16,
    audience: ['easy'],
    price: 4900,
    duration: '3 часа',
    format: 'видео-урок',
    tone: 'lavender',
    icon: '/icons/brush.svg',
    image: '/images/master_class/bicycle.jpg',
    imagePosition: '50% 48%',
    program: [
      { title: 'Этап 1: подготовка', lessons: ['Эскиз этюда', 'Подмалёвок'] },
      { title: 'Этап 2: живопись', lessons: ['Сирень и велосипед', 'Золотая поталь', 'Финальные акценты'] },
    ],
  },
];

export const MASTERCLASSES = RAW.map((item) => ({ ...item, priceNote: `длительность - ${item.duration}` }));
