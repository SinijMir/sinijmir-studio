import type { APIRoute } from 'astro';
import { toPublicUrl } from '../config/site';

export const GET: APIRoute = () => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${toPublicUrl('/sitemap.xml')}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
