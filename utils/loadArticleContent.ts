/**
 * Dynamically load article content from JSON file
 * This is the SIMPLEST approach - just fetch JSON!
 * No complex scripts, no markdown parsing, just plain JSON.
 */
export async function loadArticleContent(jsonPath: string): Promise<string> {
  try {
    // Fetch JSON file from public folder
    const response = await fetch(jsonPath);
    
    if (!response.ok) {
      throw new Error(`Failed to load article: ${response.statusText}`);
    }
    
    const articleData = await response.json();
    
    // Return content from JSON
    return articleData.content || 'Content not available.';
  } catch (error) {
    console.error('Error loading article content:', error);
    return 'Content could not be loaded. Please try again later.';
  }
}

/**
 * Preload article content for faster navigation
 * Call this when user hovers over article link
 */
export function preloadArticleContent(jsonPath: string): void {
  // Use link prefetch to preload the JSON file
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = jsonPath;
  link.as = 'fetch';
  document.head.appendChild(link);
}
