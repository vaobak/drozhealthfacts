import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CloudAffiliateManager } from '../utils/cloudAffiliateManager';
import { AffiliateManager } from '../utils/affiliateManager';
import { AffiliateLink } from '../types';
import { SEO } from './SEO';
import { Button } from './Button';
import { ExternalLink, Shield, Award, Clock, ArrowRight } from 'lucide-react';

export const AffiliateRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [affiliateLink, setAffiliateLink] = useState<AffiliateLink | null>(null);
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false); // Prevent multiple redirects

  useEffect(() => {
    if (!slug || hasRedirected) {
      console.log('🚫 Skipping useEffect - slug:', slug, 'hasRedirected:', hasRedirected);
      return;
    }

    console.log('🔄 Starting loadAffiliateLink for slug:', slug);
    let isMounted = true; // Prevent state updates if component unmounts

    const loadAffiliateLink = async () => {
      // ONLY use cloud database - no localStorage fallback
      let link: AffiliateLink | null = null;
      
      try {
        console.log('📡 Fetching link from cloud database...');
        link = await CloudAffiliateManager.getAffiliateLinkBySlug(slug);
        console.log('✅ Cloud affiliate link loaded:', link);
      } catch (cloudError) {
        console.error('❌ Cloud database error:', cloudError);
        // Only navigate to home if component is still mounted and hasn't redirected
        if (isMounted && !hasRedirected) {
          console.log('🏠 Navigating to home due to cloud error');
          navigate('/', { replace: true });
        }
        return;
      }
      
      if (!link) {
        console.log('❌ Affiliate link not found in cloud database for slug:', slug);
        // Only navigate to home if component is still mounted and hasn't redirected
        if (isMounted && !hasRedirected) {
          console.log('🏠 Navigating to home - link not found');
          navigate('/', { replace: true });
        }
        return;
      }

      // Only update state if component is still mounted
      if (!isMounted) {
        console.log('🚫 Component unmounted, skipping state updates');
        return;
      }

      setAffiliateLink(link);

      // Track the click in cloud database only (don't block redirect)
      CloudAffiliateManager.trackClick(
        link.id,
        navigator.userAgent,
        document.referrer
      ).then(() => {
        console.log('✅ Click tracked in cloud database');
      }).catch(trackError => {
        console.error('⚠️ Cloud tracking failed (non-blocking):', trackError);
      });

      // Handle redirect based on type
      console.log('🔍 Link data loaded:', {
        slug: link.slug,
        title: link.title,
        redirectType: link.redirectType,
        destinationUrl: link.destinationUrl,
        autoRedirect: link.autoRedirect,
        isActive: link.isActive
      });

      // CRITICAL: Check for direct redirect IMMEDIATELY
      if (link.redirectType === 'direct') {
        console.log('🚀 DIRECT REDIRECT DETECTED - Processing immediate redirect to:', link.destinationUrl);
        
        // Validate destination URL before redirect
        if (!link.destinationUrl || link.destinationUrl.trim() === '') {
          console.error('❌ DIRECT REDIRECT FAILED: Empty destination URL');
          if (isMounted && !hasRedirected) {
            navigate('/', { replace: true });
          }
          return;
        }

        // Set redirect flag IMMEDIATELY to prevent any other navigation
        if (isMounted && !hasRedirected) {
          console.log('🔒 Setting hasRedirected flag to prevent duplicate redirects');
          setHasRedirected(true);
          
          // Execute direct redirect with minimal delay
          console.log('🚀 EXECUTING DIRECT REDIRECT NOW to:', link.destinationUrl);
          handleRedirect(link.destinationUrl, true);
        } else {
          console.log('🚫 Direct redirect skipped - hasRedirected:', hasRedirected, 'isMounted:', isMounted);
        }
        return; // IMPORTANT: Exit here for direct redirects
      }

      console.log('🎯 LANDING PAGE MODE - Redirect type:', link.redirectType);
      // Landing page - start countdown only if autoRedirect is enabled
      if (link.autoRedirect && isMounted && !hasRedirected) {
        console.log('⏰ Starting auto-redirect countdown...');
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              console.log('⏰ Countdown finished - Redirecting to:', link.destinationUrl);
              if (isMounted && !hasRedirected) {
                setHasRedirected(true);
                handleRedirect(link.destinationUrl, false);
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        // Cleanup timer on unmount
        return () => {
          console.log('🧹 Cleaning up countdown timer');
          clearInterval(timer);
        };
      } else {
        console.log('🔘 Manual redirect mode - User must click button');
      }
    };

    loadAffiliateLink();

    // Cleanup function
    return () => {
      console.log('🧹 useEffect cleanup - setting isMounted to false');
      isMounted = false;
    };
  }, [slug, navigate]); // Removed hasRedirected from dependencies to prevent re-runs

  const handleRedirect = (url: string, isDirect: boolean = false) => {
    console.log('🔄 REDIRECT FUNCTION CALLED:', {
      url,
      isDirect,
      timestamp: new Date().toISOString(),
      hasRedirected,
      currentLocation: window.location.href
    });

    // Prevent duplicate redirects
    if (hasRedirected) {
      console.log('🚫 Redirect already executed, ignoring duplicate call');
      return;
    }

    // Validate URL first
    if (!url || url.trim() === '') {
      console.error('❌ REDIRECT FAILED: Empty or invalid URL');
      return;
    }

    // Set redirecting state immediately
    setIsRedirecting(true);
    
    // Ensure URL has protocol
    let redirectUrl = url.trim();
    if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
      redirectUrl = 'https://' + redirectUrl;
      console.log('🔧 Added https:// protocol to URL:', redirectUrl);
    }
    
    if (isDirect) {
      console.log('🚀 EXECUTING DIRECT REDIRECT (same tab) to:', redirectUrl);
      console.log('🚀 Using window.location.href for immediate redirect');
      
      // Set flag immediately to prevent any other redirects or navigation
      setHasRedirected(true);
      
      // Direct redirect - replace current page immediately
      try {
        console.log('🚀 REDIRECTING NOW to:', redirectUrl);
        // Use location.replace to prevent back button issues
        window.location.replace(redirectUrl);
      } catch (error) {
        console.error('❌ Direct redirect failed:', error);
        // Fallback to href if replace fails
        try {
          window.location.href = redirectUrl;
        } catch (fallbackError) {
          console.error('❌ Fallback redirect also failed:', fallbackError);
        }
      }
      
    } else {
      console.log('🎯 EXECUTING LANDING PAGE REDIRECT (new tab) to:', redirectUrl);
      // For landing page redirect, open in new tab to maintain user experience
      try {
        const newWindow = window.open(redirectUrl, '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          console.error('❌ Popup blocked - trying direct redirect instead');
          setHasRedirected(true);
          setTimeout(() => {
            window.location.href = redirectUrl;
          }, 100);
        } else {
          console.log('✅ New tab opened successfully');
          // For landing page, don't redirect current tab to home
          // Just mark as redirected to prevent further actions
          setHasRedirected(true);
        }
      } catch (error) {
        console.error('❌ Landing page redirect failed:', error);
        // Fallback to direct redirect
        setHasRedirected(true);
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 100);
      }
    }
  };

  const handleManualRedirect = () => {
    if (affiliateLink && !hasRedirected) {
      console.log('🔘 Manual redirect button clicked');
      setHasRedirected(true);
      handleRedirect(affiliateLink.destinationUrl, false);
    } else if (hasRedirected) {
      console.log('🚫 Manual redirect ignored - already redirected');
    }
  };

  if (!affiliateLink) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The product you're looking for is not available.
          </p>
          <Button onClick={() => navigate('/')}>
            Return to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO
        title={`${affiliateLink.title} - Dr. Oz Health Facts Recommendation`}
        description={affiliateLink.description}
        canonicalUrl={`https://drozhealthfacts.com/${affiliateLink.slug}`}
        ogImage={affiliateLink.productImage}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            Dr. Oz Health Facts Recommendation
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {affiliateLink.title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {affiliateLink.description}
          </p>
        </div>

        {/* Product Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <img
                src={affiliateLink.productImage || 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600&h=400&fit=crop'}
                alt={affiliateLink.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  {affiliateLink.category}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {affiliateLink.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {affiliateLink.description}
              </p>

              {/* Price */}
              {affiliateLink.price && (
                <div className="flex items-center mb-6">
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {affiliateLink.price}
                  </span>
                  {affiliateLink.originalPrice && (
                    <span className="text-lg text-gray-500 line-through ml-3">
                      {affiliateLink.originalPrice}
                    </span>
                  )}
                  {affiliateLink.discount && (
                    <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded ml-3 text-sm font-medium">
                      {affiliateLink.discount}
                    </span>
                  )}
                </div>
              )}

              {/* Trust Badges */}
              {affiliateLink.trustBadges && affiliateLink.trustBadges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {affiliateLink.trustBadges.map((badge, index) => (
                    <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                      <Shield className="w-3 h-3 mr-1 text-green-600" />
                      {badge}
                    </div>
                  ))}
                </div>
              )}

              {/* Redirect Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <div className="flex items-center text-blue-800 dark:text-blue-200 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-medium">
                    {isRedirecting 
                      ? 'Redirecting...' 
                      : affiliateLink.autoRedirect 
                        ? `Redirecting in ${countdown} seconds`
                        : 'Click the button below to continue'
                    }
                  </span>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  {affiliateLink.autoRedirect 
                    ? "You'll be taken to our trusted partner's secure checkout page automatically."
                    : "Take your time to read the product details, then click when you're ready to proceed."
                  }
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleManualRedirect}
                  className="w-full"
                  disabled={isRedirecting}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {isRedirecting 
                    ? 'Redirecting...' 
                    : affiliateLink.autoRedirect 
                      ? 'Get This Product Now (or wait for auto-redirect)'
                      : 'Get This Product Now'
                  }
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="w-full"
                >
                  Return to Dr. Oz Health Facts
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Health Expert Endorsement */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Health Expert Recommendation
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              "Based on our extensive research and analysis of health supplements, we recommend products that meet our strict criteria for safety, efficacy, and quality. This product has been carefully evaluated by our health experts."
            </p>
            
            <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              <span>— Dr. Oz Health Facts Research Team</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <strong>Disclaimer:</strong> This post contains affiliate links. We may earn a commission if you make a purchase through these links, at no additional cost to you. We only recommend products we believe in and that align with our health standards. Results may vary. Please consult with a healthcare professional before starting any new supplement regimen.
          </p>
        </div>
      </div>
    </div>
  );
};