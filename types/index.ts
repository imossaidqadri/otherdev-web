// === Project Data Interfaces ===

export interface Testimonial {
  content: string;
  author: string;
}

export interface ProjectSection {
  heading: string;
  content: string;
  tags?: string[]; // Optional array of strings
}

export interface ProjectPage {
  excerpt: string;
  splitSections: ProjectSection[];
  upperSlideshow: string[];
  testimonial?: Testimonial; // Optional Testimonial object
  secondCover?: string; // Optional
}

export interface Project {
  id: string;
  title: string;
  company: string;
  hasPage: boolean;
  year: string;
  description: string;
  imageSrc: string;
  url?: string; // Optional
  coverImage?: string; // Optional
  coverImageAlt?: string; // Optional
  page?: ProjectPage; // Optional ProjectPage object
}

// === Service Data Interfaces ===

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServicePricingTier {
  name: string;
  price: number;
  interval: string; // e.g., "project"
  features: string[];
}

export interface ServicePageSection {
  heading: string;
  content: string;
  tags?: string[]; // Optional array of strings
}

export interface ServiceTestimonial {
  content: string;
  author: string;
}

export interface ServicePage {
  excerpt: string;
  splitSections: ServicePageSection[];
  testimonial?: ServiceTestimonial; // Optional
}

export interface Service {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  keywords: string;
  hasPage: boolean;
  category: string;
  startingPrice: number;
  benefits: string[];
  processSteps: ServiceProcessStep[];
  pricingTiers?: ServicePricingTier[]; // Optional array
  coverImage: string;
  page?: ServicePage; // Optional
}

// === SEO Data Interfaces ===

export interface SEOSite {
  name: string;
  url: string;
  logo: string;
  sitemap: string;
  gmbLink: string;
  robots: string;
  canonicalUrl: string;
}

export interface SEOPageDetail {
  title: string;
  description: string;
  ogDescription: string;
  twitterDescription: string;
  image: string;
  imageAlt: string;
  keywords: string;
}

export interface SEOPages {
  index: SEOPageDetail;
  about: SEOPageDetail;
  work: SEOPageDetail;
  expertise: SEOPageDetail;
  // Add other pages if necessary, following the same structure
}

export interface SEOSocialTwitter {
  handle: string;
  card: string;
}

export interface SEOSocial {
  twitter: SEOSocialTwitter;
  profiles: string[];
}

export interface SEOBusinessContact {
  telephone: string;
  email: string;
  type: string; // e.g., "Customer Service"
}

export interface SEOBusiness {
  type: string; // e.g., "LocalBusiness"
  contact: SEOBusinessContact;
  areaServed: string[];
  availableLanguage: string[];
  openingHours: string; // e.g., "Mo-Su 00:00-23:59"
}

export interface SEOData {
  site: SEOSite;
  pages: SEOPages;
  social: SEOSocial;
  business: SEOBusiness;
}
