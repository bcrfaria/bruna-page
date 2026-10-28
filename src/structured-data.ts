import { site } from './config';

const personId = new URL('/#profissional', site.url).href;
const websiteId = new URL('/#website', site.url).href;

interface PageSchemaOptions {
  canonical: string;
  title: string;
  description: string;
  pageType?: 'WebPage' | 'ContactPage';
  mainEntityIsPerson?: boolean;
  article?: {
    image: string;
    publishedDate?: Date;
    updatedDate?: Date;
  };
}

// Reuse one professional identity and only information already public on the site.
export function createPageSchema({
  canonical,
  title,
  description,
  pageType = 'WebPage',
  mainEntityIsPerson = false,
  article,
}: PageSchemaOptions) {
  const pageId = new URL('#pagina', canonical).href;
  const articleId = new URL('#artigo', canonical).href;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Person',
      '@id': personId,
      name: site.nome,
      jobTitle: 'Psicóloga',
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'CRP',
        value: site.crp.replace(/^CRP\s+/, ''),
      },
      url: site.url,
      telephone: `+${site.whatsapp}`,
      email: site.email,
      sameAs: [
        `https://instagram.com/${site.instagram}`,
        site.doctoralia,
      ].filter(Boolean),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: `${site.nome} · Psicologia`,
      url: site.url,
      publisher: { '@id': personId },
    },
    {
      '@type': pageType,
      '@id': pageId,
      name: title,
      description,
      url: canonical,
      isPartOf: { '@id': websiteId },
      author: { '@id': personId },
      ...(article
        ? { mainEntity: { '@id': articleId } }
        : mainEntityIsPerson ? { mainEntity: { '@id': personId } } : {}),
    },
  ];

  if (article) {
    graph.push({
      '@type': 'Article',
      '@id': articleId,
      headline: title.replace(/ \|.*$/, ''),
      description,
      image: article.image,
      datePublished: article.publishedDate?.toISOString(),
      dateModified: (article.updatedDate ?? article.publishedDate)?.toISOString(),
      author: { '@id': personId },
      publisher: { '@id': personId },
      mainEntityOfPage: { '@id': pageId },
      isPartOf: { '@id': websiteId },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
