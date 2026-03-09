import { MetadataRoute } from 'next';
import { getProducts } from '@/data/products';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the environment variable, or fallback to the production URL. You can adjust this URL as needed.
  const baseUrl ='https://vyanzo.be';
  // The base app routes available
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/services',
    '/sustainability',
    '/contact',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    // Add static pages for each locale
    for (const route of staticRoutes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    }

    // Add dynamic product pages for each locale
    try {
      const products = await getProducts(locale);
      for (const product of products) {
        if (product.slug) {
          sitemapEntries.push({
            url: `${baseUrl}/${locale}/products/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
          });
        }
      }
    } catch (e) {
      console.error(`Failed to generate sitemap entries for locale ${locale}:`, e);
    }
  }

  return sitemapEntries;
}
