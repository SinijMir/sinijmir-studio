const baseUrl = import.meta.env.BASE_URL;

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export const navigationItems: NavigationItem[] = [
  { label: 'Услуги', href: `${baseUrl}services/` },
  { label: 'Проекты', href: `${baseUrl}#projects` },
  { label: 'Как работаем', href: `${baseUrl}#process` },
  { label: 'О студии', href: `${baseUrl}about/` },
];

export const contactLink: NavigationItem = {
  label: 'Оставить заявку',
  href: `${baseUrl}request/`,
};
