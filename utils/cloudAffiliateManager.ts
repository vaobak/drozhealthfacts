import { AffiliateLink, ClickAnalytics } from '../types';

// Cloud-based Affiliate Manager for persistent database storage
// This replaces localStorage with cloud database functionality

interface CloudConfig {
  apiEndpoint: string;
  apiKey: string;
  projectId: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class CloudAffiliateManager {
  private static config: CloudConfig = {
    apiEndpoint: process.env.REACT_APP_API_ENDPOINT || 'https://drozhealthfacts.com/api',
    apiKey: process.env.REACT_APP_API_KEY || 'droz-health-facts-api-key-2026',
    projectId: process.env.REACT_APP_PROJECT_ID || 'droz-health-facts'
  };

  private static isCloudEnabled = process.env.REACT_APP_ENABLE_CLOUD_SYNC !== 'false';
  private static fallbackToLocal = process.env.REACT_APP_FALLBACK_TO_LOCAL === 'true';

  // Headers for API requests
  private static getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.apiKey}`,
      'X-Project-ID': this.config.projectId
    };
  }

  // Generic API request handler
  private static async apiRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    body?: any
  ): Promise<ApiResponse<T>> {
    try {
      console.log(`Making ${method} request to:`, `${this.config.apiEndpoint}${endpoint}`);
      console.log('Request headers:', this.getHeaders());
      console.log('Request body:', body);
      
      const response = await fetch(`${this.config.apiEndpoint}${endpoint}`, {
        method,
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined
      });

      console.log('Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      return { success: true, data };
    } catch (error) {
      console.error(`API Request failed [${method} ${endpoint}]:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Get all affiliate links from cloud database
  static async getAffiliateLinks(): Promise<AffiliateLink[]> {
    try {
      console.log('Fetching all affiliate links from cloud database');
      const response = await this.apiRequest<AffiliateLink[]>('/affiliate-links');
      
      if (response.success && response.data) {
        console.log('Cloud affiliate links loaded:', response.data.length, 'links');
        return response.data;
      }

      console.log('No affiliate links found in cloud database');
      return [];
    } catch (error) {
      console.error('Error fetching affiliate links from cloud:', error);
      throw error; // Don't fallback, throw error
    }
  }

  // Get affiliate link by slug from cloud
  static async getAffiliateLinkBySlug(slug: string): Promise<AffiliateLink | null> {
    try {
      console.log('Fetching affiliate link by slug from cloud:', slug);
      const response = await this.apiRequest<AffiliateLink>(`/affiliate-links/slug/${slug}`);
      
      if (response.success && response.data) {
        console.log('Cloud affiliate link found:', response.data);
        return response.data;
      }

      console.log('Affiliate link not found in cloud database');
      return null;
    } catch (error) {
      console.error('Error fetching affiliate link by slug from cloud:', error);
      throw error; // Don't fallback, throw error to be handled by caller
    }
  }

  // Add new affiliate link to cloud database
  static async addAffiliateLink(
    link: Omit<AffiliateLink, 'id' | 'clickCount' | 'createdAt' | 'updatedAt'>
  ): Promise<AffiliateLink | null> {
    try {
      console.log('Adding affiliate link to cloud:', link);
      
      const newLink = {
        ...link,
        clickCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        redirectType: link.redirectType || 'landing',
        autoRedirect: link.autoRedirect !== undefined ? link.autoRedirect : true
      };

      console.log('Prepared link data for API:', newLink);
      const response = await this.apiRequest<AffiliateLink>('/affiliate-links', 'POST', newLink);
      
      if (response.success && response.data) {
        console.log('Successfully added affiliate link to cloud:', response.data);
        return response.data;
      }

      console.error('Failed to add affiliate link to cloud:', response.error);
      throw new Error(response.error || 'Failed to add affiliate link');
    } catch (error) {
      console.error('Error adding affiliate link to cloud:', error);
      throw error; // Don't fallback, throw error
    }
  }

