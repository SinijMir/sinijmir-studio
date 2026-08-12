export const inquiryConfig = {
  endpoint: 'https://functions.yandexcloud.net/d4eg1v6n6gghqmau8ak9',
  projectTypes: [
    'Мобильное приложение',
    'Telegram-бот',
    'AI-интеграция',
    'MVP продукта',
    'Автоматизация',
    'Поддержка или исправление ошибок',
    'Другая задача',
  ],
  limits: {
    name: 80,
    phone: 30,
    message: 2000,
  },
} as const;