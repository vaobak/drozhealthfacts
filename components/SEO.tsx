import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Dr. Oz Health Facts - Trusted Health Information & Wellness Tips',
  description = 'Get evidence-based health information from Dr. Oz. Learn about nutrition, fitness, mental health, disease prevention, and more to live a healthier life.',
  keywords = 'Dr. Oz, health tips, wellness, nutrition, fitness, mental health, disease prevention, healthy living',
  ogImage = 'https://drozhealthfacts.com/apple-touch-icon.png',
  ogType = 'website',
  canonicalUrl
}) => {
  const location = useLocation();
  
  // Generate canonical URL based on current location if not provided
  const currentCanonical = canonicalUrl || `https://drozhealthfacts.com${location.pathname}`;
  
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', currentCanonical, true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    
    // Canonical URL - FIXED
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentCanonical;
    
    // Remove any duplicate canonical tags
    const allCanonicals = document.querySelectorAll('link[rel="canonical"]');
    if (allCanonicals.length > 1) {
      for (let i = 1; i < allCanonicals.length; i++) {
        allCanonicals[i].remove();
      }
    }
  }, [title, description, keywords, ogImage, ogType, currentCanonical]);

  return (
    <Helmet>
      {/* Canonical URL in Helmet */}
      <link rel="canonical" href={currentCanonical} />
      
      {/* Organization Schema - Global */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Dr. Oz Health Facts",
          "url": "https://drozhealthfacts.com",
          "logo": "https://drozhealthfacts.com/apple-touch-icon.png",
          "description": "Trusted source for evidence-based health information, wellness tips, and medical advice from Dr. Oz.",
          "sameAs": [
            "https://www.facebook.com/DrOzHealthFacts",
            "https://twitter.com/DrOzHealthFacts",
            "https://www.instagram.com/DrOzHealthFacts"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "url": "https://drozhealthfacts.com/contact"
          }
        })}
      </script>

      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Dr. Oz Health Facts",
          "url": "https://drozhealthfacts.com",
          "description": "Evidence-based health information and wellness tips",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://drozhealthfacts.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};
