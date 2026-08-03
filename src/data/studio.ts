export interface StudioPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface DevelopmentTool {
  stage: string;
  title: string;
  description: string;
}

export const studioPrinciples: StudioPrinciple[] = [
  {
    number: '01',
    title: 'Продукт важнее набора функций',
    description:
      'Начинаем с задачи пользователя и ожидаемого результата. Технологии выбираем после того, как понятна цель продукта.',
  },
  {
    number: '02',
    title: 'AI — рабочий инструмент',
    description:
      'Используем AI для исследования, вариантов реализации и проверок, сохраняя инженерную ответственность за итоговое решение.',
  },
  {
    number: '03',
    title: 'Развитие небольшими этапами',
    description:
      'Делим работу на завершённые части, показываем результат и только после проверки переходим к следующему этапу.',
  },
];

export const developmentTools: DevelopmentTool[] = [
  {
    stage: 'Research',
    title: 'Исследуем',
    description: 'Собираем контекст, ограничения и варианты решения до начала реализации.',
  },
  {
    stage: 'Build',
    title: 'Создаём',
    description: 'Проектируем архитектуру и собираем продукт понятными независимыми блоками.',
  },
  {
    stage: 'Verify',
    title: 'Проверяем',
    description: 'Запускаем сборку, тестируем сценарии и фиксируем фактический результат этапа.',
  },
];
