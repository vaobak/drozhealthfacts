/**
 * SEO Helper Functions
 * Utilities for optimizing meta descriptions, titles, and other SEO elements
 */

/**
 * Truncate text to specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length (default: 160 for meta descriptions)
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  
  // Find last space before maxLength to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
};

/**
 * Generate optimized meta description from article content
 * @param excerpt - Article excerpt
 * @param content - Full article content (optional)
 * @returns Optimized meta description (150-160 characters)
 */
export const generateMetaDescription = (excerpt: string, content?: string): string => {
  // Use excerpt if available and within optimal length
  if (excerpt && excerpt.length >= 120 && excerpt.length <= 160) {
    return excerpt;
  }
  
  // If excerpt is too short, try to extend with content
  if (excerpt && content && excerpt.length < 120) {
    const combined = `${excerpt} ${content.substring(0, 200)}`;
    return truncateText(combined, 160);
  }
  
  // If excerpt is too long, truncate it
  if (excerpt && excerpt.length > 160) {
    return truncateText(excerpt, 160);
  }
  
  // Fallback to content if no excerpt
  if (content) {
    return truncateText(content, 160);
  }
  
  return excerpt || '';
};

/**
 * Generate optimized page title
 * @param title - Page title
 * @param siteName - Site name (default: "Dr. Oz Health Facts")
 * @param maxLength - Maximum length (default: 60)
 * @returns Optimized page title
 */
export const generatePageTitle = (
  title: string, 
  siteName: string = 'Dr. Oz Health Facts',
  maxLength: number = 60
): string => {
  const fullTitle = `${title} | ${siteName}`;
  
  if (fullTitle.length <= maxLength) {
    return fullTitle;
  }
  
  // If too long, truncate the title part
  const availableLength = maxLength - siteName.length - 3; // 3 for " | "
  const truncatedTitle = truncateText(title, availableLength).replace('...', '');
  
  return `${truncatedTitle} | ${siteName}`;
};

/**
 * Extract keywords from text
 * @param text - Text to extract keywords from
 * @param maxKeywords - Maximum number of keywords (default: 10)
 * @returns Comma-separated keywords
 */
export const extractKeywords = (text: string, maxKeywords: number = 10): string => {
  // Remove common words (stop words)
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'can', 'this', 'that', 'these', 'those'];
  
  // Convert to lowercase and split into words
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word));
  
  // Count word frequency
  const wordCount: { [key: string]: number } = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Sort by frequency and take top keywords
  const keywords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
  
  return keywords.join(', ');
};

/**
 * Generate Open Graph image URL
 * @param imageUrl - Original image URL
 * @param width - Desired width (default: 1200)
 * @param height - Desired height (default: 630)
 * @returns Optimized OG image URL
 */
export const generateOGImage = (
  imageUrl: string,
  width: number = 1200,
  height: number = 630
): string => {
  // If using picsum, add dimensions
  if (imageUrl.includes('picsum.photos')) {
    return imageUrl.replace(/\/\d+\/\d+/, `/${width}/${height}`);
  }
  
  return imageUrl;
};

/**
 * Validate meta description length
 * @param description - Meta description
 * @returns Object with validation result and suggestions
 */
export const validateMetaDescription = (description: string): {
  isValid: boolean;
  length: number;
  suggestion: string;
} => {
  const length = description.length;
  
  if (length < 120) {
    return {
      isValid: false,
      length,
      suggestion: 'Meta description is too short. Aim for 150-160 characters for optimal display in search results.'
    };
  }
  
  if (length > 160) {
    return {
      isValid: false,
      length,
      suggestion: 'Meta description is too long. It will be truncated in search results. Keep it under 160 characters.'
    };
  }
  
  return {
    isValid: true,
    length,
    suggestion: 'Meta description length is optimal!'
  };
};
