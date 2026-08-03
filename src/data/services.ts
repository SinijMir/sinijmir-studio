export type ServiceAccent = 'cyan' | 'blue' | 'violet' | 'indigo';

export interface Service {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  accent: ServiceAccent;
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Мобильные приложения',
    description:
      'Проектируем и разрабатываем мобильные продукты для Android и iOS — от проверки идеи до готового MVP.',
    technologies: ['Flutter', 'Android / iOS', 'MVP'],
    accent: 'cyan',
  },
  {
    number: '02',
    title: 'AI и автоматизация',
    description:
      'Встраиваем интеллектуальные функции и автоматизируем повторяющиеся процессы с помощью современных AI API.',
    technologies: ['OpenAI API', 'Gemini', 'Automation'],
    accent: 'blue',
  },
  {
    number: '03',
    title: 'Боты и backend',
    description:
      'Создаём Telegram-ботов, REST API и серверную основу, которая связывает интерфейс, данные и бизнес-логику.',
    technologies: ['Telegram Bot', 'REST API', 'Firebase'],
    accent: 'violet',
  },
  {
    number: '04',
    title: 'Запуск и поддержка',
    description:
      'Помогаем выпускать продукты, исправляем ошибки и развиваем существующие приложения после первой публикации.',
    technologies: ['Google Play', 'App Store', 'Bug fixing'],
    accent: 'indigo',
  },
];
