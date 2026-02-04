import { AffiliateLink, ClickAnalytics } from '../types';

// Local Storage Keys
const AFFILIATE_LINKS_KEY = 'droz_affiliate_links';
const CLICK_ANALYTICS_KEY = 'droz_click_analytics';

// Sample affiliate links data
const DEFAULT_AFFILIATE_LINKS: AffiliateLink[] = [
  {
    id: '1',
    slug: 'formula99',
    title: 'Formula 99 - Ultimate Weight Loss Supplement',
    description: 'Revolutionary weight loss formula recommended by health experts. Natural ingredients, proven results.',
    destinationUrl: 'https://www.digistore24.com/redir/472943/waners/',
    productImage: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop',
    category: 'Weight Loss',
    isActive: true,
    clickCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['weight-loss', 'supplement', 'natural'],
    trustBadges: ['FDA Approved', 'Doctor Recommended', '30-Day Guarantee'],
    price: '$49.99',
    originalPrice: '$79.99',
    discount: '37% OFF',
    redirectType: 'landing',
    autoRedirect: false // Manual click only - let customer read first
  },
  {
    id: '2',
    slug: 'immune-booster-pro',
    title: 'Immune Booster Pro - Advanced Immunity Support',
    description: 'Strengthen your immune system with this powerful blend of vitamins and natural extracts.',
    destinationUrl: 'https://affstore.com/immune-booster',
    productImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    category: 'Immune Support',
    isActive: true,
    clickCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['immunity', 'vitamins', 'health'],
    trustBadges: ['Clinically Tested', 'Natural Ingredients'],
    price: '$39.99',
    originalPrice: '$59.99',
    discount: '33% OFF',
    redirectType: 'direct', // Direct redirect - no landing page
    autoRedirect: true
  },
  {
    id: '3',
    slug: 'keto-burn-max',
    title: 'Keto Burn Max - Ketosis Fat Burner',
    description: 'Accelerate ketosis and burn fat faster with this advanced keto supplement formula.',
    destinationUrl: 'https://example.com/keto-burn',
    productImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    category: 'Keto & Fat Burning',
    isActive: true,
    clickCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['keto', 'fat-burner', 'metabolism'],
    trustBadges: ['Keto Certified', 'Money Back Guarantee'],
    price: '$44.99',
    originalPrice: '$69.99',
    discount: '36% OFF',
    redirectType: 'landing',
    autoRedirect: true // Auto redirect after 5 seconds
  }
];

export class AffiliateManager {
  // Get all affiliate links
  static getAffiliateLinks(): AffiliateLink[] {
    try {
      const stored = localStorage.getItem(AFFILIATE_LINKS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with default data
      this.saveAffiliateLinks(DEFAULT_AFFILIATE_LINKS);
      return DEFAULT_AFFILIATE_LINKS;
    } catch (error) {
      console.error('Error loading affiliate links:', error);
      return DEFAULT_AFFILIATE_LINKS;
    }
  }

  // Get affiliate link by slug
  static getAffiliateLinkBySlug(slug: string): AffiliateLink | null {
    const links = this.getAffiliateLinks();
    return links.find(link => link.slug === slug && link.isActive) || null;
  }

  // Save affiliate links
  static saveAffiliateLinks(links: AffiliateLink[]): void {
    try {
      localStorage.setItem(AFFILIATE_LINKS_KEY, JSON.stringify(links));
    } catch (error) {
      console.error('Error saving affiliate links:', error);
    }
  }

  // Add new affiliate link
  static addAffiliateLink(link: Omit<AffiliateLink, 'id' | 'clickCount' | 'createdAt' | 'updatedAt'>): AffiliateLink {
    const links = this.getAffiliateLinks();
    const newLink: AffiliateLink = {
      ...link,
      id: Date.now().toString(),
      clickCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Set defaults for new fields if not provided
      redirectType: link.redirectType || 'landing',
      autoRedirect: link.autoRedirect !== undefined ? link.autoRedirect : true
    };
    
    links.push(newLink);
    this.saveAffiliateLinks(links);
    return newLink;
  }

  // Update affiliate link
  static updateAffiliateLink(id: string, updates: Partial<AffiliateLink>): boolean {
    const links = this.getAffiliateLinks();
    const index = links.findIndex(link => link.id === id);
    
    if (index === -1) return false;
    
    links[index] = {
      ...links[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveAffiliateLinks(links);
    return true;
  }

  // Delete affiliate link
  static deleteAffiliateLink(id: string): boolean {
    const links = this.getAffiliateLinks();
    const filteredLinks = links.filter(link => link.id !== id);
    
    if (filteredLinks.length === links.length) return false;
    
    this.saveAffiliateLinks(filteredLinks);
    return true;
  }

  // Track click
  static trackClick(linkId: string, userAgent: string, referrer: string): void {
    try {
      // Update click count
      const links = this.getAffiliateLinks();
      const linkIndex = links.findIndex(link => link.id === linkId);
      
      if (linkIndex !== -1) {
        links[linkIndex].clickCount += 1;
        links[linkIndex].updatedAt = new Date().toISOString();
        this.saveAffiliateLinks(links);
      }

      // Save click analytics
      const analytics = this.getClickAnalytics();
      const clickData: ClickAnalytics = {
        id: Date.now().toString(),
        linkId,
        timestamp: new Date().toISOString(),
        userAgent,
        referrer,
        ipAddress: 'hidden', // For privacy
        device: this.detectDevice(userAgent),
        converted: false
      };

      analytics.push(clickData);
      
      // Keep only last 1000 clicks to prevent storage bloat
      if (analytics.length > 1000) {
        analytics.splice(0, analytics.length - 1000);
      }
      
      localStorage.setItem(CLICK_ANALYTICS_KEY, JSON.stringify(analytics));
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  }

  // Get click analytics
  static getClickAnalytics(): ClickAnalytics[] {
    try {
      const stored = localStorage.getItem(CLICK_ANALYTICS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading click analytics:', error);
      return [];
    }
  }

  // Get analytics for specific link
  static getLinkAnalytics(linkId: string): ClickAnalytics[] {
    const analytics = this.getClickAnalytics();
    return analytics.filter(click => click.linkId === linkId);
  }

  // Detect device type from user agent
  private static detectDevice(userAgent: string): 'mobile' | 'desktop' | 'tablet' {
    const ua = userAgent.toLowerCase();
    
    if (ua.includes('tablet') || ua.includes('ipad')) {
      return 'tablet';
    }
    
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      return 'mobile';
    }
    
    return 'desktop';
  }

  // Get statistics summary
  static getStatsSummary() {
    const links = this.getAffiliateLinks();
    const analytics = this.getClickAnalytics();
    
    const totalClicks = links.reduce((sum, link) => sum + link.clickCount, 0);
    const activeLinks = links.filter(link => link.isActive).length;
    const totalLinks = links.length;
    
    const last30Days = analytics.filter(click => {
      const clickDate = new Date(click.timestamp);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return clickDate >= thirtyDaysAgo;
    });

    return {
      totalLinks,
      activeLinks,
      totalClicks,
      clicksLast30Days: last30Days.length,
      topPerformingLink: links.sort((a, b) => b.clickCount - a.clickCount)[0] || null
    };
  }
}