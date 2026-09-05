import { useEffect } from 'react';
import { PageId } from '../store/router';
import { PAGE_META } from '../data/pageMeta';

const BASE_URL = 'https://elitze.shop';
const KEYWORDS = 'AI platform, SaaS dashboard, AI automation tools, workflow builder, AI agents, business automation software, productivity platform, no-code automation, enterprise AI system, startup SaaS tools, intelligent workflow engine, scalable AI infrastructure, digital operations platform, AI business tools';

function upsertMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
  el.content = content;
}

function upsertProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
  el.content = content;
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el); }
  el.href = href;
}

export function SEO({ page }: { page: PageId }) {
  useEffect(() => {
    const meta = PAGE_META[page];
    const url = `${BASE_URL}/#${page}`;
    document.title = meta.title;
    upsertMeta('description', meta.description);
    upsertMeta('robots', page === 'admin' ? 'noindex,nofollow' : 'index,follow');
    upsertMeta('keywords', KEYWORDS);
    upsertMeta('author', 'Terrell Hall');
    upsertProperty('og:title', meta.title);
    upsertProperty('og:description', meta.description);
    upsertProperty('og:type', 'website');
    upsertProperty('og:site_name', 'Elitze One Stop Shop');
    upsertProperty('og:url', url);
    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', meta.title);
    upsertMeta('twitter:description', meta.description);
    upsertCanonical(url);
  }, [page]);
  return null;
}
