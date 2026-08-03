export interface ContactChannel {
  id: string;
  type: 'messenger' | 'phone' | 'email' | 'location';
  service: string;
  handle: string;
  href: string;
  buttonLabel: string;
  external: boolean;
  primary: boolean;
}

export const telegramContact: ContactChannel = {
  id: 'telegram',
  type: 'messenger',
  service: 'Telegram',
  handle: '@sinijmir',
  href: 'https://t.me/sinijmir',
  buttonLabel: 'Обсудить проект',
  external: true,
  primary: true,
};

export const phoneContact: ContactChannel = {
  id: 'phone-primary',
  type: 'phone',
  service: 'Телефон',
  handle: '+7 (910) 900-99-42',
  href: 'tel:+79109009942',
  buttonLabel: 'Позвонить',
  external: false,
  primary: false,
};

export const emailContact: ContactChannel = {
  id: 'email-primary',
  type: 'email',
  service: 'Email',
  handle: 'sinijmir@gmail.com',
  href: 'mailto:sinijmir@gmail.com',
  buttonLabel: 'Написать на email',
  external: false,
  primary: false,
};

export const contactChannels = [telegramContact, phoneContact, emailContact] as const;

export const projectBriefPrompts = [
  'Что вы хотите создать или улучшить',
  'На какой стадии сейчас находится проект',
  'Какие платформы, сроки или ограничения уже известны',
] as const;
