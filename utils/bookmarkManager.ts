export interface BookmarkedArticle {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  bookmarkedAt: string;
}

export const bookmarkManager = {
  getBookmarks: (): BookmarkedArticle[] => {
    try {
      const bookmarks = localStorage.getItem('bookmarkedArticles');
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      return [];
    }
  },

  isBookmarked: (slug: string): boolean => {
    const bookmarks = bookmarkManager.getBookmarks();
    return bookmarks.some(b => b.slug === slug);
  },

  addBookmark: (article: Omit<BookmarkedArticle, 'bookmarkedAt'>): void => {
    const bookmarks = bookmarkManager.getBookmarks();
    const newBookmark: BookmarkedArticle = {
      ...article,
      bookmarkedAt: new Date().toISOString()
    };
    
    // Avoid duplicates
    if (!bookmarks.some(b => b.slug === article.slug)) {
      bookmarks.unshift(newBookmark);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
    }
  },

  removeBookmark: (slug: string): void => {
    const bookmarks = bookmarkManager.getBookmarks();
    const filtered = bookmarks.filter(b => b.slug !== slug);
    localStorage.setItem('bookmarkedArticles', JSON.stringify(filtered));
  },

  toggleBookmark: (article: Omit<BookmarkedArticle, 'bookmarkedAt'>): boolean => {
    if (bookmarkManager.isBookmarked(article.slug)) {
      bookmarkManager.removeBookmark(article.slug);
      return false;
    } else {
      bookmarkManager.addBookmark(article);
      return true;
    }
  }
};
