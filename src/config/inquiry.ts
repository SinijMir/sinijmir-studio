export const inquiryConfig = {
  endpoint: 'https://sinijmir-telegram-leads.sidorovv581.workers.dev/',
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