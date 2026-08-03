import { telegramContact } from './contact';

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export const navigationItems: NavigationItem[] = [
  { label: 'Услуги', href: '/services/' },
  { label: 'Проекты', href: '/#projects' },
  { label: 'Как работаем', href: '/#process' },
  { label: 'О студии', href: '/about/' },
];

export const contactLink: NavigationItem = {
  label: telegramContact.buttonLabel,
  href: telegramContact.href,
  external: true,
};
