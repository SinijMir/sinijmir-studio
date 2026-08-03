export interface NavigationItem {
  label: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { label: 'Услуги', href: '/#services' },
  { label: 'Проекты', href: '/#projects' },
  { label: 'Как работаем', href: '/#process' },
  { label: 'О студии', href: '/#about' },
];

export const contactLink: NavigationItem = {
  label: 'Обсудить проект',
  href: '/#contact',
};
