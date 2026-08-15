import type { APIRoute } from 'astro';
import { toPublicUrl } from '../config/site';
import { getPublishedProjects } from '../lib/projects';
import { getPublishedServices } from '../lib/services';

const staticPaths = ['/', '/about/', '/services/', '/contact/', '/request/', '/privacy/'];

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async () => {
  const projects = await getPublishedProjects();
  const services = await getPublishedServices();
  const projectPaths = projects.map((project) => `/projects/${project.id}/`);
  const servicePaths = services.map((service) => `/services/${service.id}/`);
  const paths = [...staticPaths, ...projectPaths, ...servicePaths];
  const urls = paths
    .map((path) => `<url><loc>${escapeXml(toPublicUrl(path))}</loc></url>`)
    .join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