  // Update affiliate link in cloud database
  static async updateAffiliateLink(id: string, updates: Partial<AffiliateLink>): Promise<boolean> {
    try {
      console.log('Updating affiliate link in cloud:', id, updates);
      
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };

      console.log('Prepared update data for API:', updateData);
      const response = await this.apiRequest<AffiliateLink>(
        `/affiliate-links/${id}`, 
        'PUT', 
        updateData
      );
      
      if (response.success) {
        console.log('Successfully updated affiliate link in cloud');
        return true;
      }

      console.error('Failed to update affiliate link in cloud:', response.error);
      throw new Error(response.error || 'Failed to update affiliate link');
    } catch (error) {
      console.error('Error updating affiliate link in cloud:', error);
      throw error; // Don't fallback, throw error
    }
  }

  // Delete affiliate link from cloud database
  static async deleteAffiliateLink(id: string): Promise<boolean> {
    try {
      const response = await this.apiRequest(`/affiliate-links/${id}`, 'DELETE');
      
      if (response.success) {
        // Also delete from localStorage
        this.deleteLocalAffiliateLink(id);
        return true;
      }

      // Fallback to localStorage
      return this.deleteLocalAffiliateLink(id);
    } catch (error) {
      console.error('Error deleting affiliate link from cloud:', error);
      return this.deleteLocalAffiliateLink(id);
    }
  }

  // Track click in cloud database
  static async trackClick(linkId: string, userAgent: string, referrer: string): Promise<void> {
    try {
      console.log('Tracking click in cloud database for link:', linkId);
      const clickData = {
        linkId,
        timestamp: new Date().toISOString(),
        userAgent,
        referrer,
        ipAddress: 'hidden', // For privacy
        device: this.detectDevice(userAgent),
        converted: false
      };

      // Track in cloud only
      const response = await this.apiRequest('/click-analytics', 'POST', clickData);
      
      if (response.success) {
        // Update click count
        await this.incrementClickCount(linkId);
        console.log('Click tracked successfully in cloud');
      } else {
        console.error('Failed to track click in cloud:', response.error);
      }
    } catch (error) {
      console.error('Error tracking click in cloud:', error);
      throw error; // Don't fallback, throw error
    }
  }

  // Increment click count for a link
  private static async incrementClickCount(linkId: string): Promise<void> {
    try {
      const response = await this.apiRequest(`/affiliate-links/${linkId}/increment-clicks`, 'PATCH');
      if (response.success) {
        console.log('Click count incremented for link:', linkId);
      }
    } catch (error) {
      console.error('Error incrementing click count:', error);
    }
  }

  // Get click analytics from cloud
  static async getClickAnalytics(linkId?: string): Promise<ClickAnalytics[]> {
    try {
      const endpoint = linkId ? `/click-analytics?linkId=${linkId}` : '/click-analytics';
      const response = await this.apiRequest<ClickAnalytics[]>(endpoint);
      
      if (response.success && response.data) {
        return response.data;
      }

      // Fallback to localStorage
      return this.getLocalClickAnalytics(linkId);
    } catch (error) {
      console.error('Error fetching click analytics from cloud:', error);
      return this.getLocalClickAnalytics(linkId);
    }
  }

  // Get statistics summary from cloud
  static async getStatsSummary(): Promise<any> {
    try {
      const response = await this.apiRequest('/affiliate-stats');
      
      if (response.success && response.data) {
        return response.data;
      }

      // Fallback to local calculation
      return this.getLocalStatsSummary();
    } catch (error) {
      console.error('Error fetching stats from cloud:', error);
      return this.getLocalStatsSummary();
    }
  }

  // Sync local data to cloud (for migration/backup)
  static async syncLocalToCloud(): Promise<{ success: boolean; message: string }> {
    try {
      const localLinks = this.getLocalAffiliateLinks();
      const localAnalytics = this.getLocalClickAnalytics();

      // Sync affiliate links
      for (const link of localLinks) {
        await this.apiRequest('/affiliate-links/sync', 'POST', link);
      }

      // Sync analytics
      for (const analytics of localAnalytics) {
        await this.apiRequest('/click-analytics/sync', 'POST', analytics);
      }

      return { 
        success: true, 
        message: `Synced ${localLinks.length} links and ${localAnalytics.length} analytics records` 
      };
    } catch (error) {
      console.error('Error syncing local data to cloud:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Sync failed' 
      };
    }
  }

  // Test cloud connection
  static async testConnection(): Promise<{ success: boolean; message: string; latency?: number }> {
    const startTime = Date.now();
    
    try {
      const response = await this.apiRequest('/health');
      const latency = Date.now() - startTime;
      
      if (response.success) {
        return { 
          success: true, 
          message: 'Cloud database connected successfully', 
          latency 
        };
      }

      return { 
        success: false, 
        message: response.error || 'Connection test failed' 
      };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Connection test failed' 
      };
    }
  }

  // ==========================================
  // LOCAL STORAGE FALLBACK METHODS
  // ==========================================

  private static readonly AFFILIATE_LINKS_KEY = 'droz_affiliate_links';
  private static readonly CLICK_ANALYTICS_KEY = 'droz_click_analytics';

  private static getLocalAffiliateLinks(): AffiliateLink[] {
    try {
      const stored = localStorage.getItem(this.AFFILIATE_LINKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading local affiliate links:', error);
      return [];
    }
  }

  private static saveLocalAffiliateLinks(links: AffiliateLink[]): void {
    try {
      localStorage.setItem(this.AFFILIATE_LINKS_KEY, JSON.stringify(links));
    } catch (error) {
      console.error('Error saving local affiliate links:', error);
    }
  }

  private static addLocalAffiliateLink(link: AffiliateLink): AffiliateLink {
    const links = this.getLocalAffiliateLinks();
    links.push(link);
    this.saveLocalAffiliateLinks(links);
    return link;
  }

  private static updateLocalAffiliateLink(id: string, updates: Partial<AffiliateLink>): boolean {
    const links = this.getLocalAffiliateLinks();
    const index = links.findIndex(link => link.id === id);
    
    if (index === -1) return false;
    
    links[index] = { ...links[index], ...updates };
    this.saveLocalAffiliateLinks(links);
    return true;
  }

  private static deleteLocalAffiliateLink(id: string): boolean {
    const links = this.getLocalAffiliateLinks();
    const filteredLinks = links.filter(link => link.id !== id);
    
    if (filteredLinks.length === links.length) return false;
    
    this.saveLocalAffiliateLinks(filteredLinks);
    return true;
  }

  private static trackLocalClick(linkId: string, userAgent: string, referrer: string): void {
    try {
      // Update click count
      const links = this.getLocalAffiliateLinks();
      const linkIndex = links.findIndex(link => link.id === linkId);
      
      if (linkIndex !== -1) {
        links[linkIndex].clickCount += 1;
        links[linkIndex].updatedAt = new Date().toISOString();
        this.saveLocalAffiliateLinks(links);
      }

      // Save click analytics
      const analytics = this.getLocalClickAnalytics();
      const clickData: ClickAnalytics = {
        id: Date.now().toString(),
        linkId,
        timestamp: new Date().toISOString(),
        userAgent,
        referrer,
        ipAddress: 'hidden',
        device: this.detectDevice(userAgent),
        converted: false
      };

      analytics.push(clickData);
      
      // Keep only last 1000 clicks
      if (analytics.length > 1000) {
        analytics.splice(0, analytics.length - 1000);
      }
      
      localStorage.setItem(this.CLICK_ANALYTICS_KEY, JSON.stringify(analytics));
    } catch (error) {
      console.error('Error tracking local click:', error);
    }
  }

  private static getLocalClickAnalytics(linkId?: string): ClickAnalytics[] {
    try {
      const stored = localStorage.getItem(this.CLICK_ANALYTICS_KEY);
      const analytics = stored ? JSON.parse(stored) : [];
      
      return linkId ? analytics.filter((click: ClickAnalytics) => click.linkId === linkId) : analytics;
    } catch (error) {
      console.error('Error loading local click analytics:', error);
      return [];
    }
  }

  private static getLocalStatsSummary(): any {
    const links = this.getLocalAffiliateLinks();
    const analytics = this.getLocalClickAnalytics();
    
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
}