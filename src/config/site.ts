export const siteConfig = {
  name: 'SinijMir Studio',
  alternateName: 'SinijMir',
  description:
    'Студия мобильной разработки, AI-интеграций, Telegram-ботов и автоматизации.',
  language: 'ru-RU',
  locale: 'ru_RU',
  origin: 'https://sinijmir.github.io',
  basePath: '/sinijmir-studio',
  publicUrl: 'https://sinijmir.github.io/sinijmir-studio',
  logoPath: '/branding/sinijmir-mark.png',
  socialImagePath: '/og.png',
  socialImageAlt: 'SinijMir Studio — Mobile, AI, Automation',
  telegramUrl: 'https://t.me/sinijmir',
} as const;

export function toPublicUrl(path = '/'): string {
  let normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (normalizedPath === siteConfig.basePath) {
    normalizedPath = '/';
  } else if (normalizedPath.startsWith(`${siteConfig.basePath}/`)) {
    normalizedPath = normalizedPath.slice(siteConfig.basePath.length);
  }

  if (normalizedPath === '/') {
    return `${siteConfig.publicUrl}/`;
  }

  return `${siteConfig.publicUrl}${normalizedPath}`;
}
