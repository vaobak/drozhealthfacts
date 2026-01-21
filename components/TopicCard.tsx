import React from 'react';
import { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  onClick?: (slug: string) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => onClick && onClick(topic.slug)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={topic.imageUrl} 
          alt={topic.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
          {topic.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {topic.description}
        </p>
        <div
          className="w-full px-4 py-2 text-white border-2 rounded-lg font-medium transition-all duration-300 text-center"
          style={{
            backgroundColor: '#1e4079',
            borderColor: '#1e4079'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#5dae4e';
            e.currentTarget.style.borderColor = '#5dae4e';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1e4079';
            e.currentTarget.style.borderColor = '#1e4079';
          }}
        >
          Explore Articles
        </div>
      </div>
    </div>
  );
};
