import React from 'react';
import { Article } from '../types';
import { Button } from './Button';
import { OptimizedImage } from './OptimizedImage';

interface ArticleCardProps {
  article: Article;
  onClick: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <OptimizedImage
          src={article.imageUrl} 
          alt={article.title}
          width={600}
          height={400}
          priority={false}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 
          onClick={() => onClick(article.slug)}
          className="text-xl font-bold text-gray-800 dark:text-white mb-3 leading-tight line-clamp-2 cursor-pointer hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
        >
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3 flex-grow">
          {article.excerpt}
        </p>
        <div className="mt-auto">
          <Button 
            variant="primary" 
            size="md" 
            className="w-full min-h-[48px]"
            onClick={() => onClick(article.slug)}
          >
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};