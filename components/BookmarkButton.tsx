import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { bookmarkManager } from '../utils/bookmarkManager';

interface BookmarkButtonProps {
  article: {
    slug: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    category: string;
  };
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ 
  article, 
  size = 'md',
  showLabel = false 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setIsBookmarked(bookmarkManager.isBookmarked(article.slug));
  }, [article.slug]);

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = bookmarkManager.toggleBookmark(article);
    setIsBookmarked(newState);
    
    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <>
      <button
        onClick={handleToggleBookmark}
        className={`${sizeClasses[size]} flex items-center justify-center rounded-lg transition-all duration-200 ${
          isBookmarked
            ? 'bg-brand-green text-white hover:bg-green-600'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        title={isBookmarked ? 'Remove from saved' : 'Save for later'}
      >
        <Bookmark 
          size={iconSizes[size]} 
          fill={isBookmarked ? 'currentColor' : 'none'}
        />
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium">
              {isBookmarked ? 'Article saved!' : 'Bookmark removed'}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
