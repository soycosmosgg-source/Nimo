export async function onRequest() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nimogames.pages.dev/</loc>
    <lastmod>2025-10-31T12:09:55+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nimogames.pages.dev/privacy.html</loc>
    <lastmod>2025-10-27T13:01:50+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://nimogames.pages.dev/terms.html</loc>
    <lastmod>2025-10-27T13:01:50+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}
