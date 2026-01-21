export function calculateReadingTime(content: string): number {
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  
  // Remove markdown syntax and count words
  const text = content
    .replace(/[#*`\[\]]/g, '') // Remove markdown characters
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();
  
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return readingTime || 1; // Minimum 1 minute
}
