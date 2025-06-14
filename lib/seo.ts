// lib/seo.ts
import type { Locale } from './i18n'; // Assuming i18n.ts is in the same lib/ directory
import type { SEOData, SEOPages } from '../types';   // Assuming types/index.ts is one level up from lib/

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string; // Keywords can be optional

  // Open Graph meta tags
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;       // Absolute URL, optional
  ogImageAlt?: string;    // Optional

  // Twitter card meta tags
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;  // Absolute URL, optional
  twitterImageAlt?: string;// Optional

  // Other potential meta, like canonical
  canonicalUrl?: string; // Optional
}

export async function getSEOData(locale: Locale): Promise<SEOData | null> {
  const path = `../src/data/${locale}/seo.json`;
  try {
    const seoModule = await import(path);
    return seoModule.default as SEOData;
  } catch (error) {
    console.error(`Error loading SEO data for locale ${locale} from ${path}:`, error);
    // Optionally, attempt to load default language SEO data as a fallback
    if (locale !== 'en') { // Assuming 'en' is the defaultLang, consider importing defaultLang from './i18n'
      console.warn(`Attempting to load SEO data for default language 'en' as fallback.`);
      const fallbackPath = `../src/data/en/seo.json`;
      try {
        const fallbackSeoModule = await import(fallbackPath);
        return fallbackSeoModule.default as SEOData;
      } catch (fallbackError) {
        console.error(`Error loading fallback SEO data for locale 'en' from ${fallbackPath}:`, fallbackError);
        return null; // Failed to load both specific and fallback
      }
    }
    return null; // Failed to load specific locale and it was the default, or no fallback desired for non-default
  }
}

export async function generatePageMeta(
  pageName: string,
  locale: Locale,
  baseUrl: string
): Promise<PageMeta | null> {
  const seoData = await getSEOData(locale);

  if (!seoData || !seoData.pages) {
    console.warn(`No SEO data found for locale ${locale}.`);
    return null;
  }

  const pages = seoData.pages as SEOPages; // Cast to SEOPages to handle string index
  const pageDetails = pages[pageName as keyof SEOPages];

  if (!pageDetails) {
    console.warn(`No page-specific SEO details found for page '${pageName}' in locale '${locale}'.`);
    return null;
  }

  let absoluteOgImage: string | undefined = undefined;
  let absoluteTwitterImage: string | undefined = undefined;

  if (pageDetails.image) {
    try {
      // Ensure baseUrl ends with a slash if it doesn't have one, and image path doesn't start with one.
      const cleanBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
      const cleanImagePath = pageDetails.image.startsWith('/') ? pageDetails.image.substring(1) : pageDetails.image;
      const fullUrl = new URL(cleanImagePath, cleanBase).toString();
      absoluteOgImage = fullUrl;
      absoluteTwitterImage = fullUrl; // Assuming the same image for both, as in SEO.astro
    } catch (e) {
      console.error(`Error creating absolute image URL from base '${baseUrl}' and path '${pageDetails.image}':`, e);
    }
  }

  // Construct the PageMeta object
  // The SEO.astro component uses page.title for og:title and twitter:title,
  // and page.description for twitter:description. page.ogDescription is separate.
  const meta: PageMeta = {
    title: pageDetails.title,
    description: pageDetails.description,
    keywords: pageDetails.keywords,

    ogTitle: pageDetails.title, // Or a more specific field if available
    ogDescription: pageDetails.ogDescription || pageDetails.description, // Fallback to main description
    ogImage: absoluteOgImage,
    ogImageAlt: pageDetails.imageAlt,

    twitterTitle: pageDetails.title, // Or a more specific field
    twitterDescription: pageDetails.description, // Or twitterDescription field if available
    twitterImage: absoluteTwitterImage,
    twitterImageAlt: pageDetails.imageAlt,

    // Attempt to construct a canonical URL if site URL and page path are available
    // This is a common requirement but not explicitly in SEO.astro's direct output logic
    // canonicalUrl: new URL(Astro.url.pathname, seoData.site.url).toString(), // Example, would need Astro.url.pathname or equivalent
  };

  // Add canonical URL if site URL is available and we can form a page path
  // For now, let's assume pageName can be used as a simple path segment
  if (seoData.site && seoData.site.url) {
    try {
        const siteBase = seoData.site.url.endsWith('/') ? seoData.site.url : seoData.site.url + '/';
        // A simple approach for page path; might need more robust slugification or mapping
        const pagePath = pageName === 'index' ? '' : (pageName.startsWith('/') ? pageName.substring(1) : pageName);
        meta.canonicalUrl = new URL(pagePath, siteBase).toString();
    } catch(e) {
        console.error(`Error creating canonical URL from site base '${seoData.site.url}' and pageName '${pageName}':`, e);
    }
  }

  return meta;
}

// Placeholder for functions to be added in next steps
