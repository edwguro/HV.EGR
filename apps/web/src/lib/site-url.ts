const fallbackSiteUrl = 'http://localhost:3100';

/**
 * Returns a safe canonical URL for metadata and sitemap generation.
 * Railway can expose build-time public variables as empty strings before a
 * public domain is assigned, so an empty value must not reach `new URL()`.
 */
export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) return fallbackSiteUrl;

  try {
    const url = new URL(configuredUrl);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return fallbackSiteUrl;
    }

    return url.origin;
  } catch {
    return fallbackSiteUrl;
  }
}
