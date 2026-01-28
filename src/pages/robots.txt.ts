import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site, url }) => {
  const siteUrl = site ?? url.origin;
  const sitemapUrl = new URL('sitemap-index.xml', siteUrl).href;

  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
