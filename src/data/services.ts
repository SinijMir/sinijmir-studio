export type ServiceAccent = 'cyan' | 'blue' | 'violet' | 'indigo';

export interface Service {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  deliverables: string[];
  bestFor: string;
  accent: ServiceAccent;
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Мобильные приложения',
    description:
      'Проектируем и разрабатываем мобильные продукты для Android и iOS — от проверки идеи до готового MVP.',
    technologies: ['Flutter', 'Android / iOS', 'MVP'],
    deliverables: ['Прототип и MVP', 'Flutter-приложение', 'Подготовка к публикации'],
    bestFor: 'Новых продуктов и развития существующих мобильных приложений.',
    accent: 'cyan',
  },
  {
    number: '02',
    title: 'AI и автоматизация',
    description:
      'Встраиваем интеллектуальные функции и автоматизируем повторяющиеся процессы с помощью современных AI API.',
    technologies: ['OpenAI API', 'Gemini', 'Automation'],
    deliverables: ['AI-функции в продукте', 'Интеграция внешних API', 'Автоматизация сценариев'],
    bestFor: 'Задач, где AI должен давать измеримую пользу, а не существовать ради тренда.',
    accent: 'blue',
  },
  {
    number: '03',
    title: 'Боты и backend',
    description:
      'Создаём Telegram-ботов, REST API и серверную основу, которая связывает интерфейс, данные и бизнес-логику.',
    technologies: ['Telegram Bot', 'REST API', 'Firebase'],
    deliverables: ['Сценарии Telegram-бота', 'REST API', 'Интеграция данных и логики'],
    bestFor: 'Сервисов, которым нужны автоматизированное общение и серверная основа.',
    accent: 'violet',
  },
  {
    number: '04',
    title: 'Запуск и поддержка',
    description:
      'Помогаем выпускать продукты, исправляем ошибки и развиваем существующие приложения после первой публикации.',
    technologies: ['Google Play', 'App Store', 'Bug fixing'],
    deliverables: ['Диагностика ошибок', 'Обновление зависимостей', 'Подготовка релизной сборки'],
    bestFor: 'Приложений, которым нужны исправления, обновление или следующий стабильный релиз.',
    accent: 'indigo',
  },
];
