import React, { useState } from 'react';
import { Article, ViewState } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface RelatedArticlesCarouselProps {
  articles: Article[];
  onArticleClick: (slug: string) => void;
}

export const RelatedArticlesCarousel: React.FC<RelatedArticlesCarouselProps> = ({ 
  articles, 
  onArticleClick 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  if (articles.length === 0) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
        Related Articles
      </h3>
      
      <div className="relative">
        {/* Article Card */}
        <div 
          className="cursor-pointer group"
          onClick={() => onArticleClick(articles[currentIndex].slug)}
        >
          <div className="rounded-lg overflow-hidden mb-4">
            <OptimizedImage
              src={articles[currentIndex].imageUrl} 
              alt={articles[currentIndex].title}
              width={600}
              height={400}
              priority={false}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-base leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mb-2">
            {articles[currentIndex].title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {articles[currentIndex].excerpt}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {articles[currentIndex].category}
          </span>
        </div>

        {/* Navigation Buttons */}
        {articles.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous article"
            >
              <ChevronLeft size={20} className="text-gray-700 dark:text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next article"
            >
              <ChevronRight size={20} className="text-gray-700 dark:text-white" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {articles.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-teal-600 w-6' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to article ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
