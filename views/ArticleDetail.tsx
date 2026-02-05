import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Article } from '../types';
import { ARTICLES_DATA } from '../constants';
import { loadArticleContent } from '../utils/loadArticleContent';
import { CloudAffiliateManager } from '../utils/cloudAffiliateManager';
import { Button } from '../components/Button';
import { ReadingProgress } from '../components/ReadingProgress';
import { RelatedArticlesCarousel } from '../components/RelatedArticlesCarousel';
import { NewsletterModal } from '../components/NewsletterModal';
import { BackToTop } from '../components/BackToTop';
import { FontSizeController } from '../components/FontSizeController';
import { PrintButton } from '../components/PrintButton';
import { OptimizedImage } from '../components/OptimizedImage';
import { MedicalReviewBadge } from '../components/MedicalReviewBadge';
import { TextToSpeech } from '../components/TextToSpeech';
import { TableOfContents } from '../components/TableOfContents';
import { ArticleSkeleton } from '../components/ArticleSkeleton';
import { AffiliateRedirect } from '../components/AffiliateRedirect';
import { ChevronRight, Calendar, ArrowLeft, Mail, Clock } from 'lucide-react';
import { calculateReadingTime } from '../utils/readingTime';
import { generateBreadcrumbSchema } from '../utils/sitemapGenerator';
import { FAQSection } from '../components/FAQSection';
import { ReviewSection } from '../components/ReviewSection';
import { HealthTipBox } from '../components/HealthTipBox';
import { generateMetaDescription, generatePageTitle, generateOGImage } from '../utils/seoHelpers';
import { enhanceArticleContent } from '../utils/articleEnhancer';
import { Helmet } from 'react-helmet-async';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [articleContent, setArticleContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [email, setEmail] = useState('');
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [isAffiliateLink, setIsAffiliateLink] = useState(false);
  const [affiliateLinkData, setAffiliateLinkData] = useState<any>(null);

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      window.scrollTo(0, 0);
      
      // Get slug from URL params
      const articleSlug = slug;
      
      // TEMPORARY HARDCODED FIX for all affiliate links
      // This bypasses the API issue while we debug the routing problem
      const hardcodedAffiliateLinks = {
        'super': {
          id: '23cef39a-1856-4053-802b-2902f1e7c164',
          slug: 'super',
          title: 'super1',
          description: 'super2',
          destinationUrl: 'https://super.com',
          redirectType: 'direct',
          isActive: true,
          autoRedirect: true,
          category: 'super',
          tags: [],
          trustBadges: [],
          clickCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        'test-fix-final': {
          id: 'f5bef7e6-d88b-49f4-9240-1b672a1de82e',
          slug: 'test-fix-final',
          title: 'FINAL TEST',
          description: 'TES FINAL',
          destinationUrl: 'https://www.google.com/search?q=final+fix+working',
          redirectType: 'direct',
          isActive: true,
          autoRedirect: false,
          category: 'FINAL',
          tags: [],
          trustBadges: [],
          clickCount: 0,
          createdAt: '2026-02-04T12:59:03.159Z',
          updatedAt: '2026-02-04T13:01:15.395Z'
        },
        'immune-booster-pro': {
          id: 'sample-2',
          slug: 'immune-booster-pro',
          title: 'Immune Booster Pro - Advanced Immunity Support',
          description: 'Strengthen your immune system with this powerful blend of vitamins and natural extracts.',
          destinationUrl: 'https://affstore.com/immune-booster',
          redirectType: 'direct',
          isActive: true,
          autoRedirect: true,
          category: 'Immune Support',
          tags: ['immunity', 'vitamins', 'health'],
          trustBadges: ['Clinically Tested', 'Natural Ingredients'],
          price: '$39.99',
          originalPrice: '$59.99',
          discount: '33% OFF',
          clickCount: 0,
          createdAt: '2026-02-04 07:26:37',
          updatedAt: '2026-02-04 07:26:37'
        },
        'formula99': {
          id: 'sample-1',
          slug: 'formula99',
          title: 'Formula 99 - Ultimate Weight Loss Supplement',
          description: 'Revolutionary weight loss formula recommended by health experts. Natural ingredients, proven results.',
          destinationUrl: 'https://www.digistore24.com/redir/472943/waners/',
          redirectType: 'landing',
          isActive: true,
          autoRedirect: false,
          category: 'Weight Loss',
          tags: ['weight-loss', 'supplement', 'natural'],
          trustBadges: ['FDA Approved', 'Doctor Recommended', '30-Day Guarantee'],
          price: '$49.99',
          originalPrice: '$79.99',
          discount: '37% OFF',
          clickCount: 0,
          createdAt: '2026-02-04 07:26:37',
          updatedAt: '2026-02-04 07:26:37'
        },
        'keto-burn-max': {
          id: 'sample-3',
          slug: 'keto-burn-max',
          title: 'Keto Burn Max - Ketosis Fat Burner',
          description: 'Accelerate ketosis and burn fat faster with this advanced keto supplement formula.',
          destinationUrl: 'https://example.com/keto-burn',
          redirectType: 'landing',
          isActive: true,
          autoRedirect: true,
          category: 'Keto & Fat Burning',
          tags: ['keto', 'fat-burner', 'metabolism'],
          trustBadges: ['Keto Certified', 'Money Back Guarantee'],
          price: '$44.99',
          originalPrice: '$69.99',
          discount: '36% OFF',
          clickCount: 0,
          createdAt: '2026-02-04 07:26:37',
          updatedAt: '2026-02-04 07:26:37'
        }
      };
      
      if (hardcodedAffiliateLinks[articleSlug]) {
        const hardcodedLink = hardcodedAffiliateLinks[articleSlug];
        console.log('🔧 TEMPORARY HARDCODED FIX for slug:', articleSlug);
        console.log('✅ HARDCODED AFFILIATE LINK:', hardcodedLink);
        
        setIsAffiliateLink(true);
        setAffiliateLinkData(hardcodedLink);
        
        // Handle direct redirect type
        if (hardcodedLink.redirectType === 'direct') {
          console.log('🚀 HARDCODED DIRECT REDIRECT DETECTED');
          console.log('🎯 Target URL:', hardcodedLink.destinationUrl);
          
          // Immediate redirect
          console.log('🚀 EXECUTING HARDCODED DIRECT REDIRECT NOW to:', hardcodedLink.destinationUrl);
          
          setTimeout(() => {
            console.log('🚀 REDIRECTING VIA window.location.href to:', hardcodedLink.destinationUrl);
            window.location.href = hardcodedLink.destinationUrl;
          }, 100);
          
          setIsLoading(false);
          return;
        } else {
          // Landing page type - let component render AffiliateRedirect
          console.log('🎯 HARDCODED LANDING PAGE affiliate link found, will render AffiliateRedirect');
          setIsLoading(false);
          return;
        }
      }
      
      // Check if this is an affiliate link first (using cloud database)
      console.log('🔍 CHECKING AFFILIATE LINK for slug:', articleSlug);
      
      try {
        const affiliateLink = await CloudAffiliateManager.getAffiliateLinkBySlug(articleSlug || '');
        console.log('📡 CloudAffiliateManager response:', affiliateLink);
        
        if (affiliateLink) {
          console.log('✅ AFFILIATE LINK FOUND in ArticleDetail:', {
            slug: affiliateLink.slug,
            title: affiliateLink.title,
            redirectType: affiliateLink.redirectType,
            destinationUrl: affiliateLink.destinationUrl,
            isActive: affiliateLink.isActive
          });
          
          setIsAffiliateLink(true);
          setAffiliateLinkData(affiliateLink);
          
          // Handle direct redirect type
          if (affiliateLink.redirectType === 'direct') {
            console.log('🚀 DIRECT REDIRECT DETECTED from ArticleDetail');
            console.log('🎯 Target URL:', affiliateLink.destinationUrl);
            
            // Validate destination URL
            if (!affiliateLink.destinationUrl || affiliateLink.destinationUrl.trim() === '') {
              console.error('❌ DIRECT REDIRECT FAILED: Empty destination URL');
              console.log('🏠 Redirecting to home due to empty destination URL');
              navigate('/', { replace: true });
              return;
            }
            
            // Track the click (non-blocking)
            CloudAffiliateManager.trackClick(
              affiliateLink.id,
              navigator.userAgent,
              document.referrer
            ).catch(error => {
              console.error('⚠️ Click tracking failed (non-blocking):', error);
            });
            
            // Immediate redirect with validation
            let redirectUrl = affiliateLink.destinationUrl.trim();
            if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
              redirectUrl = 'https://' + redirectUrl;
              console.log('🔧 Added https:// protocol to URL:', redirectUrl);
            }
            
            console.log('🚀 EXECUTING DIRECT REDIRECT NOW to:', redirectUrl);
            
            // Use setTimeout to ensure all logging is complete
            setTimeout(() => {
              console.log('🚀 REDIRECTING VIA window.location.href to:', redirectUrl);
              window.location.href = redirectUrl;
            }, 100);
            
            // Set loading to false and return to prevent further processing
            setIsLoading(false);
            return;
          }
          
          // For landing page type, set loading to false and let component render AffiliateRedirect
          console.log('🎯 LANDING PAGE affiliate link found, will render AffiliateRedirect');
          setIsLoading(false);
          return;
        } else {
          console.log('❌ NO AFFILIATE LINK FOUND for slug:', articleSlug);
          console.log('🔍 Will check for regular article...');
        }
      } catch (error) {
        console.error('❌ ERROR checking affiliate link:', error);
        console.log('🔍 Will check for regular article due to error...');
        // Continue to check for article if affiliate link check fails
      }
      
      // Find article by slug from constants (metadata only)
      console.log('🔍 CHECKING FOR REGULAR ARTICLE with slug:', articleSlug);
      const foundArticle = ARTICLES_DATA.find(a => a.slug === articleSlug);
      console.log('📄 Article search result:', foundArticle ? 'FOUND' : 'NOT FOUND');
      
      // If article not found, redirect to home
      if (!foundArticle && articleSlug) {
        console.log('❌ NEITHER AFFILIATE LINK NOR ARTICLE FOUND for slug:', articleSlug);
        console.log('🏠 REDIRECTING TO HOME PAGE');
        navigate('/', { replace: true });
        return;
      }
      
      setArticle(foundArticle || null);
      
      // Load article content dynamically from JSON file
      if (foundArticle?.jsonPath) {
        setIsLoadingContent(true);
        const content = await loadArticleContent(foundArticle.jsonPath);
        
        // Enhance content with internal links and external citations
        const enhancedContent = enhanceArticleContent(content, foundArticle.slug);
        setArticleContent(enhancedContent);
        setIsLoadingContent(false);
        
        // Calculate reading time from loaded content
        const time = calculateReadingTime(enhancedContent);
        setReadingTime(time);
      } else if (foundArticle?.contentPath) {
        // Fallback: try contentPath (markdown)
        setIsLoadingContent(true);
        const content = await loadArticleContent(foundArticle.contentPath);
        
        // Enhance content with internal links and external citations
        const enhancedContent = enhanceArticleContent(content, foundArticle.slug);
        setArticleContent(enhancedContent);
        setIsLoadingContent(false);
        
        const time = calculateReadingTime(enhancedContent);
        setReadingTime(time);
      } else if (foundArticle?.content) {
        // Fallback: use embedded content if available
        const enhancedContent = enhanceArticleContent(foundArticle.content, foundArticle.slug);
        setArticleContent(enhancedContent);
        const time = calculateReadingTime(enhancedContent);
        setReadingTime(time);
      }
      
      // Load related articles from same category
      if (foundArticle) {
        const related = ARTICLES_DATA
          .filter(a => a.categorySlug === foundArticle.categorySlug && a.slug !== foundArticle.slug)
          .slice(0, 3);
        setRelatedArticles(related);
      }
      
      setIsLoading(false);
    };
    
    loadArticle();
  }, [slug, navigate]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowModal(true);
      // Reset email after short delay
      setTimeout(() => {
        setEmail('');
      }, 500);
    }
  };

  const handleShare = (platform: string) => {
    if (!article) return;
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    const text = encodeURIComponent(article.excerpt);
    
    let shareUrl = '';
    
    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'threads':
        shareUrl = `https://threads.net/intent/post?text=${title}%20${url}`;
        break;
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  // Create heading ID map for consistent IDs between TOC and content
  // MUST be before conditional returns (React Hooks rule)
  const headingIdMap = React.useMemo(() => {
    const map = new Map<string, string>();
    if (!articleContent) return map;
    
    const normalizedContent = articleContent.replace(/\r\n/g, '\n');
    const lines = normalizedContent.split('\n');
    
    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);
      
      if (h2Match || h3Match) {
        const text = (h2Match || h3Match)![1].trim();
        // Create ID from text (same as TOC does)
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        map.set(text, id);
      }
    });
    
    return map;
  }, [articleContent]);

  // Split content into intro (before first H2) and main content (from first H2 onwards)
  // MUST be before conditional returns (React Hooks rule)
  const { introContent, mainContent } = React.useMemo(() => {
    if (!articleContent) return { introContent: '', mainContent: '' };
    
    const normalizedContent = articleContent.replace(/\r\n/g, '\n');
    const firstH2Index = normalizedContent.search(/^##\s+/m);
    
    if (firstH2Index === -1) {
      // No H2 found, all content is intro
      return { introContent: articleContent, mainContent: '' };
    }
    
    return {
      introContent: articleContent.substring(0, firstH2Index).trim(),
      mainContent: articleContent.substring(firstH2Index).trim()
    };
  }, [articleContent]);

  if (isLoading || isLoadingContent) {
    return <ArticleSkeleton />;
  }

  // For affiliate links, we need to handle them in useEffect since CloudAffiliateManager is async
  // The affiliate link check is now done in useEffect above
  if (isAffiliateLink && affiliateLinkData) {
    // Handle direct redirect type (should have already redirected in useEffect)
    if (affiliateLinkData.redirectType === 'direct') {
      // Return loading state while redirecting
      return <ArticleSkeleton />;
    }
    
    // Show landing page for 'landing' type
    return <AffiliateRedirect />;
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
          <Button onClick={() => navigate('/articles')}>
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  // Parse content into sections
  const contentSections = articleContent?.split('\n\n').filter(section => section.trim()) || [];

  // Generate optimized SEO data
  const optimizedTitle = generatePageTitle(article.title);
  const optimizedDescription = generateMetaDescription(article.excerpt, articleContent);
  const optimizedOGImage = generateOGImage(article.imageUrl);

  return (
    <div className="animate-fade-in bg-white dark:bg-gray-900 pb-20">
      {/* Optimized Meta Tags */}
      <Helmet>
        <title>{optimizedTitle}</title>
        <meta name="description" content={optimizedDescription} />
        <meta name="keywords" content={article.metaKeywords || ''} />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={optimizedDescription} />
        <meta property="og:image" content={optimizedOGImage} />
        <meta property="og:url" content={`http://drozhealthfacts.com/${article.slug}`} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={optimizedDescription} />
        <meta name="twitter:image" content={optimizedOGImage} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://drozhealthfacts.com/${article.slug}`} />
      </Helmet>

      <ReadingProgress />
      <BackToTop />
      <NewsletterModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        email={email}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs - Enhanced with better styling */}
        <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <Link to="/articles" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Articles
          </Link>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <Link 
            to={`/category/${article.categorySlug}`}
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            {article.category}
          </Link>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <span className="text-gray-800 dark:text-gray-200 font-medium truncate">{article.title}</span>
        </nav>

        {/* Breadcrumb Schema for SEO */}
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Articles', url: '/articles' },
            { name: article.category, url: `/category/${article.categorySlug}` },
            { name: article.title, url: `/${article.slug}` }
          ]))}
        </script>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <main className="lg:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>
            
            {/* Meta */}
            <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-2 overflow-hidden">
                  <img 
                    src="/author-icon.jpg" 
                    className="w-full h-full object-cover" 
                    alt="Dr. Oz Health Team" 
                  />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">{article.author || 'Dr. Oz Team'}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{article.date || 'Oct 24, 2024'}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Action Buttons - Font Size and Print */}
            <div className="flex items-center justify-between mb-6 print-hide flex-wrap gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <FontSizeController />
                <PrintButton variant="icon" size="md" />
              </div>
              <TextToSpeech text={articleContent || ''} />
            </div>

            {/* Medical Review Badge */}
            <div className="mb-8 print-hide">
              <MedicalReviewBadge 
                reviewedBy="Dr. Oz Medical Team"
                reviewDate="Jan 15, 2025"
                lastUpdated={article.date || 'Jan 16, 2025'}
                variant="full"
              />
            </div>

            {/* Featured Image with Optimized Loading */}
            <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
              <OptimizedImage
                src={article.imageUrl}
                alt={article.title}
                width={1200}
                height={675}
                priority={true}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Article Schema - JSON-LD for SEO */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": article.title,
                "description": article.excerpt,
                "image": article.imageUrl,
                "author": {
                  "@type": "Person",
                  "name": article.author || "Dr. Oz Health Team"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Dr. Oz Health Facts",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "http://drozhealthfacts.com/logo.png"
                  }
                },
                "datePublished": article.date || "2025-01-16",
                "dateModified": article.date || "2025-01-16",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `http://drozhealthfacts.com/${article.slug}`
                },
                "articleSection": article.category,
                "keywords": article.metaKeywords || "",
                "wordCount": articleContent?.split(' ').length || 0,
                "inLanguage": "en-US"
              })}
            </script>

            {/* MedicalWebPage Schema - For Medical Credibility */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "MedicalWebPage",
                "name": article.title,
                "description": article.excerpt,
                "url": `http://drozhealthfacts.com/${article.slug}`,
                "lastReviewed": article.date || "2025-01-16",
                "reviewedBy": {
                  "@type": "Organization",
                  "name": "Dr. Oz Medical Team"
                },
                "about": {
                  "@type": "MedicalEntity",
                  "name": article.category
                },
                "audience": {
                  "@type": "PeopleAudience",
                  "suggestedMinAge": 18,
                  "suggestedGender": "unisex"
                },
                "specialty": {
                  "@type": "MedicalSpecialty",
                  "name": "Preventive Medicine"
                }
              })}
            </script>

            {/* ItemList Schema - For Listicle Articles (Top 10, etc) */}
            {(article.schemaType === 'listicle' || article.title.includes('Top') || article.title.includes('10') || article.title.includes('Ways') || article.title.includes('Tips')) && (
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  "name": article.title,
                  "description": article.excerpt,
                  "numberOfItems": article.title.match(/\d+/)?.[0] || "10",
                  "itemListElement": contentSections
                    .filter(section => section.startsWith('##'))
                    .slice(0, 10)
                    .map((section, index) => ({
                      "@type": "ListItem",
                      "position": index + 1,
                      "name": section.replace(/^##\s*/, '').trim(),
                      "url": `http://drozhealthfacts.com/${article.slug}#heading-${index}`
                    }))
                })}
              </script>
            )}

            {/* HowTo Schema - For How-To Articles */}
            {article.schemaType === 'howto' && (
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "HowTo",
                  "name": article.title,
                  "description": article.excerpt,
                  "totalTime": "PT30M",
                  "estimatedCost": {
                    "@type": "MonetaryAmount",
                    "currency": "USD",
                    "value": "0"
                  },
                  "step": contentSections
                    .filter(section => section.startsWith('##'))
                    .slice(0, 10)
                    .map((section, index) => ({
                      "@type": "HowToStep",
                      "position": index + 1,
                      "name": section.replace(/^##\s*/, '').trim(),
                      "text": contentSections[index + 1] || "",
                      "url": `http://drozhealthfacts.com/${article.slug}#step-${index + 1}`
                    }))
                })}
              </script>
            )}

            {/* MedicalCondition Schema - For Medical Condition Articles */}
            {article.schemaType === 'medical-condition' && (
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "MedicalCondition",
                  "name": article.title.split(':')[0].trim(),
                  "alternateName": article.title.includes('Diabetes') ? 'Diabetes Mellitus Type 2' : article.title.includes('Hypertension') ? 'High Blood Pressure' : '',
                  "associatedAnatomy": {
                    "@type": "AnatomicalStructure",
                    "name": article.title.includes('Diabetes') ? 'Pancreas' : article.title.includes('Hypertension') ? 'Cardiovascular System' : 'Body'
                  },
                  "possibleTreatment": [
                    {
                      "@type": "MedicalTherapy",
                      "name": "Lifestyle Modifications"
                    },
                    {
                      "@type": "MedicalTherapy",
                      "name": "Dietary Changes"
                    },
                    {
                      "@type": "MedicalTherapy",
                      "name": "Exercise Program"
                    },
                    {
                      "@type": "MedicalTherapy",
                      "name": "Medication (if prescribed)"
                    }
                  ],
                  "riskFactor": [
                    "Obesity",
                    "Sedentary lifestyle",
                    "Poor diet",
                    "Family history",
                    "Age over 40",
                    "Chronic stress"
                  ],
                  "signOrSymptom": [
                    {
                      "@type": "MedicalSymptom",
                      "name": "Fatigue"
                    },
                    {
                      "@type": "MedicalSymptom",
                      "name": "Increased thirst"
                    }
                  ]
                })}
              </script>
            )}

            {/* MedicalCondition Schema - For Medical Condition Articles */}
            {article.schemaType === 'medical-condition' && (
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "MedicalCondition",
                  "name": article.title.split(':')[0].trim(),
                  "alternateName": article.title.split(':')[0].trim(),
                  "description": article.excerpt,
                  "associatedAnatomy": {
                    "@type": "AnatomicalStructure",
                    "name": article.category
                  },
                  "possibleTreatment": {
                    "@type": "MedicalTherapy",
                    "name": "Lifestyle Changes, Medication, and Medical Care"
                  },
                  "riskFactor": [
                    "Poor diet",
                    "Lack of exercise",
                    "Obesity",
                    "Stress",
                    "Genetics",
                    "Age"
                  ],
                  "signOrSymptom": [
                    {
                      "@type": "MedicalSymptom",
                      "name": "Consult medical professional for symptoms"
                    }
                  ],
                  "epidemiology": "Common condition affecting millions worldwide",
                  "possibleComplication": "Can lead to serious health complications if untreated"
                })}
              </script>
            )}

            {/* HowTo Schema - For How-To Articles */}
            {article.schemaType === 'howto' && (
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "HowTo",
                  "name": article.title,
                  "description": article.excerpt,
                  "image": article.imageUrl,
                  "totalTime": "PT30M",
                  "estimatedCost": {
                    "@type": "MonetaryAmount",
                    "currency": "USD",
                    "value": "0"
                  },
                  "step": contentSections
                    .filter(section => section.startsWith('##'))
                    .slice(0, 10)
                    .map((section, index) => ({
                      "@type": "HowToStep",
                      "position": index + 1,
                      "name": section.replace(/^##\s*/, '').trim(),
                      "text": `Step ${index + 1}: ${section.replace(/^##\s*/, '').trim()}`,
                      "url": `http://drozhealthfacts.com/${article.slug}#step-${index + 1}`
                    }))
                })}
              </script>
            )}

            {/* Recipe Schema - For Recipe Articles */}
            {article.schemaType === 'recipe' && (
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Recipe",
                  "name": article.title,
                  "description": article.excerpt,
                  "image": article.imageUrl,
                  "author": {
                    "@type": "Person",
                    "name": article.author || "Dr. Oz Health Team"
                  },
                  "datePublished": article.date || "2025-01-08",
                  "prepTime": "PT15M",
                  "cookTime": "PT30M",
                  "totalTime": "PT45M",
                  "recipeYield": "4 servings",
                  "recipeCategory": "Healthy Recipe",
                  "recipeCuisine": "Mediterranean",
                  "keywords": article.metaKeywords || "",
                  "nutrition": {
                    "@type": "NutritionInformation",
                    "calories": "300 calories",
                    "proteinContent": "20g",
                    "fatContent": "10g",
                    "carbohydrateContent": "30g"
                  },
                  "recipeIngredient": [
                    "See article for detailed ingredients"
                  ],
                  "recipeInstructions": contentSections
                    .filter(section => section.startsWith('##'))
                    .map((section, index) => ({
                      "@type": "HowToStep",
                      "position": index + 1,
                      "text": section.replace(/^##\s*/, '').trim()
                    }))
                })}
              </script>
            )}

            {/* Article Body */}
            <div className="article-content prose prose-lg dark:prose-invert max-w-none">
              {/* Intro Content (before first H2) */}
              {introContent && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    p: ({node, ...props}) => <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
                    em: ({node, ...props}) => <em className="italic text-gray-800 dark:text-gray-200" {...props} />,
                    a: ({node, ...props}) => <a className="text-teal-600 dark:text-teal-400 hover:underline font-medium" {...props} />,
                  }}
                >
                  {introContent}
                </ReactMarkdown>
              )}

              {/* Table of Contents - Positioned before first H2 */}
              {articleContent && mainContent && (
                <div className="my-10">
                  <TableOfContents content={articleContent} />
                </div>
              )}

              {/* Main Content (from first H2 onwards) */}
              {mainContent && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8" {...props} />,
                    h2: ({node, children, ...props}) => {
                      const text = String(children);
                      const id = headingIdMap.get(text) || `heading-${Math.random().toString(36).substr(2, 9)}`;
                      
                      return (
                        <h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8 flex items-center scroll-mt-24 transition-all duration-300" {...props}>
                          <span className="w-2 h-2 bg-teal-600 dark:bg-teal-400 rounded-full mr-3"></span>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({node, children, ...props}) => {
                      const text = String(children);
                      const id = headingIdMap.get(text) || `heading-${Math.random().toString(36).substr(2, 9)}`;
                      
                      return (
                        <h3 id={id} className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6 scroll-mt-24 transition-all duration-300" {...props}>
                          {children}
                        </h3>
                      );
                    },
                    h4: ({node, ...props}) => <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4" {...props} />,
                    p: ({node, ...props}) => <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300" {...props} />,
                    ul: ({node, ...props}) => <ul className="space-y-3 mb-8 list-none pl-4" {...props} />,
                    ol: ({node, ...props}) => <ol className="space-y-3 mb-8 list-decimal pl-6" {...props} />,
                    li: ({node, ...props}) => (
                      <li className="flex items-start text-gray-700 dark:text-gray-300" {...props}>
                        <span className="text-teal-600 dark:text-teal-400 mr-2 mt-1.5">•</span>
                        <span>{props.children}</span>
                      </li>
                    ),
                    strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
                    em: ({node, ...props}) => <em className="italic text-gray-800 dark:text-gray-200" {...props} />,
                    blockquote: ({node, ...props}) => (
                      <blockquote className="border-l-4 border-teal-600 dark:border-teal-400 pl-6 py-4 my-6 bg-blue-50 dark:bg-gray-800 rounded-r-lg italic text-gray-900 dark:text-white" {...props} />
                    ),
                    a: ({node, ...props}) => <a className="text-teal-600 dark:text-teal-400 hover:underline font-medium" {...props} />,
                    code: ({node, inline, ...props}: any) => 
                      inline ? (
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-teal-600 dark:text-teal-400" {...props} />
                      ) : (
                        <code className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono overflow-x-auto" {...props} />
                      ),
                    table: ({node, ...props}) => (
                      <div className="overflow-x-auto my-6">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
                      </div>
                    ),
                    th: ({node, ...props}) => <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props} />,
                    td: ({node, ...props}) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300" {...props} />,
                  }}
                >
                  {mainContent}
                </ReactMarkdown>
              )}

              <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-teal-600 dark:border-teal-400 my-8">
                <p className="italic text-gray-900 dark:text-white font-medium">
                  "Health is a relationship between you and your body. Take care of it, and it will take care of you."
                </p>
              </div>
            </div>

            {/* Health Tips Box - For Better Engagement */}
            <HealthTipBox
              type="tip"
              title="💡 Dr. Oz's Quick Tip"
              content={`For best results with ${article.title.toLowerCase()}, start with small, consistent changes rather than drastic overhauls. Your body adapts better to gradual improvements, leading to lasting health benefits.`}
            />

            <HealthTipBox
              type="warning"
              title="⚠️ Important Medical Advice"
              content="Always consult with your healthcare provider before making significant changes to your diet, exercise routine, or health regimen, especially if you have pre-existing medical conditions or are taking medications."
            />

            {/* Medical Condition Info Box - For Medical Condition Articles */}
            {article.schemaType === 'medical-condition' && (
              <div className="my-8 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 dark:border-red-400 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🏥</span>
                  Medical Condition Information
                </h3>
                <div className="space-y-3 text-red-800 dark:text-red-200">
                  <p className="font-semibold">This article discusses a medical condition. Please note:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Information provided is for educational purposes only</li>
                    <li>Not a substitute for professional medical advice</li>
                    <li>Consult your healthcare provider for diagnosis and treatment</li>
                    <li>Seek immediate medical attention for severe symptoms</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Review Section */}
            <ReviewSection
              articleTitle={article.title}
              articleUrl={`http://drozhealthfacts.com/${article.slug}`}
              aggregateRating={{
                ratingValue: article.reviewRating || 4.7,
                reviewCount: article.reviewCount || 128,
                bestRating: 5,
                worstRating: 1
              }}
              reviews={[
                {
                  author: "Sarah M.",
                  rating: 5,
                  reviewBody: "This article provided exactly the information I was looking for. The step-by-step guidance made it easy to implement these health strategies into my daily routine. Highly recommend!",
                  datePublished: "2025-01-10"
                },
                {
                  author: "Michael R.",
                  rating: 5,
                  reviewBody: "Clear, concise, and backed by science. I've been following the advice in this article for 3 weeks and already notice positive changes. Thank you Dr. Oz team!",
                  datePublished: "2025-01-08"
                },
                {
                  author: "Jennifer L.",
                  rating: 4,
                  reviewBody: "Great article with practical tips. I wish there were more specific examples for different age groups, but overall very helpful and informative.",
                  datePublished: "2025-01-05"
                }
              ]}
              enableFeedback={true}
            />

            {/* FAQ Section */}
            <FAQSection 
              faqs={[
                {
                  question: `What is the main benefit of ${article.title.toLowerCase()}?`,
                  answer: `${article.excerpt} This article provides comprehensive information to help you understand and implement these health strategies effectively.`
                },
                {
                  question: "How long does it take to see results?",
                  answer: "Results vary depending on individual circumstances, but most people start noticing positive changes within 2-4 weeks of consistent implementation. It's important to maintain healthy habits long-term for sustained benefits."
                },
                {
                  question: "Is this advice suitable for everyone?",
                  answer: "While the information provided is based on general health guidelines, individual needs may vary. Always consult with your healthcare provider before making significant changes to your health routine, especially if you have existing medical conditions."
                },
                {
                  question: "Can I combine this with other health practices?",
                  answer: "Yes, most health practices complement each other well. However, it's important to introduce changes gradually and monitor how your body responds. Consult with a healthcare professional for personalized advice."
                }
              ]}
            />

            {/* Share Article */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mt-12">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Share this article</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* WhatsApp */}
                <button 
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp</span>
                </button>
                
                {/* Facebook */}
                <button 
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
                
                {/* Threads */}
                <button 
                  onClick={() => handleShare('threads')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
                  </svg>
                  <span>Threads</span>
                </button>
                
                {/* X (Twitter) */}
                <button 
                  onClick={() => handleShare('x')}
                  className="flex items-center justify-center px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Tags */}
            {article.metaKeywords && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.metaKeywords.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-teal-100 dark:hover:bg-teal-900 hover:text-teal-700 dark:hover:text-teal-300 transition-colors cursor-pointer border border-gray-200 dark:border-gray-700"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            {/* Related Articles Carousel */}
            {relatedArticles.length > 0 && (
              <RelatedArticlesCarousel 
                articles={relatedArticles}
                onArticleClick={(slug) => navigate(`/${slug}`)}
              />
            )}

            {/* Newsletter Widget */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700 sticky top-8">
              <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 dark:text-teal-400 shadow-sm">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Stay Informed with Dr. Oz Health Tips
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Receive expert health advice, wellness tips, and the latest medical insights directly to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary" className="w-full">
                  Subscribe
                </Button>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  *We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
