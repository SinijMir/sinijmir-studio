import { emailContact, phoneContact, telegramContact } from '../config/contact';
import { siteConfig, toPublicUrl } from '../config/site';

export type PageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
export type StructuredDataNode = Record<string, unknown>;

interface StructuredDataOptions {
  title: string;
  description: string;
  path: string;
  pageType?: PageType;
  extra?: StructuredDataNode[];
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildStructuredData({
  title,
  description,
  path,
  pageType = 'WebPage',
  extra = [],
}: StructuredDataOptions): StructuredDataNode {
  const homeUrl = toPublicUrl('/');
  const canonicalUrl = toPublicUrl(path);
  const organizationId = `${homeUrl}#organization`;
  const websiteId = `${homeUrl}#website`;
  const telephone = phoneContact.href.replace('tel:', '');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: siteConfig.name,
        alternateName: siteConfig.alternateName,
        description: siteConfig.description,
        url: homeUrl,
        logo: toPublicUrl(siteConfig.logoPath),
        telephone,
        email: emailContact.handle,
        sameAs: [telegramContact.href, siteConfig.githubUrl],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteConfig.name,
        alternateName: siteConfig.alternateName,
        url: homeUrl,
        inLanguage: siteConfig.language,
        publisher: { '@id': organizationId },
      },
      {
        '@type': pageType,
        '@id': `${canonicalUrl}#webpage`,
        name: title,
        description,
        url: canonicalUrl,
        inLanguage: siteConfig.language,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
      },
      ...extra,
    ],
  };
}

export function buildBreadcrumbList(items: BreadcrumbItem[]): StructuredDataNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toPublicUrl(item.path),
    })),
  };
}

export function serializeStructuredData(data: StructuredDataNode): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}
