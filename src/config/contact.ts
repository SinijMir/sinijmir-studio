export interface ContactChannel {
  service: string;
  handle: string;
  href: string;
  buttonLabel: string;
}

export const telegramContact: ContactChannel = {
  service: 'Telegram',
  handle: '@sinijmir',
  href: 'https://t.me/sinijmir',
  buttonLabel: 'Обсудить проект',
};

export const projectBriefPrompts = [
  'Что вы хотите создать или улучшить',
  'На какой стадии сейчас находится проект',
  'Какие платформы, сроки или ограничения уже известны',
] as const;
